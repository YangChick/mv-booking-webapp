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
import { fetAllFood, status, update } from "../../features/foods/foodSlice";
import FoodPopup from "../../components/common/FoodPopup";
import { fetAllInvoices, payload } from "../../features/invoices/invoicesSlice";
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
  client: string,
  movieName: string,
  totalMoney: number,
  phoneNumber: string,
  listSeats: [],
  foods: any[],
  showTime: any,
  movieTheaterId: any,
) {
  return {
    id,
    client,
    movieName,
    totalMoney,
    phoneNumber,
    listSeats,
    foods,
    showTime,
    movieTheaterId,
  };
}

interface IIvoices {
  id: string;
  client: string;
  movieName: string;
  totalMoney: number;
  phoneNumber: string;
  showTime: any;
  listSeats: [];
  foods: any[];
  movieTheaterId: any;
}

const FILTER_PAYLOAD = {
  // page: 1,
  // limit: 10,
  // keywork: "",
  // date: "",
  keywork: "",
};
const InvoicesManegement: React.FC = () => {
  const [rows, setRows] = useState<IIvoices[]>([
    {
      id: "",
      client: "",
      movieName: "",
      totalMoney: 0,
      phoneNumber: "",
      listSeats: [],
      foods: [],
      showTime: {},
      movieTheaterId: {},
    },
  ]);
  const [open, setOpen] = useState<boolean>(false);
  const [idEdit, setIdEdit] = useState<string>("");

  const invoicesPayload = useAppSelector(payload);
  const stt = useAppSelector(status);
  const updatePayload = useAppSelector(update);
  const [msg, setMsg] = useState("");
  const dispatch = useAppDispatch();
  const [payloadFood, setPayloadFood] = useState<any>(FILTER_PAYLOAD);
  const [newPayload, setNewPayload] = useState<any>([]);
  useEffect(() => {
    if (Ultils.getSavedToken() === undefined) Ultils.redirect(ROUTERS.LOGIN);
  }, []);
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
    dispatch(fetAllInvoices(payloadFood));
  }, []);

  useEffect(() => {
    if (invoicesPayload && invoicesPayload.payload)
      setNewPayload(invoicesPayload.payload.payload);
  }, [invoicesPayload]);

  useEffect(() => {
    if (newPayload) {
      const newList = newPayload.map((item: any) => {
        return createData(
          item.id,
          item.client,
          item.movieName,
          item.totalMoney,
          item.phoneNumber,
          item.listSeats,
          item.foods,
          item.showTime,
          item.movieTheaterId,
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
                label="Search"
                onChange={(e) =>
                  setPayloadFood({
                    ...payloadFood,
                    client: e.target.value,
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
                onClick={() => dispatch(fetAllInvoices(payloadFood))}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            {invoicesPayload &&
            invoicesPayload.payload &&
            !invoicesPayload.payload.status ? (
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
                      <StyledTableCell>Client </StyledTableCell>
                      <StyledTableCell>Phone Number </StyledTableCell>
                      {/* <StyledTableCell> </StyledTableCell> */}
                      <StyledTableCell>Movie Name </StyledTableCell>
                      <StyledTableCell>Date </StyledTableCell>
                      <StyledTableCell>Time </StyledTableCell>
                      <StyledTableCell>Seats </StyledTableCell>
                      <StyledTableCell>Foods </StyledTableCell>
                      <StyledTableCell>Movie Theater </StyledTableCell>
                      <StyledTableCell>Total Money </StyledTableCell>
                      {/* <StyledTableCell>Total Money </StyledTableCell> */}
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
                            {row.client}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.phoneNumber}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.movieName}
                          </StyledTableCell>

                          <StyledTableCell align="right">
                            {row.showTime.date}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.showTime.time}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.listSeats &&
                              row.listSeats.map((item: any) => {
                                return item.name;
                              })}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.foods &&
                              row.foods.map((item: any) => {
                                return item.name;
                              })}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.movieTheaterId.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.totalMoney}
                          </StyledTableCell>
                          {/* <StyledTableCell align="right">
                            <Button
                              onClick={() => handleEdit(row.id)}
                              sx={{
                                color: "#000",
                                borderRadius: "24px",
                              }}>
                              {<ModeEditIcon sx={{}} />}
                            </Button>
                          </StyledTableCell> */}
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

export default InvoicesManegement;
