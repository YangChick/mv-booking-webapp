import {
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Fade,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ROUTERS } from "../../Contants";
import {
  getAllMovies,
  movies,
  status,
} from "../../features/movies/moviesSlice";
import Ultils from "../../Ultils";
import RoundButton from "./RoundButton";

interface ISectionProps {
  isOpen: boolean;
  onclose?: () => void;
  listMovie: any[];
}

const ChoosenMoviePopup: React.FC<ISectionProps> = ({
  isOpen = false,
  onclose = () => false,
}) => {
  const dispatch = useAppDispatch();
  const getMovies = useAppSelector(movies);
  const stt = useAppSelector(status);
  const [pages, setPages] = useState<number>(1);
  const [listMovies, setListMovies] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getAllMovies(pages));
  }, []);

  useEffect(() => {
    if (getMovies.payload) setListMovies([...getMovies.payload.results]);
  }, [getMovies]);

  const onChangePage = (newPage: number) => {
    console.log(stt);
    setPages(newPage);
    dispatch(getAllMovies(pages));
    setListMovies([...getMovies.payload.results]);
  };

  return (
    <Modal
      sx={{
        left: 100,
        right: 100,
        top: 100,
      }}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={() => onclose()}
      closeAfterTransition
      // BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={isOpen}>
        <Grid
          sx={{
            width: 1,
            height: 0.8,
            borderRadius: 5,
            backgroundColor: "#fff",
            padding: 1,
            border: "solid 2px #fff",
            overflow: "hidden",
            overflowY: "scroll",
          }}
          container
          md={12}
          xs={12}>
          <Grid padding={"12px 0"} item xs={12} md={12}>
            <Box
              sx={{
                width: 1,
                borderRadius: 5,
                boxShadow: "2px 2px 0px 0px #FEB800",
                padding: 1,
              }}>
              <Typography
                sx={{ fontWeight: 600, color: "#FEB800" }}
                variant="h4">
                Chosen Film To Create Show Time
              </Typography>
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Grid container md={12} xs={12}>
              {listMovies &&
                listMovies.map((item: any, index: number) => {
                  return (
                    <Grid
                      key={index}
                      padding={"6px 6px"}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}>
                      <Card sx={{ maxWidth: 345, height: 300 }}>
                        <CardMedia
                          sx={{ height: 0.6 }}
                          image={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
                          title="green iguana"
                        />
                        <CardContent
                          sx={{ height: 80, zIndex: 2, overflow: "hidden" }}>
                          <Typography
                            gutterBottom
                            sx={{ fontWeight: 600 }}
                            component="div">
                            {item.original_title}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ height: 30 }}>
                          <Button
                            onClick={() =>
                              Ultils.redirect({
                                pathname: `${ROUTERS.CREATE_SHOW_TIME}`,
                                id: item.id,
                              })
                            }
                            variant="outlined"
                            size="small">
                            Choosen
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
          {stt === "loading" && (
            <Grid md={12} xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            </Grid>
          )}
          <Grid
            justifyContent={"center"}
            item
            md={3}
            xs={12}
            padding={"0 14px"}>
            <RoundButton
              onClick={() => onChangePage(pages - 1)}
              label="Previous"
            />
          </Grid>
          <Grid
            justifyContent={"center"}
            item
            md={3}
            xs={12}
            padding={"0 14px"}>
            <RoundButton onClick={() => onChangePage(pages + 1)} label="Next" />
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
};

export default ChoosenMoviePopup;
