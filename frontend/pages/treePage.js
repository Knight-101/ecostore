<<<<<<< HEAD
import React from "react";
import Navbar, { NFTProgress } from "../components/navbar.js";
=======
import React, { useContext, useEffect } from "react";
import { NFTProgress } from "../components/navbar.js";
>>>>>>> origin/main
import ThreeNFT from "../components/threeNFT.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "./orders.js";
import Web3Context from "../contexts/Web3Context.js";

const InfoPanel = ({ setter }) => {
  return (
    <div className="tree-page-wrap">
      <button
        className="tree-page-button"
        onClick={() => setter((val) => !val)}
      >
        Info
      </button>
      <div className="one-row-nft">
        <img src="/assets/nft_seed.png" />
        <div className="one-row-nft-text"> Level 1</div>
      </div>
      <div className="one-row-nft">
        <img src="/assets/nft_plant.png" />
        <div className="one-row-nft-text"> Level 2</div>
      </div>
      <div className="one-row-nft">
        <img src="/assets/nft_tree_1.png" />
        <div className="one-row-nft-text"> Level 3</div>
      </div>
      <div className="one-row-nft">
        <img src="/assets/nft_tree_2.png" />
        <div className="one-row-nft-text"> Level 4</div>
      </div>
      <div className="one-row-nft">
        <img src="/assets/nft_forest.png" />
        <div className="one-row-nft-text"> Level 5</div>
      </div>
    </div>
  );
};

function formatAddress(address) {
  return (
    address.substring(0, 6) + "..." + address.substring(address.length - 6)
  );
}

const OffsetHistory = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ backgroundColor: "transparent" }} aria-label="simple table">
        {/* <TableHead sx={{ backgroundColor: "transparent" }}>
          <TableRow>
            <StyledTableCell>Amount</StyledTableCell>
            <StyledTableCell>Txn. Hash</StyledTableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row?.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell align="center">{row?.amount}</StyledTableCell>
              <StyledTableCell align="center">
                {formatAddress(row?.hash)}
              </StyledTableCell>
              <StyledTableCell align="center">
                <a
                  href={`https://explorer.solana.com/tx/${row?.hash}?cluster=devnet`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {"click"}
                </a>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const TreePage = () => {
  const { walletAddress, getNftDetails, upgradeNFT, getDonations } =
    useContext(Web3Context);
  const [TypeNFT, setTypeNFT] = React.useState(4);
  const [infoDisplay, setInfoDisplay] = React.useState(false);
  const [donated, setDonated] = React.useState(null);
  const [minted, setMinted] = React.useState(null);
  const [upgrade, setUpgrade] = React.useState(false);
  const [nextLevel, setNextLevel] = React.useState(null);
  const [level, setLevel] = React.useState(null);
  const [donations, setDonations] = React.useState(null);

  useEffect(() => {
    const nftData = async () => {
      const data = await getNftDetails();

      if (data) {
        const donation = data.donated.toNumber() * 10 ** -6;
        const nftLevel = data.level;
        setDonated(donation);
        setLevel(nftLevel);

        switch (true) {
          case 0 <= donation && donation < 10:
            if (nftLevel !== 1) {
              setUpgrade(true);
              setNextLevel(1);
            }

            break;
          case 10 <= donation && donation < 20:
            if (nftLevel !== 2) {
              setUpgrade(true);
              setNextLevel(2);
            }
            break;
          case 20 <= donation && donation < 50:
            if (nftLevel !== 3) {
              setUpgrade(true);
              setNextLevel(3);
            }
            break;
          case 50 <= donation && donation < 100:
            if (nftLevel !== 4) {
              setUpgrade(true);
              setNextLevel(4);
            }
            break;
          case 100 <= donation:
            if (nftLevel !== 5) {
              setUpgrade(true);
              setNextLevel(5);
            }
            break;
          default:
            break;
        }
        setMinted(true);
      } else {
        setMinted(false);
      }
    };
    walletAddress && nftData();
  }, [walletAddress, upgrade]);

  useEffect(() => {
    const donationData = async () => {
      const data = await getDonations();
      data && setDonations([...data]);
    };
    walletAddress && donationData();
  }, []);

  const upgradeFunc = async () => {
    const newUri = metadata[nextLevel.toString()];
    const tx = await upgradeNFT(newUri);
    setUpgrade(false);
    setNextLevel(null);
  };

  return (
<<<<<<< HEAD
    <>
      <Navbar />
      <div className="tree-page-main">
        {infoDisplay && <InfoPanel setter={setInfoDisplay} />}
        <div className="tree-page-head">
          <div className="tree-page-header">Header here</div>
          <div className="tree-page-header-text">
            <span>
              Supporting text here. Supporting text here. Supporting text here.
            </span>
            <button
              className="tree-page-button"
              onClick={() => setInfoDisplay((val) => !val)}
            >
              What is CRB?
            </button>
          </div>
        </div>
        <div className={`your-nft-panel ${infoDisplay && "nft-panel-hidden"}`}>
          <ThreeNFT pageType="page" type={TypeNFT} />
=======
    <div className="tree-page-main">
      {infoDisplay && <InfoPanel setter={setInfoDisplay} />}
      <div className="tree-page-head">
        <div className="tree-page-header">Carbon NFT</div>
        <div className="tree-page-header-text">
          <span>1 Dollar, 1 Tree</span>
          <button
            className="tree-page-button"
            onClick={() => setInfoDisplay((val) => !val)}
          >
            Info
          </button>
        </div>
      </div>
      {minted ? (
        <div className={`your-nft-panel ${infoDisplay && "nft-panel-hidden"}`}>
          <ThreeNFT pageType="page" type={level} />
>>>>>>> origin/main
          <div className="your-nft-panel-text">
            {/* <div className="tree-page-header">Header here</div>
          <div className="tree-page-header-text">
            <span>
              Supporting text here. Supporting text here. Supporting text here.
            </span>
          </div> */}
          </div>
<<<<<<< HEAD
          <NFTProgress />
        </div>
        <div className="tree-page-head">
          <div className="tree-page-header">Donation History</div>
          <div className="tree-page-header-text">
            <span>
              Supporting text here. Supporting text here. Supporting text here.
            </span>
          </div>
        </div>
        <div className="donation-history">
          <OffsetHistory rows={rows} />
        </div>
      </div>
    </>
=======
          <NFTProgress
            level={level}
            money={donated}
            upgrade={upgrade}
            upgradeFunc={upgradeFunc}
          />
        </div>
      ) : (
        <div>Mint Carbon NFT!</div>
      )}

      <div className="tree-page-head">
        <div className="tree-page-header">Donation History</div>
        {/* <div className="tree-page-header-text">
          <span>
            Supporting text here. Supporting text here. Supporting text here.
          </span>
        </div> */}
      </div>
      <div className="donation-history">
        <OffsetHistory rows={donations} />
      </div>
    </div>
>>>>>>> origin/main
  );
};

export default TreePage;
