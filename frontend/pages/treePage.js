import React from "react";
import { NFTProgress } from "../components/navbar.js";
import ThreeNFT from "../components/threeNFT.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "./orders.js";

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

function createData(amount, hash) {
  const explorerURl = `https://explorer.solana.com/tx/${hash}?cluster=testnet`;
  return { amount, hash, explorerURl };
}

const rows = [
  createData(
    10,
    "2ZADnQFrbtxJwbFaC4oJYNCJLrEQ8kpSsBSHFMcdkXF5hJVpV5awcnfWdEsm2dc63sLcwRLRUPcQnSF2VcRs9dbj"
  ),
  createData(
    20,
    "2ZADnQFrbtxJwbFaC4oJYNCJLrEQ8kpSsBSHFMcdkXF5hJVpV5awcnfWdEsm2dc63sLcwRLRUPcQnSF2VcRs9dbj"
  ),
  createData(
    30,
    "2ZADnQFrbtxJwbFaC4oJYNCJLrEQ8kpSsBSHFMcdkXF5hJVpV5awcnfWdEsm2dc63sLcwRLRUPcQnSF2VcRs9dbj"
  ),
  createData(
    40,
    "2ZADnQFrbtxJwbFaC4oJYNCJLrEQ8kpSsBSHFMcdkXF5hJVpV5awcnfWdEsm2dc63sLcwRLRUPcQnSF2VcRs9dbj"
  ),
  createData(
    50,
    "2ZADnQFrbtxJwbFaC4oJYNCJLrEQ8kpSsBSHFMcdkXF5hJVpV5awcnfWdEsm2dc63sLcwRLRUPcQnSF2VcRs9dbj"
  ),
];

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
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell align="center">{row.amount}</StyledTableCell>
              <StyledTableCell align="center">
                {formatAddress(row.hash)}
              </StyledTableCell>
              <StyledTableCell align="center">
                <a href={row.explorerURl} target="_blank" rel="noreferrer">
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
  const [TypeNFT, setTypeNFT] = React.useState(4);
  const [infoDisplay, setInfoDisplay] = React.useState(false);
  return (
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
        <div className="your-nft-panel-text">
          {/* <div className="tree-page-header">Header here</div>
          <div className="tree-page-header-text">
            <span>
              Supporting text here. Supporting text here. Supporting text here.
            </span>
          </div> */}
        </div>
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
  );
};

export default TreePage;
