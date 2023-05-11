import { Box, Breadcrumbs, CircularProgress, Grid, Stack } from "@mui/material";
import DefaultLayout from "../../components/DefaultLayout";
import { Fade, Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import * as React from "react";
import { CardMovie, RoundButton } from "../../components/common";
import Ultils from "../../Ultils";
import { ROUTERS } from "../../Contants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getAllMovies,
  movies,
  status,
} from "../../features/movies/moviesSlice";

const List: React.FC = () => {
  const getMovies = useAppSelector(movies);
  const stt = useAppSelector(status);
  const dispatch = useAppDispatch();
  const [pages, setPages] = React.useState<number>(1);
  const [listMovies, setListMovies] = React.useState<any>([]);

  React.useEffect(() => {
    dispatch(getAllMovies(pages));
  }, []);

  React.useEffect(() => {
    if (getMovies.payload)
      setListMovies([...listMovies, ...getMovies.payload.results]);
  }, [getMovies]);

  const onChangePage = (newPage: number) => {
    setPages(newPage);
    dispatch(getAllMovies(pages));
  };

  const renderMain = () => {
    return (
      <>
        {stt === "loading" ? (
          <Box
            sx={{
              display: "flex",
              height: 100,
              justifyContent: "center",
              width: 1,
              alignItems: "center",
            }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container xs={12} md={12}>
            <Grid item md={12} xs={12} padding={1}>
              <Grid sx={{ overflow: "hidden" }} container md={12} xs={12}>
                {listMovies &&
                  listMovies.map((item: any, index: string) => {
                    return (
                      <Grid
                        key={index}
                        padding={"6px 6px"}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}>
                        <CardMovie payload={item} />
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
            <Grid
              justifyContent={"center"}
              item
              md={12}
              xs={12}
              padding={"0 14px"}>
              <RoundButton
                onClick={() => onChangePage(pages + 1)}
                label="Load More"
              />
            </Grid>
          </Grid>
        )}
      </>
    );
  };
  return <DefaultLayout content={renderMain()} />;
};

export default List;
