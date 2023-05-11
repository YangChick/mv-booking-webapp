import { SxProps, Theme } from "@mui/system";

export const mainStyles: SxProps<Theme> = {
  position: "relative",
  height: {
    xs: 1,
    md: "100vh",
    lg: "100vh",
  },
  display: "flex",
  overflow: "auto",
  alignItems: "center",
  fontFamily: "Lato",
  justifyContent: "center",
  backgroundColor: "#e0e7fe",
  overflowY: "scroll",
  // background: CommonColors.mainBackground,
};

export const portalStyles: SxProps<Theme> = {
  flexGrow: 1,
  display: "flex",
  height: "100%",
};

export const landingStyles: SxProps<Theme> = {
  flexGrow: 1,
  display: "flex",
  height: "100%",
};
