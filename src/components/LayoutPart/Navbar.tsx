import Ultils from "../../Ultils";
import { Grid, Stack, Typography } from "@mui/material";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { RoundButton } from "../common";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SegmentOutlinedIcon from "@mui/icons-material/SegmentOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { COOKIES, ROUTERS } from "../../Contants";
import ReceiptIcon from "@mui/icons-material/Receipt";
import React, { useEffect } from "react";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import TheatersIcon from "@mui/icons-material/Theaters";
import FoodManagement from "../../Containers/AdminContainers/FoodManagement";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { payload, reset } from "../../features/auth/authSlice";
import Cookies from "universal-cookie";
/* eslint-disable import/first */
const COOKIE_KEYS = COOKIES;

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const payloadAuth = useAppSelector(payload);
  const logout = () => {
    document.cookie = `${COOKIE_KEYS.SAVED_SECURE_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    Ultils.clearAllSavedData();
    Ultils.redirect(ROUTERS.LOGIN);
    dispatch(reset());
  };
  useEffect(() => {
    console.log(payloadAuth);
  }, []);
  return (
    <Grid container flexDirection="row" justifyContent="center">
      <Grid item xs={12} md={12}>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 6,
          }}>
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
      </Grid>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
        item
        xs={12}
        md={12}>
        <RoundButton
          startIcon={<HomeOutlinedIcon />}
          sx={{ width: 1, backgroundColor: "#FEB800" }}
          label="HOME"
          onClick={() => Ultils.redirect(ROUTERS.HOME)}
        />
      </Grid>
      <RoundButton
        startIcon={<ManageAccountsIcon />}
        sx={{ backgroundColor: "#FEB800", margin: "6px 0" }}
        label="list"
        onClick={() => Ultils.redirect(ROUTERS.LIST)}
      />
      {payloadAuth &&
        payloadAuth.payload &&
        payloadAuth.payload.access_token != "" && (
          <>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
              item
              xs={12}
              md={12}></Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
              item
              xs={12}
              md={12}>
              <RoundButton
                startIcon={<ManageAccountsIcon />}
                sx={{ backgroundColor: `${!isOpen ? "#FEB800" : "unset"}` }}
                label="manage"
                onClick={() => setIsOpen(!isOpen)}
              />
            </Grid>
            <Grid
              sx={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: 1,
                margin: "3px 0",
                display: `${isOpen ? "flex" : "none"}`,
                transition: "all 1s esa",
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
          </>
        )}

      <Grid
        sx={{
          position: "absolute",
          left: 12,
          right: 12,
          bottom: 40,
        }}
        item
        xs={12}
        md={12}>
        {payloadAuth &&
          payloadAuth.payload &&
          payloadAuth.payload.access_token === "" && (
            <RoundButton
              startIcon={<ManageAccountsIcon />}
              sx={{ backgroundColor: `${!isOpen ? "#FEB800" : "unset"}` }}
              label="login"
              onClick={() => Ultils.redirect(ROUTERS.LOGIN)}
            />
          )}

        {payloadAuth &&
          payloadAuth.payload &&
          payloadAuth.payload.access_token != "" && (
            <RoundButton
              startIcon={<ManageAccountsIcon />}
              sx={{ backgroundColor: `${!isOpen ? "#FEB800" : "unset"}` }}
              label="logout"
              onClick={logout}
            />
          )}
      </Grid>
    </Grid>
  );
};

export default NavBar;
