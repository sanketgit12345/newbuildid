import {
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import React from "react";
import "./JobPostingPage.css";
import { BIBlue, BIRed } from "./../../constant/Color";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import RoomIcon from "@mui/icons-material/Room";
export default function JobPostingPage() {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  return (
    <>
      <Grid container spacing={1} rowGap={2} className="page-heading-grid">
        <Grid
          item
          sm={6}
          md={4}
          xs={12}
          lg={12}
          style={{ paddingTop: "0px", paddingLeft: "0px" }}>
          <h4 className="page-heading-title">Job Postings</h4>
        </Grid>
      </Grid>
      <div className="jobposting-list">
        <div className="header">
          <div className="top-left">
            <Button className="ticket-btn active" onClick={() => {}}>
              My Posting
            </Button>
          </div>
          <div>
            <div className="top-right">
              <div onClick={() => {}} style={{ color: BIBlue }}>
                <RoomIcon variant="contained" fontSize="small" />
                <span>Using Current Location</span>
              </div>
              <div>
                <ListOutlinedIcon style={{ color: BIBlue }} />
              </div>
            </div>
          </div>
        </div>

        <TableContainer component={Paper} className="jobposting-container">
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            className="jobposting-table">
            <TableBody>
              {[1, 2, 3].map((item) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center" className="list-content">
                    <Stack spacing={2}>
                      <h6 className="list-name">Ash Project (0.09 km away)</h6>
                      <p className="list-price">Ritestart Limited</p>
                      <div style={{ display: "flex", gap: 2 }}>
                        <Chip label="Administration " />
                        <Chip label="2 Days" />
                      </div>
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
