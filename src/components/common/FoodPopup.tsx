import { LoadingButton } from "@mui/lab";
import {
  Box,
  CircularProgress,
  Fade,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteFood,
  details,
  getFoodById,
  updateFood,
  update,
  status,
} from "../../features/foods/foodSlice";
const defaultValues = {
  fields: {
    id: "",
    name: "",
    price: "",
    image: "",
    imageKey: "",
  },
  errors: {
    id: "",
    name: "",
    price: "",
    image: "",
  },
};

interface ISectionProps {
  id: string;
  isOpen: boolean;
  onclose?: () => void;
}

const FoodPopup: React.FC<ISectionProps> = ({
  id = "",
  isOpen = false,
  onclose = () => false,
}) => {
  const dispatch = useAppDispatch();
  const foodDetails = useAppSelector(details);
  const updateFoodPayload = useAppSelector(update);
  const stt = useAppSelector(status);

  const [formValues, setFormValues] = useState<any>(defaultValues);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const handleClose = () => {
    onclose();
  };

  useEffect(() => {
    if (updateFoodPayload && updateFoodPayload.payload) {
      handleClose();
    }
  }, [updateFoodPayload.payload]);

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

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    setSelectedFile(event.target.files[0]);
    setFormValues({
      errors: {
        ...formValues.errors,
      },
      fields: {
        ...formValues.fields,
        image: file,
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

  const handle = (action: string) => {
    if (action === "edit") {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("image", formValues.fields.image);
      } else {
        formData.append("image", formValues.fields.image);
        formData.append("imageKey", formValues.fields.imageKey);
      }
      formData.append("name", formValues.fields.name);

      formData.append("price", formValues.fields.price);
      const update = {
        id: id,
        body: formData,
      };
      setFormValues(defaultValues);
      dispatch(updateFood(update));
    }
    if (action === "remove") {
      dispatch(deleteFood(id));
    }
  };

  useEffect(() => {
    dispatch(getFoodById(id));
  }, [isOpen]);

  useEffect(() => {
    if (foodDetails) {
      setFormValues({
        errors: {
          ...formValues.errors,
        },
        fields: {
          id: id,
          name: foodDetails && foodDetails.name,
          price: foodDetails && foodDetails.price,
          image: foodDetails && foodDetails.image,
          imageKey: foodDetails && foodDetails.imageKey,
        },
      });
      setPreviewImage(foodDetails && foodDetails.image);
    }
  }, [foodDetails]);
  const _rendermain = () => {
    return (
      <Grid container>
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
                label="Food Name"
                name="name"
                value={formValues.fields.name}
                onChange={handleInputChange}
              />
              <Typography sx={{ height: 10, fontSize: 12, color: "red" }}>
                {formValues.errors.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={formValues.fields.price}
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
                  id="file-input"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="image"
                  onChange={handleFileChange}
                />
              </Stack>

              <Typography sx={{ height: 10, fontSize: 12, color: "red" }}>
                {formValues.errors.image}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Stack
                sx={{
                  width: 1,
                  height: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}>
                <img
                  style={{ width: 220, height: 240, objectFit: "cover" }}
                  alt="foodImage"
                  src={previewImage}
                />
              </Stack>

              <Typography sx={{ height: 10, fontSize: 12, color: "red" }}>
                {formValues.errors.image}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

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
                Edit Food
              </Typography>
            </Box>
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
              _rendermain()
            )}
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
              // loading={stt === "loading"}
              loadingPosition="start"
              variant="contained">
              Save
            </LoadingButton>
            <LoadingButton
              onClick={() => handle("remove")}
              variant="contained"
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
              Remove This Food
            </LoadingButton>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
};

export default FoodPopup;
