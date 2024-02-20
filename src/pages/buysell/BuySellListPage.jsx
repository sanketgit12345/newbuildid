import {
  Button,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";
import profileIcon from "../../assets/images/profile-img.jpg";
import "./BuySellListPage.css";
import { BIBlue, BIRed } from "../../constant/Color";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import RoomIcon from "@mui/icons-material/Room";
import { Search as SearchIcon } from "@mui/icons-material";
export default function BuySellListPage() {
  
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  return (
    <>
      <Grid container spacing={1} rowGap={2} className="page-heading-grid">
        <Grid item sm={6} md={4} xs={12} lg={12} style={{ paddingTop: "0px", paddingLeft: "0px" }}>
          <h4 className="page-heading-title">Buy/Sell/Trade</h4>
        </Grid>
      </Grid>
      <div className="buysell-list">
        <div className="header">
          <div className="top-left">
            <TextField
              variant="outlined"
              placeholder="Search Listings"
              size="small"
              value=""
              onChange={() => {}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              className="textfield"
            />
            <Button className="buysell-btn active" onClick={() => {}}>
              My Listing
            </Button>
          </div>
          <div>
            <div className="top-right">
              <div onClick={() => {}} style={{ color: BIBlue }}>
                <RoomIcon variant="contained" fontSize="small" />
                Using Current Location
              </div>
              <div>
                <ListOutlinedIcon style={{ color: BIBlue }} />
              </div>
            </div>
          </div>
        </div>

        <TableContainer component={Paper} className="buysell-container">
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className="buysell-table">
            <TableBody>
              {[1, 2, 3].map((item) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center" className="list-content">
                    <img
                      className="list-icon"
                      alt="Remy Sharp"
                      src={profileIcon}
                    />
                    <Stack spacing={2}>
                      <h6 className="list-name">Mihai Velicue</h6>
                      <h6 className="list-price">$ 20</h6>
                    </Stack>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "end", color: BIRed }}
                    className="report-content">
                    <h6 className="report">Report</h6>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          className="table-pagination"
          count={100}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </>
  );
}
