import { Alert, Grid, Stack, TextField, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  addFood,
  create,
  payload,
  status,
} from "../../features/foods/foodSlice";
import Ultils from "../../Ultils";
import { ROUTERS } from "../../Contants";
const defaultValues = {
  fields: {
    name: "",
    price: "",
    image: "",
  },
  errors: {
    name: "",
    price: "",
    image: "",
  },
};

const CreateFood = () => {
  const [formValues, setFormValues] = useState<any>(defaultValues);
  const [msg, setMsg] = useState("");
  const stt = useAppSelector(status);
  const createFood = useAppSelector(create);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (createFood && createFood.payload) setMsg(createFood.payload.message);
  }, [createFood]);
  useEffect(() => {
    setMsg("");
  }, []);
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setMsg("");
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  }, [msg]);
  useEffect(() => {
    if (Ultils.getSavedToken() === undefined) Ultils.redirect(ROUTERS.LOGIN);
  }, []);
  const validate = (name: any, value: any) => {
    switch (name) {
      case "name":
        if (!value) {
          return "FoodName Is Required";
        } else {
          return "";
        }
      case "price":
        if (!value) {
          return "Price Is Required";
        } else {
          return "";
        }

      default: {
        return "";
      }
    }
  };
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setFormValues({
      errors: {
        ...formValues.errors,
      },
      fields: {
        ...formValues.fields,
        image: selectedFile,
      },
    });
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
      const newPayload = {
        food: {
          name: formValues.fields.name,
          price: formValues.fields.price,
        },
        image: formValues.fields.image,
      };
      const formData = new FormData();
      // const newFile = new File(newPayload.image);
      formData.append("image", selectedFile);
      formData.append("name", newPayload.food.name);
      formData.append("price", newPayload.food.price);
      dispatch(addFood(formData));
      setFormValues(defaultValues);
    }
  };

  const _rendermain = () => {
    return (
      <Grid container>
        {msg != "" && (
          <Alert
            sx={{
              position: "fixed",
              right: 0,
            }}
            severity={`${
              createFood && createFood.status ? "success" : "error"
            }`}>
            {msg}
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
              Create Food
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
                disabled={stt === "loading"}
                fullWidth
                label="Food Name"
                name="name"
                onChange={handleInputChange}
              />
              <Typography sx={{ height: 10, fontSize: 12, color: "red" }}>
                {formValues.errors.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                disabled={stt === "loading"}
                fullWidth
                label="Price"
                name="price"
                onChange={handleInputChange}
              />
              <Typography sx={{ height: 10, fontSize: 12, color: "red" }}>
                {formValues.errors.price}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Stack
                sx={{
                  width: 1,
                  height: 0.84,
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <input
                  disabled={stt === "loading"}
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                />
              </Stack>

              <Typography sx={{ height: 10, fontSize: 12, color: "red" }}>
                {formValues.errors.image}
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

export default CreateFood;
