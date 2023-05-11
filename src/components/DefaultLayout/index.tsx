import React, { useRef, useState, useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";

import AdminLayout from "./AdminLayout";
import { mainStyles } from "./DefaultLayout.style";
import UserLayout from "./UserLayout";
// import { ChartColumn } from '../Common';

type PORTAL_TYPE = "USER" | "REVIEWER" | "ADMIN";
interface SectionProps {
  content: JSX.Element;
  portalFor?: PORTAL_TYPE;
}

const DefaultLayout: React.FC<SectionProps> = (props: SectionProps) => {
  const { content, portalFor = "USER" } = props;

  const renderPotal = () => {
    switch (portalFor) {
      case "ADMIN":
        return <AdminLayout content={content} />;
      default:
        return <UserLayout content={content} />;
    }
  };
  return (
    <Box sx={mainStyles}>
      <CssBaseline />
      {renderPotal()}
      {portalFor === "USER"}
    </Box>
  );
};

export default DefaultLayout;
