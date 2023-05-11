import { LoadingButton } from "@mui/lab";
import {
  Box,
  CircularProgress,
  Fade,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getDetails } from "../../features/movies/moviesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getAllMovieTheater,
  getMovieTheaterById,
  movieTheaterPayload,
  movieTheaterDetails,
} from "../../features/moviesTheater/movieTheaterSlice";
import SaveIcon from "@mui/icons-material/Save";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  deleteShowTimes,
  getShowTimeById,
  showTimes,
  update,
  updateShowTimes,
  status,
} from "../../features/showTimes/showTimeSlice";

interface ISectionProps {
  id: string;
  isOpen: boolean;
  onclose?: () => void;
}
const defaultValues = {
  fields: {
    date: "",
    movieTheaterId: "",
    time: "",
    movieId: "",
    movieName: "",
  },
  errors: {
    date: "",
    movieTheaterId: "",
    time: "",
    movieId: "",
  },
};
const ShowTimePopup: React.FC<ISectionProps> = ({
  id = "",
  isOpen = false,
  onclose = () => false,
}) => {
  const dispatch = useAppDispatch();
  const listMovieTheaters = useAppSelector(movieTheaterPayload);
  const [listMovieTheater, setListMovieTheater] = useState<any>([]);
  const [formValues, setFormValues] = useState<any>(defaultValues);
  const stt = useAppSelector(status);
  const updateShowTimePayload = useAppSelector(update);
  const showTimeDetails = useAppSelector(showTimes);
  const handleClose = () => {
    onclose();
  };
  const handle = (action: string) => {
    if (action === "edit") {
      const newPayload = {
        id: id,
        ...formValues.fields,
      };
      // dispatch(updateNameMovieTheater(payload));
      dispatch(updateShowTimes(newPayload));
      handleUpdate();
    }
    if (action === "remove") {
      dispatch(deleteShowTimes(id));
    }
  };

  useEffect(() => {
    if (updateShowTimePayload && updateShowTimePayload.payload) {
      handleClose();
    }
    console.log("heheh");
  }, [updateShowTimePayload.payload]);

  const validate = (name: any, value: any) => {
    switch (name) {
      case "date":
        if (!value) {
          return "Date is Required";
        } else {
          return "";
        }
      case "movieTheaterId":
        if (!value) {
          return "MovieTheater is Required";
        } else {
          return "";
        }
      case "time":
        if (!value) {
          return "Time is Required";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      errors: {
        ...formValues.errors,
        [name]: validate(name, value),
      },
      fields: {
        ...formValues.fields,
        [name]: value,
      },
    });
  };

  const handleChangeDate = (value: Date) => {
    const resolveMonth =
      new Date(value).getMonth() + 1 < 10
        ? `0${new Date(value).getMonth() + 1}`
        : new Date(value).getMonth() + 1;
    const resolvedDate = `${resolveMonth}/${new Date(
      value,
    ).getDate()}/${new Date(value).getFullYear()}`;

    setFormValues({
      errors: {
        ...formValues.errors,
        date: validate("date", resolvedDate),
      },
      fields: {
        ...formValues.fields,
        date: value,
      },
    });
  };

  const handleUpdate = () => {
    const { fields } = formValues;
    let validationErrors: any = {};
    Object.keys(fields).forEach((name) => {
      const error = validate(name, fields[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setFormValues({ errors: validationErrors });
    }
    const resolveMonth =
      new Date(formValues.fields.date).getMonth() + 1 < 10
        ? `0${new Date(formValues.fields.date).getMonth() + 1}`
        : new Date(formValues.fields.date).getMonth() + 1;
    const resolvedDate = `${resolveMonth}/${new Date(
      formValues.fields.date,
    ).getDate()}/${new Date(formValues.fields.date).getFullYear()}`;
  };
  useEffect(() => {
    dispatch(getAllMovieTheater({}));
  }, []);

  useEffect(() => {
    dispatch(getDetails(id));
  }, [id]);

  useEffect(() => {
    dispatch(getShowTimeById(id));
  }, [id]);

  useEffect(() => {
    if (showTimeDetails && showTimeDetails.payload)
      setFormValues({
        errors: {
          ...formValues.errors,
        },
        fields: {
          ...formValues.fields,
          date: showTimeDetails.payload && dayjs(showTimeDetails.payload.date),
          time: showTimeDetails.payload && showTimeDetails.payload.time,
          movieName:
            showTimeDetails.payload && showTimeDetails.payload.movieName,
          movieTheaterId:
            showTimeDetails.payload && showTimeDetails.payload.movieTheaterId,
          movieId: showTimeDetails.payload && showTimeDetails.payload.movieId,
        },
      });
  }, [showTimeDetails]);

  useEffect(() => {
    if (listMovieTheaters) setListMovieTheater(listMovieTheaters.payload);
  }, [listMovieTheaters]);

  useEffect(() => {
    dispatch(getMovieTheaterById(id));
  }, [isOpen]);

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
        <Grid item xs={12} md={12}>
          <Grid
            container
            spacing={1}
            sx={{
              borderRadius: 5,
              boxShadow: "2px 2px 0px 0px #ccc",
              padding: 2,
              backgroundColor: "#fff",
            }}>
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
                  Edit Show Time
                </Typography>
              </Box>
            </Grid>
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
              <>
                <Grid item xs={12} md={3}>
                  <LocalizationProvider name="date" dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: 1 }}
                      className="date"
                      minDate={dayjs()} // Chặn chọn ngày trong quá khứ
                      onChange={(value: any) => handleChangeDate(value)}
                      value={
                        (formValues.fields && formValues.fields.date) || ""
                      }
                    />
                  </LocalizationProvider>
                  <Typography sx={{ height: 10, fontSize: 12, color: "red" }}>
                    {formValues.errors.date}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    defaultValue="00:00"
                    value={
                      (formValues.fields && formValues.fields.time) || "00:00"
                    }
                    type="time"
                    fullWidth
                    label="Time"
                    name="time"
                    onChange={handleInputChange}
                  />
                  <Typography sx={{ height: 10, fontSize: 12, color: "red" }}>
                    {formValues.errors.time}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    disabled
                    fullWidth
                    value={
                      (formValues.fields && formValues.fields.movieName) || ""
                    }
                    defaultValue={""}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Movie Theater
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Movie Theater"
                      value={
                        (formValues.fields &&
                          formValues.fields.movieTheaterId) ||
                        ""
                      }
                      name="movieTheaterId"
                      onChange={handleInputChange}>
                      {listMovieTheater &&
                        listMovieTheater.map((item: any, index: number) => {
                          return (
                            <MenuItem key={index} value={item.id}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                  <Typography
                    sx={{
                      height: 10,
                      fontSize: 12,
                      color: "red",
                    }}>
                    {formValues.errors.movieTheaterId}
                  </Typography>
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
                    // onClick={() => handleUpdate()}
                    // loading={stt === "loading"}
                    loadingPosition="start"
                    variant="contained">
                    Save
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => handle("remove")}
                    variant="contained"
                    // onClick={() => handleUpdate()}
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
                    Remove This Show Time
                  </LoadingButton>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
};

export default ShowTimePopup;
