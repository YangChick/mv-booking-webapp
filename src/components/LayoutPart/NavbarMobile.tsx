import Ultils from "../../Ultils";
import { Grid, Stack, Typography } from "@mui/material";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { RoundButton } from "../common";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SegmentOutlinedIcon from "@mui/icons-material/SegmentOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { ROUTERS } from "../../Contants";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import TheatersIcon from "@mui/icons-material/Theaters";
import { Link } from "react-router-dom";
import ReceiptIcon from "@mui/icons-material/Receipt";
import React from "react";
/* eslint-disable import/first */

const NavBarMobile = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Grid
      height={1}
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      item
      xs={12}
      md={12}>
      <Stack
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <MovieFilterIcon
          sx={{
            color: "#fff",
            fontSize: {
              xs: 40,
              md: 70,
              lg: 90,
            },
          }}
        />
        <Typography
          variant="h3"
          sx={{
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            width: 1,
            padding: 1,
          }}>
          Movie
          <Typography
            variant="h3"
            sx={{ fontSize: 16, color: "#FEB800", fontWeight: 600 }}>
            Booking
          </Typography>
        </Typography>
      </Stack>
      <Stack display={"flex"} flexDirection={"row"}>
        <RoundButton
          startIcon={<HomeOutlinedIcon />}
          sx={{ width: 1, backgroundColor: "#FEB800" }}
          label="HOME"
          onClick={() => Ultils.redirect(ROUTERS.HOME)}
        />

        <RoundButton
          startIcon={<ManageAccountsIcon />}
          sx={{ backgroundColor: "#FEB800", margin: "0 6px" }}
          label="list"
          onClick={() => Ultils.redirect(ROUTERS.LIST)}
        />

        <RoundButton
          startIcon={<ManageAccountsIcon />}
          sx={{ backgroundColor: "#FEB800", position: "relative" }}
          label="manage"
          onClick={() => setIsOpen(!isOpen)}
          // onClick={() => Ultils.redirect(ROUTERS.LIST)}
        />
        <Grid
          sx={{
            right: 16,
            top: 50,
            position: "absolute",
            width: 300,
            margin: "3px 0",
            padding: 1,
            display: `${isOpen ? "block" : "none"}`,
            transition: "all 1s esa",
            backgroundColor: "#3343c2",
            borderRadius: 1,
            boxShadow: "0 12px 10px 10px #fff",
          }}>
          <RoundButton
            startIcon={<ManageAccountsIcon />}
            sx={{ backgroundColor: "#FEB800", margin: "6px 0" }}
            label="Show Time"
            onClick={() => Ultils.redirect(ROUTERS.SHOWTIME)}
          />

          <RoundButton
            startIcon={<TheatersIcon />}
            sx={{ backgroundColor: "#FEB800" }}
            onClick={() => Ultils.redirect(ROUTERS.MOVIE_THEATER)}
            label="Movie Theater"
          />
          <RoundButton
            startIcon={<FastfoodIcon />}
            sx={{ backgroundColor: "#FEB800", margin: "6px 0" }}
            onClick={() => Ultils.redirect(ROUTERS.FOODS)}
            label="Foods"
          />
          <RoundButton
            startIcon={<ReceiptIcon />}
            sx={{ backgroundColor: "#FEB800" }}
            label="Invoices"
            onClick={() => Ultils.redirect(ROUTERS.INVOICES)}
          />
        </Grid>
      </Stack>
    </Grid>
  );
};

export default NavBarMobile;
