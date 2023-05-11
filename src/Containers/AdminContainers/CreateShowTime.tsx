import {
  Alert,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import dayjs from "dayjs";
import { movies } from "../../features/movies/moviesSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getAllMovieTheater,
  movieTheaterPayload,
} from "../../features/moviesTheater/movieTheaterSlice";
import { getDetails, details } from "../../features/movies/moviesSlice";
import { useParams } from "react-router";
import {
  createShowTime,
  getAllShowTime,
  status,
  payload,
  update,
} from "../../features/showTimes/showTimeSlice";
import Ultils from "../../Ultils";
import { ROUTERS } from "../../Contants";
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
const FILTER_PAYLOAD = {
  page: 1,
  limit: 5,
  keywork: "",
  date: "",
};

const CreateShowTime = () => {
  const [formValues, setFormValues] = useState<any>(defaultValues);
  const [alertFailed, setAlertFailed] = useState(false);
  const [alertSucess, setAlertSucess] = useState(false);
  const [alertAlreadyExist, setAlertAlreadyExist] = useState(false);
  const allShowTime = useAppSelector(payload);
  const listMovieTheaters = useAppSelector(movieTheaterPayload);
  const movieDetail = useAppSelector(details);
  const stt = useAppSelector(status);
  const updateShowtime = useAppSelector(update);
  const dispatch = useAppDispatch();
  const [listMovieTheater, setListMovieTheater] = useState<any>([]);
  const [payloadShowTime, setPayloadShowTime] = useState<any>(FILTER_PAYLOAD);

  const { id } = useParams();
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
  const payloadLogin = useAppSelector(payload);
  useEffect(() => {
    if (Ultils.getSavedToken() === undefined) Ultils.redirect(ROUTERS.LOGIN);
  }, [payloadLogin]);

  useEffect(() => {
    if (updateShowtime.status === true) {
      setAlertSucess(true);
    }
  }, [stt]);

  useEffect(() => {
    if (movieDetail) {
      setFormValues({
        errors: {
          ...formValues.errors,
        },
        fields: {
          ...formValues.fields,
          movieName: movieDetail.original_title,
        },
      });
    }
  }, [movieDetail]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertSucess(false);
      setAlertAlreadyExist(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [stt]);
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      errors: {
        ...formValues.errors,
        [name]: validate(name, value),
      },
      fields: {
        ...formValues.fields,
        movieName: movieDetail.original_title,
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
  const handleCreate = () => {
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

    const newPayload = {
      ...formValues.fields,
      movieId: id,
      date: resolvedDate,
    };
    if (allShowTime.status === false) {
      setAlertAlreadyExist(true);
    }

    dispatch(createShowTime(newPayload));
  };
  useEffect(() => {
    if (id) dispatch(getDetails(id));
    setFormValues({
      errors: {
        ...formValues.errors,
        movieId: id,
      },
      fields: {
        ...formValues.fields,
        movieId: id,
      },
    });
  }, [id]);
  useEffect(() => {
    dispatch(getAllShowTime(payloadShowTime));
  }, []);

  useEffect(() => {
    dispatch(getAllMovieTheater({}));
  }, []);

  useEffect(() => {
    if (listMovieTheaters) setListMovieTheater(listMovieTheaters.payload);
  }, [listMovieTheaters]);

  const _rendermain = () => {
    return (
      <Grid container>
        {alertSucess && (
          <Alert
            sx={{
              position: "fixed",
              right: 0,
            }}
            severity="success">
            Create Show Time Succesfully
          </Alert>
        )}

        {alertAlreadyExist && (
          <Alert
            sx={{
              position: "fixed",
              right: 0,
            }}
            severity="error">
            Create Show Faild! Show Time Already Exists
          </Alert>
        )}

        {alertFailed && (
          <Alert
            sx={{
              position: "fixed",
              right: 0,
            }}
            severity="error">
            Create Show Faild!
          </Alert>
        )}

        <Grid padding={"12px 0"} item xs={12} md={12}>
          <Box
            sx={{
              width: 1,
              borderRadius: 5,
              boxShadow: "2px 2px 0px 0px #FEB800",
              padding: 1,
            }}>
            <Typography sx={{ fontWeight: 600, color: "#FEB800" }} variant="h3">
              Create Show Time
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid
            container
            spacing={1}
            sx={{
              borderRadius: 5,
              boxShadow: "2px 2px 0px 0px #ccc",
              padding: 2,
            }}>
            <Grid item xs={12} md={3}>
              <LocalizationProvider name="date" dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 1 }}
                  className="date"
                  minDate={dayjs()} // Chặn chọn ngày trong quá khứ
                  onChange={(value: any) => handleChangeDate(value)}
                  value={(formValues.fields && formValues.fields.date) || ""}
                />
              </LocalizationProvider>
              <Typography sx={{ height: 10, fontSize: 12, color: "red" }}>
                {formValues.errors.date}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                defaultValue="00:00"
                value={(formValues.fields && formValues.fields.time) || "00:00"}
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
                value={movieDetail.original_title || ""}
                defaultValue={undefined}
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
                    (formValues.fields && formValues.fields.movieTheaterId) ||
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
            <Grid item xs={6} md={3}>
              <LoadingButton
                onClick={() => handleCreate()}
                loading={stt === "loading"}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined">
                Save
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return <DefaultLayout content={_rendermain()} />;
};

export default CreateShowTime;
