import React from "react";
import { Grid } from "@mui/material";
import { NavBar } from "../LayoutPart";

// import { SideBarComponent } from "../LayoutPart";
interface ISectionProps {
  content: JSX.Element;
}

// Declare utils
const AdminLayout: React.FC<ISectionProps> = (props: ISectionProps) => {
  // Constructors
  const { content } = props;

  return (
    <Grid container width={1} height="100%" flexWrap="nowrap">
      <NavBar />
      <Grid item p={4} xs={12}>
        {content}
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
