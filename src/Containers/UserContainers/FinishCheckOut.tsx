import { Grid } from "@mui/material";
import thank from "../../assets/thank.jpg";
import DefaultLayout from "../../components/DefaultLayout";
import "react-slideshow-image/dist/styles.css";
import * as React from "react";
import Typography from "@mui/material/Typography";

const FinishCheckOut: React.FC = () => {
  const renderMain = () => {
    return (
      <Grid
        alignItems={"center"}
        sx={{ marginTop: 2 }}
        container
        xs={12}
        md={12}>
        <Grid
          sx={{ backgroundColor: "#FEB800", borderRadius: 2, padding: 1 }}
          item
          xs={12}
          md={12}>
          <Typography sx={{ fontWeight: 600, color: "#3343c2" }} variant="h2">
            Thank you For Booking
          </Typography>
        </Grid>

        <Grid item xs={12} md={12}>
          <Typography
            sx={{ fontWeight: 650000, color: "#FEB800" }}
            variant="h2">
            Please check your mail to see details ticket!
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <img style={{ width: "100%", height: 610 }} alt="thank" src={thank} />
        </Grid>
      </Grid>
    );
  };
  return <DefaultLayout content={renderMain()} />;
};

export default FinishCheckOut;
