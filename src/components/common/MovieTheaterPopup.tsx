import { LoadingButton } from "@mui/lab";
import { Box, Fade, Grid, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  movieTheaterDetails,
  getAllMovieTheater,
  getDetails,
  getMovieTheaterById,
  removeMovieTheater,
  updateNameMovieTheater,
} from "../../features/moviesTheater/movieTheaterSlice";

interface ISectionProps {
  id: string;
  isOpen: boolean;
  onclose?: () => void;
}

const MovieTheaterPopup: React.FC<ISectionProps> = ({
  id = "",
  isOpen = false,
  onclose = () => false,
}) => {
  const dispatch = useAppDispatch();
  const movieTheaterDetail = useAppSelector(movieTheaterDetails);
  const [payload, setPayload] = useState({
    id: "",
    name: "",
  });
  const handleClose = () => {
    onclose();
  };
  const handle = (action: string) => {
    if (action === "edit") {
      dispatch(updateNameMovieTheater(payload));
      handleClose();
    }
    if (action === "remove") {
      console.log(payload);
      dispatch(removeMovieTheater(payload.id));
      handleClose();
    }
  };

  useEffect(() => {
    dispatch(getMovieTheaterById(id));
  }, [isOpen]);
  useEffect(() => {
    if (movieTheaterDetail) setPayload(movieTheaterDetail);
  }, [movieTheaterDetail]);
  return (
    <Modal
      sx={{
        left: 400,
        right: 400,
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
            borderRadius: 5,
            backgroundColor: "#fff",
            padding: 1,
            border: "solid 2px #fff",
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
                Edit Movie Theater
              </Typography>
            </Box>
          </Grid>
          <Grid padding={"12px 0"} item xs={12} md={12}>
            <TextField
              onChange={(e) =>
                setPayload({
                  ...payload,
                  name: e.target.value,
                })
              }
              fullWidth
              name="name"
              value={payload.name}
            />
          </Grid>
          <Grid
            sx={{
              width: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
            padding={"0px 0"}
            item
            xs={12}
            md={12}>
            <LoadingButton
              onClick={() => handle("edit")}
              sx={{
                backgroundColor: "#10ac84",
                borderColor: "#10ac84",
                "&:hover": {
                  borderColor: "#10ac84",
                  backgroundColor: "#10ac84",
                },
              }}
              // onClick={() => handleCreate()}
              // loading={stt === "loading"}
              loadingPosition="start"
              variant="contained">
              Save
            </LoadingButton>
            <LoadingButton
              onClick={() => handle("remove")}
              variant="contained"
              // onClick={() => handleCreate()}
              // loading={stt === "loading"}
              sx={{
                borderColor: "#ea4435",
                backgroundColor: "#ea4435",
                marginLeft: 1,
                "&:hover": {
                  borderColor: "#ea4435",
                  backgroundColor: "#ea4435",
                },
              }}
              loadingPosition="start">
              Remove This Movie Theater
            </LoadingButton>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
};

export default MovieTheaterPopup;
