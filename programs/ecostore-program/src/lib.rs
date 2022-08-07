use {
    anchor_lang::{
        prelude::*, solana_program::entrypoint::ProgramResult, solana_program::program::invoke,
        system_program,
    },
    anchor_spl::{associated_token, token},
    mpl_token_metadata::{instruction as token_instruction, ID as TOKEN_METADATA_ID},
};

declare_id!("Gj8aZFEWp7TwXjBaMrRxEMEgCMN9yStmnpksjBExuwr8");

#[program]
pub mod ecostore_program {
    use super::*;

    pub fn mint(
        ctx: Context<MintNft>,
        metadata_title: String,
        metadata_symbol: String,
        metadata_uri: String,
    ) -> ProgramResult {
        let nft_account = &mut ctx.accounts.nft_data;
        nft_account.mint_address = ctx.accounts.mint.key();
        nft_account.donated = 0;
        system_program::create_account(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                system_program::CreateAccount {
                    from: ctx.accounts.mint_authority.to_account_info(),
                    to: ctx.accounts.mint.to_account_info(),
                },
            ),
            Rent::get()?.minimum_balance(82),
            82,
            &ctx.accounts.token_program.key(),
        )?;

        token::initialize_mint(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::InitializeMint {
                    mint: ctx.accounts.mint.to_account_info(),
                    rent: ctx.accounts.rent.to_account_info(),
                },
            ),
            0,
            &ctx.accounts.mint_authority.key(),
            Some(&ctx.accounts.mint_authority.key()),
        )?;

        associated_token::create(CpiContext::new(
            ctx.accounts.associated_token_program.to_account_info(),
            associated_token::Create {
                payer: ctx.accounts.mint_authority.to_account_info(),
                associated_token: ctx.accounts.token_account.to_account_info(),
                authority: ctx.accounts.mint_authority.to_account_info(),
                mint: ctx.accounts.mint.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info(),
                token_program: ctx.accounts.token_program.to_account_info(),
                rent: ctx.accounts.rent.to_account_info(),
            },
        ))?;

        token::mint_to(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.token_account.to_account_info(),
                    authority: ctx.accounts.mint_authority.to_account_info(),
                },
            ),
            1,
        )?;

        invoke(
            &token_instruction::create_metadata_accounts_v3(
                TOKEN_METADATA_ID,
                ctx.accounts.metadata.key(),
                ctx.accounts.mint.key(),
                ctx.accounts.mint_authority.key(),
                ctx.accounts.mint_authority.key(),
                ctx.accounts.mint_authority.key(),
                metadata_title,
                metadata_symbol,
                metadata_uri,
                None,
                1,
                true,
                true,
                None,
                None,
                None,
            ),
            &[
                ctx.accounts.metadata.to_account_info(),
                ctx.accounts.mint.to_account_info(),
                ctx.accounts.mint_authority.to_account_info(),
                ctx.accounts.rent.to_account_info(),
            ],
        )?;

        invoke(
            &token_instruction::create_master_edition_v3(
                TOKEN_METADATA_ID,
                ctx.accounts.master_edition.key(),
                ctx.accounts.mint.key(),
                ctx.accounts.mint_authority.key(),
                ctx.accounts.mint_authority.key(),
                ctx.accounts.metadata.key(),
                ctx.accounts.mint_authority.key(),
                Some(0),
            ),
            &[
                ctx.accounts.master_edition.to_account_info(),
                ctx.accounts.metadata.to_account_info(),
                ctx.accounts.mint.to_account_info(),
                ctx.accounts.mint_authority.to_account_info(),
                ctx.accounts.rent.to_account_info(),
            ],
        )?;

        Ok(())
    }

    pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<NftData> {
        let sender = &ctx.accounts.sender;
        let sender_tokens = &ctx.accounts.sender_tokens;
        let recipient_tokens = &ctx.accounts.recipient_tokens;
        let token_program = &ctx.accounts.token_program;

        token::transfer(
            CpiContext::new(
                token_program.to_account_info(),
                token::Transfer {
                    from: sender_tokens.to_account_info(),
                    to: recipient_tokens.to_account_info(),
                    authority: sender.to_account_info(),
                },
            ),
            amount,
        )?;

        let nft_data = &mut ctx.accounts.nft_data;
        nft_data.donated += amount;

        Ok(NftData {
            mint_address: nft_data.mint_address,
            donated: nft_data.donated,
        })
    }
}

#[derive(Accounts)]
pub struct MintNft<'info> {
    #[account(init, payer=mint_authority, space=100, seeds=[b"MINT_CR".as_ref(), mint_authority.key().as_ref()], bump)]
    pub nft_data: Account<'info, NftData>,
    /// CHECK: We're about to create this with Metaplex
    #[account(mut)]
    pub metadata: UncheckedAccount<'info>,
    /// CHECK: We're about to create this with Metaplex
    #[account(mut)]
    pub master_edition: UncheckedAccount<'info>,
    #[account(mut)]
    pub mint: Signer<'info>,
    /// CHECK: We're about to create this with Anchor
    #[account(mut)]
    pub token_account: UncheckedAccount<'info>,
    #[account(mut)]
    pub mint_authority: Signer<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
    /// CHECK: Metaplex will check this
    pub token_metadata_program: UncheckedAccount<'info>,
}

#[account]
pub struct NftData {
    pub mint_address: Pubkey,
    pub donated: u64,
}

#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub nft_data: Account<'info, NftData>,
    #[account(mut)]
    pub sender: Signer<'info>,
    #[account(mut)]
    pub sender_tokens: Account<'info, token::TokenAccount>,
    #[account(mut)]
    pub recipient_tokens: Account<'info, token::TokenAccount>,
    pub token_program: Program<'info, token::Token>,
}
