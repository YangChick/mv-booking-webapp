import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import {
  CircularProgress,
  FormGroup,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import Ultils from "../../Ultils";
import { ROUTERS } from "../../Contants";
import { useDispatch } from "react-redux";
import { createNewInvoice } from "../../APIs/invoices.api";
import {
  createInvoices,
  request,
  status,
  submit,
} from "../../features/invoices/invoicesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateSeat, updateSeatStatus } from "../../features/seats/seatsSlice";
const steps = ["Confirm", "Enter infor"];
interface ISectionProps {
  showTimeId: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  listSeat?: string[];
  listSeatName: string[];
  totalWithFood: number;
  totalWithSeat: number;
  movieName: string;
  showTime: string;
  movieTheaterId: string;
  foods: string[];
  isOpen: boolean;
  movieTheaterName: string;
  onclose?: () => void;
}

interface IFormStructure {
  movieName: string;
  client: string;
  totalMoney: String;
  paymentNumber: string;
  phoneNumber: string;
  foods: any[];
  listSeats: any[];
  movieTheater: string;
  showTime: string;
}

const DEFAULT_PAYLOAD = {
  showTimeId: "",
  movieName: "",
  client: "",
  totalMoney: "",
  paymentNumber: "",
  phoneNumber: "",
  listSeats: [],
  foods: [],
  movieTheater: "",
  showTime: "",
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #3343c2",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const CheckOutPopup: React.FC<ISectionProps> = ({
  showTimeId,
  listSeat = [],
  totalWithFood = 0,
  totalWithSeat = 0,
  showTime,
  isOpen = false,
  movieTheaterName,
  movieName,
  movieTheaterId,
  foods,
  listSeatName = [],
  onclose = () => false,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [msg, setMsg] = React.useState<IFormStructure>(DEFAULT_PAYLOAD);
  const [payload, setPayload] = React.useState<IFormStructure>(DEFAULT_PAYLOAD);
  const [foodsReciver, setfoodsReciver] = React.useState<any[]>([]);
  const [foodsReciverId, setfoodsReciverId] = React.useState<any[]>([]);
  const stt = useAppSelector(status);
  const rq = useAppSelector(request);
  const submiInvoice = useAppSelector(submit);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (onclose) onclose();
  }, []);

  React.useEffect(() => {
    let foodsIds: string[] = [];
    if (foods) {
      setfoodsReciver(foods);
      foods.map((food: any) => {
        foodsIds.push(food.id);
      });
      setfoodsReciverId(foodsIds);
    }
  }, [isOpen]);

  const result = foodsReciver.reduce((acc, curr) => {
    const { name, id, ...rest } = curr;
    acc[id] = acc[id] || { ...rest, quantity: 0 };
    acc[id].quantity += 1;
    return acc;
  }, {});
  const outputArray = Object.values(result);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleFinish = () => {
    dispatch(createInvoices(payload));
    dispatch(
      updateSeat({
        listSeat: payload.listSeats,
        status: "active",
      }),
    );
  };
  const handleClose = () => {
    onclose();
  };
  // React.useEffect(() => {
  //   if (submiInvoice && submiInvoice.payload.status) {
  //     Ultils.redirect(ROUTERS.FINISH_CHEKCOUT);
  //     handleClose();
  //   }
  //   console.log(submiInvoice);
  // }, [submiInvoice]);
  // React.useEffect(() => {
  //   if (
  //     submiInvoice &&
  //     submiInvoice.payload &&
  //     submiInvoice.payload.status === true
  //   ) {
  //     Ultils.redirect(ROUTERS.FINISH_CHEKCOUT);
  //   }
  //   console.log(submiInvoice);
  // }, [submiInvoice.payload.payload]);
  React.useEffect(() => {
    if (submiInvoice && submiInvoice.payload && submiInvoice.payload.status) {
      handleClose();
      console.log(submiInvoice);
      Ultils.redirect(ROUTERS.FINISH_CHEKCOUT);
    }
  }, [submiInvoice.payload]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onChangeInput = (e: any) => {
    const {
      name,
      value,
    }: { name: "client" | "paymentNumber" | "phoneNumber"; value: string } =
      e.target;
    const isExistMsg = msg[name];
    if (isExistMsg) setMsg({ ...msg, [name]: "" });
    // id            String   @id @unique @default(uuid())
    // movieName     String
    // client        String
    // totalMoney    String
    // paymentNumber String
    // phoneNumber   String
    // listSeats     String[]
    // movieTheaterId  String
    // showTimeId      String
    // foods String[]
    const newValue = {
      movieName: movieName,
      showTimeId: showTimeId,
      foods: foodsReciverId,
      totalMoney: (totalWithFood + totalWithSeat).toString(),
      listSeats: listSeat,
      movieTheater: movieTheaterName,
      movieTheaterId: movieTheaterId,
      showTime: showTime,
      [name]: value,
    };
    setPayload({ ...payload, ...newValue });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={() => onclose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={isOpen}>
          <Box sx={style}>
            {stt === "loading" && (
              <Box
                sx={{
                  zIndex: 4,
                  position: "fixed",
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0,0,0,0.3)",
                }}>
                <CircularProgress
                  sx={{
                    marginLeft: 20,
                    marginTop: 20,
                    zIndex: 4,
                    position: "fixed",
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    color: "#FEB800",
                  }}
                />
              </Box>
            )}

            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};

                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step sx={{ marginBottom: 1 }} key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            <React.Fragment>
              {activeStep === 0 && (
                <Box>
                  <Typography
                    sx={{
                      borderRadius: 1,
                      backgroundColor: "#3343c2",
                      padding: 1,
                      color: "#FEB800",
                    }}
                    variant="h4"
                    id="transition-modal-title"
                    component="h2">
                    Movie Tickets
                  </Typography>
                  <Typography variant="h6">
                    Movie Name: <b>{movieName}</b>{" "}
                  </Typography>
                  <Typography variant="h6">
                    Movie Theater: <b>{movieTheaterName}</b>
                  </Typography>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                    <Typography sx={{ marginRight: 1 }} variant="h6">
                      Seats:
                    </Typography>
                    {listSeatName?.map((item) => {
                      return (
                        <Typography
                          variant="h6"
                          sx={{ width: "max-content", marginRight: 1 }}>
                          <b>{item}</b>
                        </Typography>
                      );
                    })}
                  </Stack>

                  <Typography sx={{ marginRight: 1 }} variant="h6">
                    Food:
                    {outputArray.map((item: any) => {
                      return (
                        <b>
                          {item.food} : {item.quantity},
                        </b>
                      );
                    })}
                  </Typography>
                  <Typography sx={{ marginRight: 1 }} variant="h6">
                    Show Time: <b>{showTime}</b>
                  </Typography>
                  <Typography sx={{ marginRight: 1 }} variant="h6">
                    Total: <b>{totalWithFood + totalWithSeat}</b>
                  </Typography>
                </Box>
              )}
              {activeStep === 1 && (
                <Box
                  sx={{
                    width: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <TextField
                    value={payload.client}
                    fullWidth
                    id="outlined-basic"
                    type="email"
                    label="Email"
                    name="client"
                    variant="outlined"
                    size="small"
                    onChange={onChangeInput}
                  />

                  <TextField
                    fullWidth
                    value={payload.phoneNumber}
                    sx={{ margin: "6px 0" }}
                    id="outlined-basic"
                    name="phoneNumber"
                    label="Phone number"
                    variant="outlined"
                    size="small"
                    onChange={onChangeInput}
                  />

                  <TextField
                    value={payload.paymentNumber}
                    fullWidth
                    name="paymentNumber"
                    id="outlined-basic"
                    label="Payment number"
                    variant="outlined"
                    size="small"
                    onChange={onChangeInput}
                  />
                </Box>
              )}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}>
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {activeStep !== steps.length - 1 && (
                  <Button
                    disabled={totalWithFood + totalWithSeat === 0}
                    onClick={handleNext}>
                    Next
                  </Button>
                )}
                {activeStep === steps.length - 1 && (
                  <Button onClick={handleFinish}>Finish</Button>
                )}
              </Box>
            </React.Fragment>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CheckOutPopup;
