import React from "react";
import "./MontagesPage.css";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Stack,
} from "@mui/material";
import getPostimg from "../../assets/images/post-card-first.jpg";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
export default function MontagesPage() {
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
          <h4 className="page-heading-title">Montages</h4>
        </Grid>
      </Grid>
      <div className="montages-list">
        <div>
          <Stack direction="row" spacing={2} className="montages-main">
            <Button className="ticket-btn active">ADD MONTAGES</Button>
          </Stack>
          <Grid
            container
            spacing={2}
            className="montages-grid-content"
            marginTop={0}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Grid item xs={12} sm={6} md={3} lg={3} className="montages-item">
                <Card sx={{ maxWidth: 345 }} className="montages-card">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={getPostimg}
                      alt="green iguana"
                    />
                    <CardContent className="montages-content">
                      <h6 className="montages-title">testing apis</h6>
                      <div className="montages-icon">
                        <EditIcon />
                        <ShareIcon />
                        <DeleteIcon />
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}
