import React from "react";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

interface IRoundButton {
  label?: string;
  size?: "small" | "medium" | "large" | undefined;
  onClick?: () => void;
  sx?: object;
  disabled?: boolean;
  type?: "text" | "contained" | "outlined";
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

const RoundButton: React.FC<IRoundButton> = ({
  label,
  size,
  onClick,
  sx,
  disabled = false,
  type = "contained",
  startIcon,
  endIcon,
}) => {
  return (
    <Button
      size={size}
      sx={{
        width: 1,
        display: "flex",
        justifyContent: {
          xs: "center",
          md: "flex-start",
          lg: "flex-start",
        },
        overflow: "hidden",
        overflowX: "ellipsis",
        ...sx,
        fontSize: 14,
      }}
      variant={type}
      disabled={disabled}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}>
      {/* <Typography
        sx={{
          display: {
            xs: "none",
            md: "none",
            lg: "unset",
          },
          fontSize: {
            xs: 16,
            md: 10,
            lg: 16,
          },
        }}>
        {label}
      </Typography> */}
      {label}
    </Button>
  );
};

export default RoundButton;
