import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Web3Context from "../contexts/Web3Context";
import Navbar from "../components/navbar";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000000",
    color: "#0d8f8f",
    fontSize: 35,
    height: "75px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#111111",
    color: "#ffffff",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "transparent",
  },
  // hide last border
  "&:first-child td, &:first-child th": {
    border: 0,
  },
  "& td, & th": {
    borderColor: "#0d8f8f",
  },
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell sx={{ width: "10px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon sx={{ color: "#ffffff" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ color: "#ffffff" }} />
            )}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell sx={{ width: "120px" }}>
          <img src={row.image} alt="" className="product-order-image" />
        </StyledTableCell>
        <StyledTableCell>
          <div>{row.productName}</div>
          <div>By: {row.storeName}</div>
          <div>Order Id: {row.orderId}</div>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <div>Hash: {row.hash}</div>
              <div>Amount: ${row.amount}</div>
              <div>Date: {row.date}</div>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const { walletAddress, fetchOrderDetails } = React.useContext(Web3Context);
  const [orders, setOrders] = React.useState(null);

  React.useEffect(() => {
    const fetchOrders = async () => {
      const data = await fetchOrderDetails();
      data && setOrders([...data]);
    };
    fetchOrders();
  }, [walletAddress]);

  return (
    <>
      <Navbar />

      <div className="table-wrap">
        {orders && (
          <TableContainer component={Paper}>
            <Table
              aria-label="collapsible table"
              sx={{ backgroundColor: "transparent" }}
            >
              <TableHead sx={{ backgroundColor: "transparent" }}>
                <StyledTableRow>
                  <StyledTableCell
                    align="center"
                    colSpan={6}
                    sx={{ backgroundColor: "transparent" }}
                  >
                    Your Orders
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {orders?.map((row, idx) => (
                  <Row key={idx} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
}
