import React, { useEffect, useMemo } from "react";
import { Grid, Container } from "@mui/material";
import { NavBar } from "../LayoutPart";
import NavBarMobile from "../LayoutPart/NavbarMobile";

interface ISectionProps {
  content: JSX.Element;
  callback?: () => void;
}
const UserLayout: React.FC<ISectionProps> = (props: ISectionProps) => {
  // Constructors
  const { content, callback } = props;

  // Renders.

  return (
    <Grid
      sx={{
        backgroundColor: "#fff",
        width: {
          xs: 1,
          md: 0.8,
          lg: 0.8,
        },
        height: {
          xs: 1,
          md: 0.9,
          lg: 0.9,
        },
        borderRadius: {
          xs: 0,
          md: 2,
          lg: 2,
        },
        boxShadow: "0 10px 10px 0 #ccc",
        overflow: "scroll",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
          width: {
            xs: "none",
            md: "0.4em",
            lg: "0.4em",
          },
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#3343c2",
          borderRadius: "12px",
        },
      }}
      container
    >
      <Grid
        xs={2}
        md={1.5}
        sx={{
          height: 1,
          position: "sticky",
          top: "0",
          boxShadow: "-12px 0 10px 20px #ccc",
          backgroundColor: "#3343c2",
          display: {
            xs: "none",
            md: "unset",
            lg: 34,
          },
        }}
        item
        p={2}
      >
        <NavBar />
      </Grid>
      <Grid
        xs={12}
        md={12}
        sx={{
          height: 60,
          width: 1,
          position: "fixed",
          top: 0,
          boxShadow: "-12px 0 10px 10px #ccc",
          backgroundColor: "#3343c2",
          zIndex: 4,
          display: {
            xs: "unset",
            md: "none",
            lg: "none",
          },
        }}
        item
        p={2}
      >
        <NavBarMobile />
      </Grid>
      <Grid
        sx={{
          marginTop: {
            xs: 10,
            md: "unset",
            lg: "unset",
          },
        }}
        xs={12}
        md={10.5}
        item
        p={0.5}
      >
        <Container maxWidth="xl">{content}</Container>
      </Grid>
    </Grid>
  );
};

export default UserLayout;
