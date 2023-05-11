import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { Stack, Typography } from "@mui/material";
import DefaultLayout from "../../components/DefaultLayout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginAdmin, payload } from "../../features/auth/authSlice";
import Ultils from "../../Ultils";
import { ROUTERS } from "../../Contants";

const useStyles = makeStyles((theme) => ({
  form: {},
  input: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  // const submiInvoice = useAppSelector(payload);
  useEffect(() => {
    if (password != "") {
      setErrors({
        ...errors,
        password: "",
      });
    }

    if (email != "") {
      setErrors({
        ...errors,
        email: "",
      });
    }
  }, [email, password]);
  const payloadLogin = useAppSelector(payload);
  useEffect(() => {
    console.log(payloadLogin);
    if (
      payloadLogin &&
      payloadLogin.payload &&
      payloadLogin.payload.access_token != ""
    )
      Ultils.redirect(ROUTERS.HOME);
  }, [payloadLogin.payload]);
  const dispatch = useAppDispatch();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const newErrors = {
      email: "",
      password: "",
    };

    if (email.trim() === "") {
      newErrors.email = "Email is required";
    } else {
      setErrors({
        email: "",
        password: "",
      });
    }

    if (password.trim() === "") {
      newErrors.password = "Password is required";
    } else {
      setErrors({
        email: "",
        password: "",
      });
    }

    setErrors(newErrors);

    // if (Object.keys(newErrors).length === 0) {
    //   console.log(email, password);
    //   // Submit the form
    //   console.log("Submitting form...");
    // }
    if (email != "" && password != "") {
      dispatch(loginAdmin({ email, password }));
    }
  };

  const _renderMain = () => (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 6,
        }}>
        <Typography
          variant="h1"
          sx={{
            color: "#3343c2",
            fontWeight: 600,
            width: 1,
            padding: 1,
          }}>
          Login
          <Typography
            variant="h3"
            sx={{ fontSize: 16, color: "#FEB800", fontWeight: 600 }}>
            To Admin
          </Typography>
        </Typography>
      </Stack>
      <Stack>
        <TextField
          className={classes.input}
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email != ""}
          helperText={errors.email}
        />
        <TextField
          className={classes.input}
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password != ""}
          helperText={errors.password}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit">
          Login
        </Button>
      </Stack>
    </form>
  );
  return <DefaultLayout content={_renderMain()} />;
};

export default Login;
