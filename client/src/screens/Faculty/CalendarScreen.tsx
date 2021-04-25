import React from "react";
import {
  useToast,
  Box,
  Stack,
  Badge,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { getSem } from "../../store/semester/semesterReducer";
import { getDay } from "../../store/Days/daysReducer";
import { getEvent } from "../../store/Events/EventReducer";
import { getPk, getPeriods } from "../../store/classperiods/periodsReducer";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { getLeave } from "../../store/applyLeave/leaveReducer";
import { api } from "../../store/api";
import moment from "moment";
import {getnotification} from '../../store/notification/notification' 
require("react-big-calendar/lib/css/react-big-calendar.css");

const localizer = momentLocalizer(moment);
const CalendarScreen = () => {
  let dispatch = useDispatch();
  let toast = useToast();
  const fakeToast = (props: any) => {
    console.log(props);
  };
  React.useEffect(() => {
    dispatch(getDay(fakeToast));
    dispatch(getEvent(fakeToast));
    dispatch(getLeave(fakeToast));
    dispatch(getSem(fakeToast));
    dispatch(getnotification(fakeToast));
  }, []);

  const dayType = useSelector((state: RootState) => state.day);
  const event = useSelector((state: RootState) => state.events.events);
  const leave = useSelector((state: RootState) => state.leave);
  const participant = useSelector(
    (state: RootState) => state.events.participant
  );

  const dayCal = {};
  Object.values(dayType).map((q) => {
    let dt = String(moment(q.date).toDate());
    dayCal[dt] = {
      type: q.type,
    };
  });
  const events = event.map((q) => {
    return {
      id: q.EventId,
      start: moment(q.startTime).toDate(),
      end: moment(q.endTime).toDate(),
      title: q.EventName,
      location: q.Location,
      description: q.Description,
      dataType: q.type,
      dtype: "event",
    };
  });
  const participants = participant.map((q) => {
    return {
      id: q.EventId,
      start: moment(q.startTime).toDate(),
      end: moment(q.endTime).toDate(),
      title: q.EventName,
      location: q.Location,
      description: q.Description,
      dataType: q.type,
      dtype: "participant",
    };
  });
  const leaves = Object.values(leave).map((q) => {
    return {
      id: q.Leaveid,
      title: `${q.leavetype} leave`,
      start: moment(q.fromdate).toDate(),
      end: moment(q.todate).toDate(),
      dtype: "leave",
    };
  });
  const data = [...events, ...leaves, ...participants];
  // console.log(data);
  // const username = useSelector((state:RootState)=>state.profile.user.username);
  // const pk=useSelector((state:RootState)=>state.period.pk.sem);
  // pk.map(q=>{
  //     dispatch(getPeriods(q,username,fakeToast));
  //     dispatch(getSem(fakeToast));
  //     const per=useSelector((state:RootState)=>state.period.periods);
  //     const sem=useSelector((state:RootState)=>state.sem);
  //     console.log(per,sem);
  // });
  const eventStyleGetter = (event, start, end, isSelected) => {
    if (event.dataType in { Meeting: "", Exam: "", Misc: "" }) {
      return {
        style: {
          backgroundColor:
            event.dataType === "Meeting"
              ? "#805AD5"
              : event.dataType === "Exam"
              ? "#D53F8C"
              : "#718096",
        },
      };
    }
    return {};
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rem, setRem] = React.useState<any>({
    title: "",
    start: new Date(),
    id: "",
  });
  // const _popOver = (data: any) => {
  //   console.log(data);
  //   return (

  //   );
  // };
  const setReminder = (a: any) => {
    console.log(a);
    if (a.dtype === "event" || a.dtype === "participant") {
      setRem(a);
      onOpen();
    }
  };
  const _dayPrp = (date) => {
    if (String(date) in dayCal) {
      return {
        style: {
          backgroundColor:
            dayCal[String(date)].type === "H"
              ? "#DC3D2A"
              : dayCal[String(date)].type === "W"
              ? "#3174ad"
              : "#fff",
          opacity: 0.4,
        },
      };
    }
    if (moment(date).day() == 0)
      return { style: { backgroundColor: "#DC3D2A", opacity: 0.4 } };
    if (
      moment(date).day() == 6 &&
      (moment(date).week() - moment(date).startOf("month").week() + 1 == 1 ||
        moment(date).week() - moment(date).startOf("month").week() + 1 == 3)
    )
      return { style: { backgroundColor: "#3174ad", opacity: 0.3 } };
    //else return{ style: { backgroundColor: "#00B32C",opacity: 0.4 } }
  };
  const [ti, setTi] = React.useState<any>();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={5}>
          <ModalHeader>{`Set Reminder for event ${rem.title}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDirection="column" alignItems="flex-start">
            <Box d="flex" alignItems="center" mb={2}>
              Event Time: {moment(rem.start).format("lll")}
            </Box>
            <Box d="flex" alignItems="center">
              Before:
              <Select
                ml={5}
                id="select_rem"
                placeholder="Select Reminder Time"
                w={"40vh"}
                onChange={(val) => setTi(val.target.value)}
              >
                <option
                  value={String(
                    moment(rem.start).subtract(2, "minutes").toISOString()
                  )}
                >
                  2 mins before
                </option>
                <option
                  value={String(
                    moment(rem.start).subtract(5, "minutes").toISOString()
                  )}
                >
                  5 mins before
                </option>
                <option
                  value={String(
                    moment(rem.start).subtract(10, "minutes").toISOString()
                  )}
                >
                  10 mins before
                </option>
                <option
                  value={String(
                    moment(rem.start).subtract(30, "minutes").toISOString()
                  )}
                >
                  30 mins before
                </option>
                <option
                  value={String(moment(rem.start).subtract(1, "hour").toISOString())}
                >
                  1 hour before
                </option>
              </Select>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="green"
              disabled={ti===null||ti===undefined}
              onClick={() => {
                api
                  .post("/rem", {
                    time: ti,
                    id: rem.id,
                  })
                  .then((res: any) => {
                    //console.log(res.data);
                    toast({
                      title: `Reminder set success`,
                      //description: `${res.data.message}`,
                      status: "success",
                      duration: 1000,
                      isClosable: true,
                    });
                    dispatch(getnotification(fakeToast));
                    onClose();
                  })
                  .catch((err) => {
                    toast({
                      title: `Reminder set failure`,
                      status: "error",
                      duration: 1000,
                      isClosable: true,
                    });
                  })
                  .finally(() => console.log("api/rem post request made"));
              }}
            >
              Set Reminder
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box style={{ height: "80vh", margin: "5px" }}>
        <Calendar
          localizer={localizer}
          events={data}
          eventPropGetter={eventStyleGetter}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          //drilldownView="agenda"
          dayPropGetter={(date) => _dayPrp(date)}
          views={["month", "day", "week", "work_week", "agenda"]}
          onSelectEvent={(a) => {
            //setRem(a);
            setReminder(a);
          }}
        />
        <Stack direction="row" mt={10}>
          <Box fontWeight="bold" fontFamily="cursive" fontSize="12">
            {" "}
            DAY TYPE:{" "}
          </Box>
          <Badge variant="subtle" colorScheme="red">
            Holiday
          </Badge>
          <Badge
            variant="outline"
            color="#000"
            borderColor="#ccc"
            borderWidth="thin"
            colorScheme="whiteAlpha"
          >
            Working Day
          </Badge>
          <Badge variant="subtle" colorScheme="blue">
            Working for staffs only
          </Badge>
        </Stack>
        <Stack direction="row" mt={5}>
          <Box fontWeight="bold" fontFamily="cursive" fontSize="12">
            {" "}
            EVENT TYPE:{" "}
          </Box>
          <Badge variant="solid" colorScheme="purple">
            Meeting
          </Badge>
          <Badge variant="solid" colorScheme="gray">
            Misc
          </Badge>
          <Badge variant="solid" colorScheme="pink">
            Exam
          </Badge>
        </Stack>
      </Box>
    </>
  );
};
export default CalendarScreen;
