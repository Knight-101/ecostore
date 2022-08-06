const anchor = require("@project-serum/anchor");
const { Connection, PublicKey, clusterApiUrl } = require("@solana/web3.js");
const { SystemProgram } = anchor.web3;
const {
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccount,
  getMint,
  TOKEN_PROGRAM_ID,
} = require("@solana/spl-token");

const main = async () => {
  const testNftTitle = "Carbon NFT";
  const testNftSymbol = "CRB";
  const testNftUri =
    "https://raw.githubusercontent.com/Coding-and-Crypto/Solana-NFT-Marketplace/master/assets/example.json";

  console.log("🚀 Starting test...");
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  const wallet = provider.wallet;
  anchor.setProvider(provider);
  const program = anchor.workspace.EcostoreProgram;

  const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );

  // Derive the mint address and the associated token account address

  // const mintKeypair = anchor.web3.Keypair.generate();
  // const tokenAddress = await anchor.utils.token.associatedAddress({
  //   mint: mintKeypair.publicKey,
  //   owner: wallet.publicKey,
  // });
  // console.log(`New token: ${mintKeypair.publicKey}`);

  // // Derive the metadata and master edition addresses

  // const metadataAddress = (
  //   await anchor.web3.PublicKey.findProgramAddress(
  //     [
  //       Buffer.from("metadata"),
  //       TOKEN_METADATA_PROGRAM_ID.toBuffer(),
  //       mintKeypair.publicKey.toBuffer(),
  //     ],
  //     TOKEN_METADATA_PROGRAM_ID
  //   )
  // )[0];
  // console.log("Metadata initialized");
  // const masterEditionAddress = (
  //   await anchor.web3.PublicKey.findProgramAddress(
  //     [
  //       Buffer.from("metadata"),
  //       TOKEN_METADATA_PROGRAM_ID.toBuffer(),
  //       mintKeypair.publicKey.toBuffer(),
  //       Buffer.from("edition"),
  //     ],
  //     TOKEN_METADATA_PROGRAM_ID
  //   )
  // )[0];
  // console.log("Master edition metadata initialized");

  const [nftData] = await PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode("MINT_CR"),
      provider.wallet.publicKey.toBuffer(),
    ],
    program.programId
  );

  // Transact with the "mint" function in our on-chain program

  // await program.methods
  //   .mint(testNftTitle, testNftSymbol, testNftUri)
  //   .accounts({
  //     nftData,
  //     masterEdition: masterEditionAddress,
  //     metadata: metadataAddress,
  //     mint: mintKeypair.publicKey,
  //     tokenAccount: tokenAddress,
  //     mintAuthority: wallet.publicKey,
  //     tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
  //   })
  //   .signers([mintKeypair])
  //   .rpc();
  // console.log("Minted");
  // const nftAccount = await program.account.nftData.fetch(nftData);
  const usdcAddress = new PublicKey(
    "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"
  );
  const receiverPublicKey = new PublicKey(
    "6WzFCFukTTbwVZnRpkRGtX1GWbpCfc9AVQVeSkgVG8cz"
  );
  const senderPublicKey = wallet.publicKey;
  const senderUsdcAddress = await getAssociatedTokenAddress(
    usdcAddress,
    senderPublicKey
  );
  await createAssociatedTokenAccount(
    provider.connection,
    wallet.publicKey,
    usdcAddress,
    receiverPublicKey
  );
  const recipientUsdcAddress = await getAssociatedTokenAddress(
    usdcAddress,
    receiverPublicKey
  );
  console.log(recipientUsdcAddress);
  const price = 10;
  // This is new, we're getting the mint address of the token we want to transfer
  // const usdcMint = await getMint(provider.connection, usdcAddress);

  // const tx = await program.rpc.donate(
  //   new anchor.BN(price * 10 ** usdcMint.decimals),
  //   {
  //     accounts: {
  //       nftData,
  //       sender: wallet.publicKey,
  //       senderTokens: senderUsdcAddress,
  //       recipientTokens: recipientUsdcAddress,
  //       tokenProgram: TOKEN_PROGRAM_ID,
  //     },
  //   }
  // );
  // console.log(tx);
  const nftAccount = await program.account.nftData.fetch(nftData);
  console.log(nftAccount.donated.toNumber());
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
