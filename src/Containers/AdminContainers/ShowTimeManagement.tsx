import {
  Typography,
  Box,
  Button,
  TextField,
  Stack,
  Pagination,
  TablePagination,
  Alert,
  CircularProgress,
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getAllShowTime,
  payload,
  update,
} from "../../features/showTimes/showTimeSlice";
import ChoosenMoviePopup from "../../components/common/ChoosenMoviePopup";
import {
  getAllMovies,
  movies,
  status,
} from "../../features/movies/moviesSlice";
import dayjs from "dayjs";
import ShowTimePopup from "../../components/common/ShowTimePopup";
import Ultils from "../../Ultils";
import { ROUTERS } from "../../Contants";
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
  movieName: string,
  movieTheaterName: string,
  time: number,
  date: string,
) {
  return { id, movieName, movieTheaterName, time, date };
}

interface IShowTime {
  id: string;
  movieName: string;
  movieTheaterName: string;
  date: string;
  time: number;
}

const FILTER_PAYLOAD = {
  page: 1,
  limit: 10,
  // keywork: "",
  // date: "",
};
const ShowTimeManagement: React.FC = () => {
  const listShowTime: any = useAppSelector(payload);
  const [rows, setRows] = useState<IShowTime[]>();
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [idEdit, setIdEdit] = useState<string>("");
  const [msg, setMsg] = useState("");
  const getMovies = useAppSelector(movies);
  const dispatch = useAppDispatch();
  const [pages, setPages] = useState<number>(1);
  const [listMovies, setListMovies] = useState<any>([]);
  const [payloadShowTime, setPayloadShowTime] = useState<any>(FILTER_PAYLOAD);
  const updateShowtime = useAppSelector(update);
  useEffect(() => {
    if (updateShowtime && updateShowtime.payload)
      setMsg(updateShowtime.payload.message);
  }, [updateShowtime.payload]);
  useEffect(() => {
    if (Ultils.getSavedToken() === undefined) Ultils.redirect(ROUTERS.LOGIN);
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
    setMsg("");
  }, []);
  const onCreate = () => {
    dispatch(getAllMovies(pages));
    if (getMovies.payload.payload)
      setListMovies([...getMovies.payload.results]);
    setOpen(!open);
  };
  const handle = (id: string) => {
    setOpenEdit(true);
    setIdEdit(id);
  };
  useEffect(() => {
    dispatch(getAllShowTime(payloadShowTime));
  }, [updateShowtime]);

  useEffect(() => {
    console.log(listShowTime);
    dispatch(getAllShowTime(payloadShowTime));
  }, [getMovies]);

  const onClose = () => {
    setOpen(false);
  };
  const onCloseEdit = () => {
    setOpenEdit(false);
  };
  useEffect(() => {
    if (listShowTime && listShowTime.payload) {
      const newList = listShowTime.payload.payload.map((item: any) => {
        return createData(
          item.id,
          item.movieName,
          item.movieTheaterName,
          item.date,
          item.time,
        );
      });
      setRows(newList);
    }
  }, [listShowTime]);
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
              updateShowtime && updateShowtime.status ? "success" : "error"
            }`}>
            {msg}
          </Alert>
        )}
        <ShowTimePopup id={idEdit} isOpen={openEdit} onclose={onCloseEdit} />
        <Grid container xs={12} md={12}>
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
                Show Time
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
                sx={{
                  marginRight: 1,
                }}
                label="Search by movie name"
                onChange={(e) =>
                  setPayloadShowTime({
                    ...payloadShowTime,
                    keyword: e.target.value,
                  })
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(value: any) =>
                    setPayloadShowTime({
                      ...payloadShowTime,
                      date: dayjs(value, "MM-DD-YYYY").format("MM/DD/YYYY"),
                    })
                  }
                />
              </LocalizationProvider>
              <RoundButton
                sx={{
                  margin: "0 12px",
                  width: 100,
                  justifyContent: "center",
                  height: 56,
                }}
                label="FILTER"
                onClick={() => dispatch(getAllShowTime(payloadShowTime))}
              />
              <RoundButton
                sx={{
                  width: 100,
                  justifyContent: "center",
                  height: 56,
                }}
                label="Create"
                onClick={() => onCreate()}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <TableContainer component={Paper}>
              {listShowTime.payload && !listShowTime.payload.status ? (
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
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>No.</StyledTableCell>
                      <StyledTableCell>Movie Name </StyledTableCell>
                      <StyledTableCell align="right">
                        Movie Theater
                      </StyledTableCell>
                      <StyledTableCell align="right">Time</StyledTableCell>
                      <StyledTableCell align="right">Date</StyledTableCell>
                      <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows &&
                      rows.map((row: any, index: number) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component="th" scope="row">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.movieName}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.movieTheaterName}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.date}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.time}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Button
                              onClick={() => handle(row.id)}
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
              )}
            </TableContainer>
          </Grid>
        </Grid>
        <Box>
          <ChoosenMoviePopup
            listMovie={listMovies}
            isOpen={open}
            onclose={() => onClose()}
          />
        </Box>
      </>
    );
  };

  return <DefaultLayout content={_rendermain()} />;
};

export default ShowTimeManagement;
