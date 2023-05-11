import CheckOutPopup from "../../components/common/CheckOutPopup";

import { useNavigate, useParams } from "react-router-dom";
import React, { useMemo } from "react";
import {
  Grid,
  Typography,
  Stack,
  Chip,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";

import DefaultLayout from "../../components/DefaultLayout";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "react-slideshow-image/dist/styles.css";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import ChairIcon from "@mui/icons-material/Chair";
import WeekendIcon from "@mui/icons-material/Weekend";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";
import { RoundButton } from "../../components/common";
import Box from "@mui/material/Box/Box";
import { useEffect } from "react";
import {
  details,
  getDetails,
  getMovieTheaterById,
  movieTheater,
} from "../../features/movies/moviesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getShowTimeById,
  getShowTimeByMovieIds,
  showTimes,
} from "../../features/showTimes/showTimeSlice";
import FormControlLabel from "@mui/material/FormControlLabel";
import { fetAllFood, payload } from "../../features/foods/foodSlice";
import choosenFood from "./ChoosenFood";
import Ultils from "../../Ultils";
import { ROUTERS } from "../../Contants";
import { reset, submit } from "../../features/invoices/invoicesSlice";

const typeSeatIds = {
  normal: "4d7707f0-277c-4dbe-a7f9-eef763a3faf8",
  couple: "244d9d6c-6c95-4dc2-a9cc-db1f3a4b9f36",
};

const seatIndex = [
  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12"],
  ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12"],
  ["", "", "", "C1", "C2", "C3", "C4", "C5", "C6", "", "", ""],
  ["CP1", "CP2", "CP3", "CP4", "CP5", "CP6", "CP7", "CP8", "CP9", "CP10"],
];

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const CheckOut: React.FC = () => {
  const [showTimeId, setShowTimeId] = React.useState<any>([]);
  const [showTime, setShowTime] = React.useState<any>("");
  const [totalWithSeat, setTotalWithSeat] = React.useState<number>(0);
  const [selected, setSelected] = React.useState<any>();
  const [listUpdateSeat, setListUpdateSeat] = React.useState<any>([]);
  const [listUpdateFood, setListUpdateFood] = React.useState<any>([]);
  const [listSeatName, setListSeatName] = React.useState<any>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [movieTheaterId, setMovieTheaterId] = React.useState<string>("");
  const [food, setFood] = React.useState<any[]>([
    {
      id: "",
      image: "",
      imageKey: "",
      invoice: [],
      price: "",
      quantity: "",
    },
  ]);

  const getMovieDetail = useAppSelector(details);
  const getShowtimes = useAppSelector(showTimes);
  const getMovieTheater = useAppSelector(movieTheater);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const parmas = useParams();
  const listFood = useAppSelector(payload);

  const [orders, setOrders] = React.useState<any[]>([]);
  const [totalWithFood, setTotalWithFood] = React.useState(0);
  const submiInvoice = useAppSelector(submit);

  const handleAddOrder = (id: string, foodName: string, price: string) => {
    const newOrder = {
      id: id,
      food: foodName,
      price: parseFloat(price),
    };
    setOrders([...orders, newOrder]);
  };

  const handleRemoveOrder = (indexInrender: number) => {
    const newOrders = orders.filter((order, index) => index != indexInrender);
    setOrders(newOrders);
  };

  const handleCalculateTotal = () => {
    let sum = 0;
    orders.forEach((order) => {
      sum += order.price;
    });
    setTotalWithFood(sum);
  };
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleChange = (
    id: string,
    name: string,
    typeSeatId?: string,
    quantity?: string,
  ) => {
    const total = Number(quantity) * Number(typeSeatId);
    if (!listUpdateSeat.includes(id)) {
      if (typeSeatId === typeSeatIds.normal) {
        setTotalWithSeat(totalWithSeat + 45000);
      } else if (typeSeatId === typeSeatIds.couple) {
        setTotalWithSeat(totalWithSeat + 90000);
      }

      setListSeatName([...listSeatName, name]);
      setListUpdateFood([...listUpdateFood, id]);
      setListUpdateSeat([...listUpdateSeat, id]);
    } else {
      setListSeatName(listSeatName.filter((item: string) => item !== name));
      setListUpdateSeat(listUpdateSeat.filter((item: string) => item !== id));
      if (typeSeatId === typeSeatIds.normal) {
        setTotalWithSeat(totalWithSeat - 45000);
      } else if (typeSeatId === typeSeatIds.couple) {
        setTotalWithSeat(totalWithSeat - 90000);
      }
    }
  };

  const sumTotalWithSeat = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(fetAllFood({}));
  }, []);

  useEffect(() => {
    handleCalculateTotal();
  }, [orders]);

  useEffect(() => {
    if (listFood && listFood.payload) setFood(listFood.payload.payload);
  }, [food, listFood]);

  useEffect(() => {
    if (parmas.id) {
      dispatch(getDetails(parmas.id));
      dispatch(getShowTimeByMovieIds(parmas.id));
    }
    setOpen(false);
  }, [parmas]);

  useEffect(() => {
    dispatch(getMovieTheaterById(movieTheaterId));
  }, [movieTheaterId]);

  const _renderPaymentMethod = () => {
    return (
      <Grid
        sx={{
          marginTop: 0.2,
          marginLeft: 2,
          backgroundColor: "#f7f6f9",
          padding: 2,
          borderRadius: 2,
        }}
        item
        xs={12}
        md={12}>
        <Grid container xs={12} md={12}>
          <Grid display={"flex"} item xs={12} md={12}>
            <Typography
              width={0.8}
              sx={{ fontWeight: 600 }}
              variant="subtitle1">
              Payment method
            </Typography>
            <Stack
              width={0.15}
              sx={{
                backgroundColor: "#FEB800",
                borderRadius: 2,
                height: "30px",
                width: "30px",
              }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: 16,
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                +
              </Typography>
            </Stack>
          </Grid>
          <Grid
            padding={2}
            sx={{
              display: "flex",
              height: 120,
              marginTop: 2,
              borderRadius: 4,
              backgroundColor: "#3343C2",
              marginBottom: 2,
            }}
            item
            xs={12}
            md={12}>
            <Grid container xs={12} md={12} height={0.4}>
              <Grid item xs={12} md={12}>
                <Stack
                  sx={{
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: 14,
                      marginRight: 1,
                      fontWeight: 570,
                    }}>
                    Visa
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack
                  sx={{
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#fff",
                      fontSize: 10,
                      marginTop: 0.5,
                    }}>
                    0000 0000 0000 000
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs={12} md={12}>
          <Grid item xs={12} md={12}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Total Checkout
            </Typography>
          </Grid>

          <Grid item xs={12} md={12}>
            <RoundButton
              onClick={() => sumTotalWithSeat()}
              sx={{
                width: 1,
                backgroundColor: "#FEB800",
                boxShadow: "0 0 20px 2px #FEB800",
              }}
              label={"CHECK OUT"}
            />
          </Grid>
        </Grid>
        <CheckOutPopup
          showTimeId={showTimeId}
          foods={orders}
          listSeatName={listSeatName}
          listSeat={listUpdateSeat}
          showTime={showTime}
          totalWithFood={totalWithFood}
          totalWithSeat={totalWithSeat}
          movieName={getMovieDetail.title}
          movieTheaterId={movieTheaterId}
          isOpen={open}
          movieTheaterName={getMovieTheater.name}
          onclose={() => setOpen(!open)}
        />
      </Grid>
    );
  };

  const _renderChosenFood = () => {
    return (
      <Grid sx={{ marginLeft: 2, marginRight: 2 }} container>
        <Grid
          sx={{
            padding: 1,
            width: 1,
            height: 320,
            overflow: "hidden",
            overflowY: "scroll",
            border: "solid 4px #3343c2",

            borderRadius: 2,
            borderTop: "solid 4px #3343c2",
          }}
          item>
          <Typography sx={{ fontSize: 16, fontWeight: 600 }} variant="h4">
            List Food
          </Typography>
          <Grid container>
            {food &&
              food.map((item) => {
                return (
                  <Grid
                    sx={{
                      borderRadius: 3,
                      display: "flex",
                      height: 100,
                      border: "solid 2px #3343c2",
                      padding: 1,
                      marginBottom: 1,
                    }}
                    item
                    xs={12}
                    md={12}>
                    <Box sx={{ width: 0.3 }}>
                      <img
                        style={{
                          borderRadius: 3,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={item.image}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: 0.7,
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: 2,
                      }}>
                      <Typography
                        sx={{ fontWeight: 600, fontSize: 14, height: 30 }}
                        variant="h5">
                        {item.name} : {item.price}
                      </Typography>
                      <Button
                        onClick={() =>
                          handleAddOrder(item.id, item.name, item.price)
                        }
                        variant="contained">
                        Add Food
                      </Button>
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <Grid
          sx={{
            padding: 1,
            borderRadius: 2,
            marginTop: 2,
            width: 1,
            border: "solid 4px #3343c2",
            overflow: "hidden",
            maxHeight: 400,
            overflowY: "scroll",
          }}
          container>
          <Typography sx={{ fontSize: 12, fontWeight: 600 }} variant="h5">
            Your Food
          </Typography>
          {orders.map((order, index) => (
            <Grid
              sx={{
                borderRadius: 3,
                height: 50,
                justifyContent: "space-between",
                border: "solid 2px #3343c2",
                padding: 1,
                marginBottom: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              item
              xs={12}
              md={12}
              key={index}>
              <Typography>
                {order.food} - ${order.price.toFixed(0)}
              </Typography>
              <Button
                onClick={() => handleRemoveOrder(index)}
                variant="contained"
                sx={{
                  height: 0.5,
                  backgroundColor: "#FEB800",
                }}>
                X
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  };

  const _renderSeat = () => {
    const seatPayload = getShowtimes?.payload?.[selected]?.seats;
    if (!seatPayload) return null;

    const seatRows = seatIndex.map((seat: string[], rowIndex: number) => {
      const rowLength = seat.length;
      const itemArea = 12 / rowLength;
      const renderSeat = seat.map((item: string, index: number) => {
        const findSeat = seatPayload.find(
          (seatItem: { name: string; id: string }) => seatItem.name === item,
        );
        if (!findSeat) return null;
        return (
          <Grid item xs={itemArea} md={itemArea} key={findSeat.id}>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    "&.Mui-disabled": {
                      pointerEvents: "auto",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      cursor: "not-allowed",
                      "& .MuiSvgIcon-root": {
                        color: "#FEB800",
                      },
                    },
                  }}
                  disabled={findSeat.status === "active"}
                  defaultChecked={findSeat.status === "active"}
                  {...label}
                  icon={<ChairOutlinedIcon />}
                  checkedIcon={<ChairIcon />}
                  onChange={() =>
                    handleChange(
                      findSeat.id,
                      findSeat.name,
                      findSeat.typeSeatId,
                    )
                  }
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: 10,
                    color: "#FEB800",
                    fontWeight: 600,
                    marginTop: -1,
                  }}>
                  {findSeat.name}
                </Typography>
              }
              labelPlacement="bottom"
            />
          </Grid>
        );
      });
      return (
        <Grid
          justifyContent={"center"}
          container
          xs={12}
          md={12}
          padding={"6px 20px"}
          key={`row-${rowIndex}`}>
          {renderSeat}
        </Grid>
      );
    });
    return seatRows;
  };

  const _renderMain = () => {
    return (
      <Grid container>
        <Grid item xs={12} md={9}>
          <Grid container xs={12} md={12}>
            <Grid display={"flex"} item xs={12} md={12} padding={1}>
              <Stack
                sx={{
                  width: 0.8,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Box
                  onClick={() => navigate(-1)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "max-content",
                    cursor: "pointer",
                    "&:hover": {
                      borderBottom: "solid 2px #FEB800",
                    },
                  }}>
                  <ArrowBackIosIcon sx={{ color: "#FEB800" }} />
                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: "#FEB800",
                    }}
                    variant="h6">
                    {getMovieDetail.title}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12}>
              <img
                width={"100%"}
                height={240}
                style={{
                  objectFit: "cover",
                  borderRadius: 10,
                  padding: "0 3px",
                }}
                src={`https://image.tmdb.org/t/p/original/${getMovieDetail.backdrop_path}`}
              />
            </Grid>
            {getShowtimes.payload && (
              <Grid
                sx={{
                  padding: 0.5,
                  height: 50,
                  "&:hover": {
                    "&::-webkit-scrollbar": {
                      height: {
                        xs: "none",
                        md: "0.4em",
                        lg: "0.4em",
                      },
                    },
                  },
                  overflowX: {
                    xs: "scroll",
                    md: "scroll",
                    lg: "scroll",
                  },
                  "&::-webkit-scrollbar": {
                    height: {
                      xs: "0.2em",
                      md: "0.2em",
                      lg: "0.2em",
                    },
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#3343c2",
                    borderRadius: "12px",
                  },
                }}
                item
                // xs={12}
                // md={12}
              >
                <Grid wrap="nowrap" container>
                  {getShowtimes.payload.map((item: any, index: string) => (
                    <Grid item xs={4.5} md={4.5} lg={4.5}>
                      {/* {console.log(item)} */}
                      <div className="each-fade" key={index}>
                        <div className="image-container">
                          <Chip
                            onClick={() => {
                              setShowTimeId(item.id);
                              setSelected(index);
                              setMovieTheaterId(item.movieTheaterId);
                              setShowTime(item.time);
                            }}
                            sx={{
                              color: "#3343C2",
                              fontWeight: 600,
                              width: 200,
                              minWidth: 150,
                              border: `${
                                index === selected
                                  ? "2px solid #3343C2"
                                  : "2px solid transparent"
                              }`,
                              "&:hover": {
                                cursor: "pointer",
                                // color: "white",
                                border: "2px solid #3343C2",
                                backgroundColor: "#FEB800",
                              },
                            }}
                            label={`${
                              new Date(item.date).getMonth() + 1
                            }-${new Date(item.date).getDate()}-${new Date(
                              item.date,
                            ).getFullYear()} ${item.time}`}
                            variant="outlined"
                          />
                        </div>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid justifyContent={"center"} container xs={12} md={12}>
            <Grid
              sx={{
                marginTop: "15px",
                borderTop: "solid #3343C2 2px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
              }}
              item
              xs={12}
              md={12}>
              <Typography
                sx={{ fontWeight: 600, color: "#FEB800" }}
                variant="subtitle1">
                SCREEN
              </Typography>
            </Grid>
            {_renderSeat()}
            <Grid justifyContent={"center"} container xs={12} md={12}>
              <Grid padding={1} item xs={6} md={6}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}>
                  <Typography sx={{ fontWeight: 600 }} variant="caption">
                    Seleted
                  </Typography>
                  <WeekendIcon sx={{ color: "#FEB800", margin: "0 6px" }} />
                  <ChairIcon sx={{ color: "#FEB800" }} />
                </Stack>
              </Grid>
              <Grid padding={1} item xs={6} md={6}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <WeekendOutlinedIcon sx={{ color: "#6a6a6a" }} />
                  <ChairOutlinedIcon
                    sx={{ color: "#6a6a6a", margin: "0 6px" }}
                  />
                  <Typography sx={{ fontWeight: 600 }} variant="caption">
                    Availble
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3} paddingBottom={2}>
          <Grid container>
            <Grid sx={{ marginTop: 3 }} item xs={12} md={12}>
              {_renderChosenFood()}
            </Grid>
            <Grid sx={{ marginBottom: 2, marginTop: 4 }} item xs={12} md={12}>
              {_renderPaymentMethod()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return <DefaultLayout content={_renderMain()} />;
};

export default CheckOut;
