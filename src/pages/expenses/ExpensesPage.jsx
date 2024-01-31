import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Checkbox,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../expenses/ExpensesPage.css";


export default function ExpensesPage() {

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <>
        <Grid container spacing={1} rowGap={2} className="contact-grid">
          <Grid
            item
            sm={6}
            md={4}
            xs={12}
            lg={12}
            style={{ paddingTop: "0px", paddingLeft: "0px" }}>
            <h4 className="heading">Expenses</h4>
          </Grid>
        </Grid>
        <div className="contact-list">
          <Grid container spacing={2} className="expenses-grid">
            <Grid item xs={12} className="expenses-list">
              <Stack direction="row" justifyContent={"space-between"} spacing={2}>
                <Stack direction="row" spacing={2}>
                  <Button className="ticket-btn active">Unsent</Button>
                  <Button variant="outlined" className="ticket-btn">
                    Sent
                  </Button>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Button className="ticket-btn active" onClick={() => {}}>
                    Add Expense
                  </Button>
                  <Button className="ticket-btn active" onClick={() => {}}>
                    Send
                  </Button>
                </Stack>
              </Stack>
              <div className="list-content">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Accordion className="list-item">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className="acc-summary">
                      <div style={{ display: "flex" }}>
                        <div>
                          <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </div>
                        <div>
                          <Typography className="title">Expenses</Typography>
                          <span className="date">November 27, 2023</span>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </Grid>
          </Grid>
        </div>
      </>
    )
}