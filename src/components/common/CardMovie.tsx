import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { ROUTERS } from "../../Contants";
import Ultils from "../../Ultils";
import RoundButton from "./RoundButton";
import React from "react";

import { Link } from "react-router-dom";
interface ISectionProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isDetail?: boolean;
  payload: any;
  chosenMovie?: boolean;
}

const CardMovie: React.FC<ISectionProps> = ({
  payload,
  isDetail = false,
  chosenMovie = false,
}) => {
  return (
    <Card
      sx={{
        border: "2px solid #3343c2",
        overflow: "hidden",
        "& .css-46bh2p-MuiCardContent-root": {
          padding: "8px",
        },
        "& .css-46bh2p-MuiCardContent-root:last-child": {
          paddingBottom: "8px",
        },
      }}>
      <CardContent style={{ height: `${!isDetail ? "340px" : "445px"}` }}>
        <img
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: 3,
          }}
          src={`https://image.tmdb.org/t/p/original/${payload?.poster_path}`}
        />
        {!isDetail && (
          <Typography
            noWrap
            sx={{
              display: "-webkitBox",
              overflow: "hidden",
              fontSize: 13,
              fontWeight: 600,
              width: 1,
              textOverflow: "ellipsis",
              height: "20px",
            }}
            variant="h6"
            component="div">
            {payload?.title}
          </Typography>
        )}
      </CardContent>
      {!isDetail && (
        <CardActions
          sx={{
            width: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            mt: 2,
          }}>
          <Link
            style={{ textDecoration: "none" }}
            to={`/details/${payload?.id}`}>
            <RoundButton
              sx={{
                width: "100%",
                color: "#3343c2",
                backgroundColor: "transparent ",
                "&:hover": {
                  backgroundColor: "red",
                  color: "#fff",
                },
              }}
              label="DETAIL"
            />
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to={`/checkout/${payload?.id}`}>
            <RoundButton
              sx={{
                width: 1,
                backgroundColor: "#FEB800",
                "&:hover": {
                  backgroundColor: "#3343c2",
                  color: "#fff",
                },
              }}
              label="ChECKOUT"
            />
          </Link>
          {chosenMovie && (
            <Link
              style={{ textDecoration: "none" }}
              to={`/checkout/${payload?.id}`}>
              <RoundButton
                sx={{
                  width: 1,
                  backgroundColor: "#FEB800",
                  "&:hover": {
                    backgroundColor: "#3343c2",
                    color: "#fff",
                  },
                }}
                label="Chosen This Movie"
              />
            </Link>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default CardMovie;
