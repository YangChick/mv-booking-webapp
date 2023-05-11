import {
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import DefaultLayout from "../../components/DefaultLayout";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { RoundButton } from "../../components/common";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Ultils from "../../Ultils";
import { ROUTERS } from "../../Contants";
import MovieTheaterPopup from "../../components/common/MovieTheaterPopup";
import { fetAllFood, status, update } from "../../features/foods/foodSlice";
import { payload } from "../../features/foods/foodSlice";
import FoodPopup from "../../components/common/FoodPopup";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3343c2",
    color: theme.palette.common.white,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function createData(
  id: string,
  foodName: string,
  foodPrice: string,
  image: string,
  imageKey: string,
) {
  return { id, foodName, foodPrice, image, imageKey };
}

interface IFoods {
  id: string;
  foodPrice: string;
  image: string;
  imageKey: string;
  foodName: string;
}

const FILTER_PAYLOAD = {
  // page: 1,
  // limit: 10,
  // keywork: "",
  // date: "",
  name: "",
};
const FoodManagement: React.FC = () => {
  useEffect(() => {
    if (Ultils.getSavedToken() === undefined) Ultils.redirect(ROUTERS.LOGIN);
  }, []);
  const [rows, setRows] = useState<IFoods[]>([
    {
      id: "",
      foodPrice: "",
      image: "",
      imageKey: "",
      foodName: "",
    },
  ]);
  const [open, setOpen] = useState<boolean>(false);
  const [idEdit, setIdEdit] = useState<string>("");

  const foodPayload = useAppSelector(payload);
  const stt = useAppSelector(status);
  const updatePayload = useAppSelector(update);
  const [msg, setMsg] = useState("");
  const dispatch = useAppDispatch();
  const [payloadFood, setPayloadFood] = useState<any>(FILTER_PAYLOAD);
  const [newPayload, setNewPayload] = useState<any>([]);
  useEffect(() => {
    if (updatePayload && updatePayload.payload)
      setMsg(updatePayload.payload.message);
  }, [updatePayload.payload]);

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
    setMsg("");
  }, []);

  useEffect(() => {
    dispatch(fetAllFood(payloadFood));
  }, [updatePayload.payload]);

  useEffect(() => {
    console.log(foodPayload);
    if (foodPayload && foodPayload.payload)
      setNewPayload(foodPayload.payload.payload);
  }, [foodPayload]);

  useEffect(() => {
    if (newPayload) {
      const newList = newPayload.map((item: any) => {
        return createData(
          item.id,
          item.name,
          item.price,
          item.image,
          item.imageKey,
        );
      });
      setRows(newList);
    }
  }, [newPayload]);

  const onClose = () => {
    setOpen(false);
  };
  const handleEdit = (id: any) => {
    setOpen(true);
    setIdEdit(id);
  };

  const _rendermain = () => {
    return (
      <>
        {msg != "" && (
          <Alert
            sx={{
              position: "fixed",
              right: 0,
            }}
            severity={`${
              updatePayload && updatePayload.status ? "success" : "error"
            }`}>
            {msg}
          </Alert>
        )}
        <Grid container xs={12} md={12}>
          <FoodPopup onclose={onClose} isOpen={open} id={idEdit} />
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
                Foods
              </Typography>
            </Box>
          </Grid>
          <Grid marginBottom={2} item xs={12} md={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: 1,
                borderRadius: 5,
                boxShadow: "2px 2px 0px 0px #ccc",
                padding: 2,
              }}>
              <TextField
                fullWidth
                sx={{
                  marginRight: 1,
                }}
                label="Search by movie theater name"
                onChange={(e) =>
                  setPayloadFood({
                    ...payloadFood,
                    name: e.target.value,
                  })
                }
              />
              <RoundButton
                sx={{
                  margin: "0 12px",
                  width: 100,
                  justifyContent: "center",
                  height: 56,
                }}
                label="FILTER"
                onClick={() => dispatch(fetAllFood(payloadFood))}
              />
              <RoundButton
                sx={{
                  width: 100,
                  justifyContent: "center",
                  height: 56,
                }}
                label="Create"
                onClick={() => Ultils.redirect(ROUTERS.CREATE_FOOD)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            {foodPayload &&
            foodPayload.payload &&
            !foodPayload.payload.status ? (
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
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>No.</StyledTableCell>
                      <StyledTableCell>Food Name </StyledTableCell>
                      <StyledTableCell>Price </StyledTableCell>
                      <StyledTableCell>Image </StyledTableCell>
                      <StyledTableCell>Action </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows &&
                      rows.map((row: any, index: number) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component="th" scope="row">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.foodName}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.foodPrice}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <img
                              style={{
                                width: 100,
                                height: 100,
                                objectFit: "cover",
                              }}
                              src={row.image}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Button
                              onClick={() => handleEdit(row.id)}
                              sx={{
                                color: "#000",
                                borderRadius: "24px",
                              }}>
                              {<ModeEditIcon sx={{}} />}
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
      </>
    );
  };

  return <DefaultLayout content={_rendermain()} />;
};

export default FoodManagement;
