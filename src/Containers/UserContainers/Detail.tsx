import { Grid, Stack, Box } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";

import DefaultLayout from "../../components/DefaultLayout";
import "react-slideshow-image/dist/styles.css";
import * as React from "react";
import { CardMovie, RoundButton } from "../../components/common";
import Typography from "@mui/material/Typography";
import { Slide } from "react-slideshow-image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { details, getDetails } from "../../features/movies/moviesSlice";
const fadeImages = [
  {
    url: "https://static2.yan.vn/YanNews/2167221/201807/poster-moi-cua-aquaman-voi-doi-quan-bien-ca-hung-hau-944c0261.jpg",
  },
  {
    url: "https://static2.yan.vn/YanNews/2167221/201807/poster-moi-cua-aquaman-voi-doi-quan-bien-ca-hung-hau-944c0261.jpg",
  },
  {
    url: "https://static2.yan.vn/YanNews/2167221/201807/poster-moi-cua-aquaman-voi-doi-quan-bien-ca-hung-hau-944c0261.jpg",
  },
  {
    url: "https://static2.yan.vn/YanNews/2167221/201807/poster-moi-cua-aquaman-voi-doi-quan-bien-ca-hung-hau-944c0261.jpg",
  },
  {
    url: "https://static2.yan.vn/YanNews/2167221/201807/poster-moi-cua-aquaman-voi-doi-quan-bien-ca-hung-hau-944c0261.jpg",
  },
  {
    url: "https://static2.yan.vn/YanNews/2167221/201807/poster-moi-cua-aquaman-voi-doi-quan-bien-ca-hung-hau-944c0261.jpg",
  },
];
const Details: React.FC = () => {
  const dispatch = useAppDispatch();
  const detail = useAppSelector(details);
  const { id } = useParams();
  console.log(detail);
  React.useEffect(() => {
    if (id) dispatch(getDetails(id));
  }, []);
  const navigate = useNavigate();
  const renderMain = () => {
    return (
      <Grid container xs={12} md={12}>
        <Grid
          height={"30px"}
          display={"flex"}
          item
          xs={12}
          md={12}
          padding={"0 12px"}
        >
          <Stack
            sx={{
              width: 0.8,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box
              onClick={() => navigate(-1)}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "max-content",
                cursor: "pointer",
                "&:hover": {
                  borderBottom: "solid 2px #FEB800",
                },
              }}
            >
              <ArrowBackIosIcon sx={{ color: "#FEB800" }} />
              <Typography
                sx={{
                  fontWeight: 800,
                  color: "#FEB800",
                }}
                variant="h6"
              >
                Go Back
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item md={4} xs={12}>
          <Grid padding={"6px 6px"} item md={12} xs={12}>
            <CardMovie payload={detail} isDetail />
          </Grid>
        </Grid>
        <Grid sx={{ backgroundColor: "" }} item md={8} xs={12}>
          <Grid container padding={"6px 6px"} md={12} xs={12}>
            <Grid item padding={"6px 6px"} md={12} xs={12}>
              <Typography
                noWrap
                sx={{
                  display: "-webkitBox",
                  width: 1,
                  fontWeight: 700,
                  color: "#FEB800",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                variant="h4"
                component="div"
              >
                {detail.title}
              </Typography>
            </Grid>
            <Grid item padding={"6px 6px"} md={12} xs={12}>
              <Typography
                sx={{
                  width: "max-content",
                  padding: "8px",
                  borderRadius: 2,
                  backgroundColor: "#E8EFFD",
                }}
                variant="h6"
              >
                Time Duration: {detail.runtime} minutes
              </Typography>
            </Grid>

            <Grid item padding={"6px 6px"} md={12} xs={12}>
              <Typography
                sx={{
                  padding: "0 8px",
                  borderRadius: 2,
                  backgroundColor: "#E8EFFD",
                  height: 273,
                  overflowY: "scroll",
                  "&::-webkit-scrollbar": {
                    width: "0.2em",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#3343C2",
                    borderRadius: "12px",
                  },
                }}
                variant="h6"
              >
                {detail.overview}
              </Typography>
            </Grid>
            <Grid item padding={"6px 6px"} md={12} xs={12}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/checkout/${detail?.id}`}
              >
                <RoundButton
                  sx={{ width: 1, backgroundColor: "#FEB800" }}
                  label="ChECKOUT"
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} xs={12} padding={1}>
          <img
            style={{
              width: "100%",
              // height: 200,
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: 4,
            }}
            src={`https://image.tmdb.org/t/p/original/${detail?.backdrop_path}`}
          />
        </Grid>
      </Grid>
    );
  };
  return <DefaultLayout content={renderMain()} />;
};

export default Details;
