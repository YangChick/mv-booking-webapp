import {
  Alert,
  Box,
  Breadcrumbs,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  Button,
  TextField
} from "@mui/material";
import DefaultLayout from "../../components/DefaultLayout";
import { Fade, Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import * as React from "react";
import { CardMovie, RoundButton } from "../../components/common";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getAllAvailableMovies,
  getAllMovies,
  movieAvailbel,
  movies,
  status,
} from "../../features/movies/moviesSlice";
import {
  getShowTimeById,
  showTimes,
} from "../../features/showTimes/showTimeSlice";

const Home: React.FC = () => {
  const getAllAvailableMovie = useAppSelector(movieAvailbel);
  const getMovies = useAppSelector(movies);
  const getShowtimes = useAppSelector(showTimes);
  const stt = useAppSelector(status);
  const dispatch = useAppDispatch();
  const [pages, setPages] = React.useState<number>(1);
  const [searchByKeyword, setSearchByKeyword] = React.useState<string>("");
  const [listMovies, setListMovies] = React.useState<any>([]);

  React.useEffect(() => {
    dispatch(getAllAvailableMovies({}));
    // dispatch(getAllShowTimes("315162"));
  }, [pages]);

  const handleSearch = () =>{
    dispatch(getAllAvailableMovies({ keyword: searchByKeyword }))
    setSearchByKeyword("")
  }

  React.useEffect(() => {
    if (getAllAvailableMovie.payload)
      setListMovies([...getAllAvailableMovie.payload]);
  }, [getAllAvailableMovie]);
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
            {listMovies.length === 0 ? (
              <>
                <Typography
                  variant="h2"
                  sx={{ fontWeight: 600, color: "#3343c2" }}>
                  Thank you for visiting the page, currently there are no
                  showings in theaters!
                </Typography>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_XOpRALMbyoIA4ectCP2R45-2S5LLN7nPDA&usqp=CAU" />
              </>
            ) : (
              ""
            )}
            <Grid item md={12} xs={12} padding={1}>
                <Slide
                  // transitionDuration={2000}
                  easing="linear"
                  arrows={false}
                  duration={2000}
                  infinite={true}>
                  {listMovies?.map(
                    (item: any, index: string) => (
                      <div className="each-fade" key={index}>
                        <div className="image-container">
                          <img
                            width={"100%"}
                            height={220}
                            style={{
                              objectFit: "cover",
                              borderRadius: 10,
                              padding: "0 3px",
                            }}
                            src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                          />
                        </div>
                      </div>
                    ),
                  )}
                </Slide>
            </Grid>
            <Grid item md={12} xs={12} padding={1}>
              <Grid sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }} item md={12} xs={12} lg={12}>
                <TextField onChange={(e) => setSearchByKeyword(e.target.value)} variant="outlined" label='Search movie...'></TextField>
                <Button sx={{
                  marginLeft: 2,
                  height: 1
                }} onClick={() =>handleSearch()} variant="contained">Search</Button>
              </Grid>
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
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              item
              md={12}
              xs={12}>
              {/* <RoundButton label="Move To Top" /> */}
            </Grid>
          </Grid>
        )}
      </>
    );
  };
  return <DefaultLayout content={renderMain()} />;
};

export default Home;
