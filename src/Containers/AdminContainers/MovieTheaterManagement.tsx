import {
  Typography,
  Box,
  Button,
  TextField,
  Stack,
  Pagination,
  TablePagination,
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
} from "../../features/showTimes/showTimeSlice";
import ChoosenMoviePopup from "../../components/common/ChoosenMoviePopup";
import {
  getAllMovies,
  movies,
  status,
} from "../../features/movies/moviesSlice";
import dayjs from "dayjs";
import {
  getAllMovieTheater,
  movieTheaterPayload,
} from "../../features/moviesTheater/movieTheaterSlice";
import Ultils from "../../Ultils";
import { ROUTERS } from "../../Contants";
import MovieTheaterPopup from "../../components/common/MovieTheaterPopup";
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
function createData(id: string, movieTheaterName: string) {
  return { id, movieTheaterName };
}

interface IShowTime {
  id: string;
  movieTheaterName: string;
}

const FILTER_PAYLOAD = {
  // page: 1,
  // limit: 10,
  // keywork: "",
  // date: "",
  name: "",
};
const MovieTheaterManagement: React.FC = () => {
  const [rows, setRows] = useState<IShowTime[]>();
  const [open, setOpen] = useState<boolean>(false);
  const [idEdit, setIdEdit] = useState<string>("");

  const getMovieTheaters = useAppSelector(movieTheaterPayload);
  const dispatch = useAppDispatch();
  const [payloadMovieTheater, setPayloadMovieTheater] =
    useState<any>(FILTER_PAYLOAD);
  useEffect(() => {
    if (Ultils.getSavedToken() === undefined) Ultils.redirect(ROUTERS.LOGIN);
  }, []);
  useEffect(() => {
    dispatch(getAllMovieTheater(payloadMovieTheater));
  }, []);

  useEffect(() => {
    dispatch(getAllMovieTheater(payloadMovieTheater));
  }, [open]);

  useEffect(() => {
    if (getMovieTheaters && getMovieTheaters.payload) {
      const newList = getMovieTheaters.payload.map((item: any) => {
        return createData(item.id, item.name);
      });
      setRows(newList);
    }
  }, [getMovieTheaters]);

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
        <Grid container xs={12} md={12}>
          <MovieTheaterPopup onclose={onClose} isOpen={open} id={idEdit} />
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
                Movie Theater
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
                  setPayloadMovieTheater({
                    ...payloadMovieTheater,
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
                onClick={() =>
                  dispatch(getAllMovieTheater(payloadMovieTheater))
                }
              />
              <RoundButton
                sx={{
                  width: 100,
                  justifyContent: "center",
                  height: 56,
                }}
                label="Create"
                onClick={() => Ultils.redirect(ROUTERS.CREATE_MOVIE_THEATER)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>No.</StyledTableCell>
                    <StyledTableCell>Movie Theater Name </StyledTableCell>
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
                          {row.movieTheaterName}
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
          </Grid>
        </Grid>
      </>
    );
  };

  return <DefaultLayout content={_rendermain()} />;
};

export default MovieTheaterManagement;
