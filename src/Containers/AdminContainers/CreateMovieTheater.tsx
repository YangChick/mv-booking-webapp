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
  createNewMovieTheater,
  createStatus,
  movieTheaterPayload,
  payload,
  status,
} from "../../features/moviesTheater/movieTheaterSlice";
import Ultils from "../../Ultils";
import { ROUTERS } from "../../Contants";
const defaultValues = {
  fields: {
    name: "",
  },
  errors: {
    name: "",
  },
};

const CreateMovieTheater = () => {
  const [formValues, setFormValues] = useState<any>(defaultValues);
  const [alertFailed, setAlertFailed] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [movieTheaterFromReducer, setMovieTheaterFromReducer] = useState();
  const [alertAlreadyExist, setAlertAlreadyExist] = useState(false);
  const [listMovieTheater, setListMovieTheater] = useState<any>();
  const movieTheater = useAppSelector(payload);
  const stt = useAppSelector(status);
  const listMovieTheaters = useAppSelector(movieTheaterPayload);
  const sttCreate = useAppSelector(createStatus);
  const dispatch = useAppDispatch();

  const validate = (name: any, value: any) => {
    switch (name) {
      case "name":
        if (!value) {
          return "Name Of Movie Theater Is Required";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };

  useEffect(() => {
    setMovieTheaterFromReducer(movieTheater);
  }, [movieTheater]);

  useEffect(() => {
    if (sttCreate) setAlertSuccess(true);
  }, [sttCreate]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertSuccess(false);
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
        [name]: value,
      },
    });
  };
  useEffect(() => {
    if (Ultils.getSavedToken() === undefined) Ultils.redirect(ROUTERS.LOGIN);
  }, []);

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
    } else {
      if (!movieTheater) {
        setAlertAlreadyExist(true);
      } else {
        setAlertSuccess(true);
      }
      const newPayload = {
        ...formValues.fields,
      };
      dispatch(createNewMovieTheater(newPayload));
      setFormValues(defaultValues);
    }
  };

  useEffect(() => {
    if (listMovieTheaters) setListMovieTheater(listMovieTheaters.payload);
  }, [listMovieTheaters]);

  const _rendermain = () => {
    return (
      <Grid container>
        {alertSuccess ? (
          <Alert
            sx={{
              position: "fixed",
              right: 0,
            }}
            severity="success">
            Create Movie Theater Succesfully
          </Alert>
        ) : alertAlreadyExist === true ? (
          <Alert
            sx={{
              position: "fixed",
              right: 0,
            }}
            severity="error">
            Create Movie Theater Faild! Movie Theater Already Exists
          </Alert>
        ) : null}
        <Grid padding={"12px 0"} item xs={12} md={12}>
          <Box
            sx={{
              width: 1,
              borderRadius: 5,
              boxShadow: "2px 2px 0px 0px #FEB800",
              padding: 1,
            }}>
            <Typography sx={{ fontWeight: 600, color: "#FEB800" }} variant="h3">
              Create Movie Theater
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
              <TextField
                fullWidth
                label="Movie Theater Name"
                name="name"
                onChange={handleInputChange}
              />
              <Typography sx={{ height: 10, fontSize: 12, color: "red" }}>
                {formValues.errors.name}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <LoadingButton
                sx={{ height: 0.85 }}
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

export default CreateMovieTheater;
