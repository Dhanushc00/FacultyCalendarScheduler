import React from "react";
import { useToast, Box, Stack, Badge } from "@chakra-ui/react";
import { getSem } from "../../store/semester/semesterReducer";
import { getDay } from "../../store/Days/daysReducer";
import { getEvent } from "../../store/Events/EventReducer";
import { getPk, getPeriods } from "../../store/classperiods/periodsReducer";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
require("react-big-calendar/lib/css/react-big-calendar.css");
const localizer = momentLocalizer(moment);
const CalendarScreen = () => {
  let dispatch = useDispatch();
  const fakeToast = (props: any) => {
    console.log(props);
  };
  React.useEffect(() => {
    dispatch(getDay(fakeToast));
    dispatch(getEvent(fakeToast));
  }, []);
  const dayType = useSelector((state: RootState) => state.day);
  const event = useSelector((state: RootState) => state.events.events);
  const participant = useSelector(
    (state: RootState) => state.events.participant
  );
  const dayCal = Object.values(dayType).map((q) => {
    return {
      id: String(q.date + q.type),
      start: q.date,
      end: q.date,
      allDay: true,
      type: q.type,
      dataType: "Day",
    };
  });
  const events = event.map((q) => {
    return {
      id: String(q.EventId + q.EventName),
      start: q.startTime,
      end: q.endTime,
      title: q.EventName,
      location: q.Location,
      description: q.Description,
      dataType: q.type,
    };
  });
  const data = [...dayCal, ...events];
  console.log(data);
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
    console.log(event);
    if (event.dataType == "Day") {
      return {
        style: {
          backgroundColor:
            event.type === "H"
              ? "#DC3D2A"
              : event.type === "W"
              ? "#3174ad"
              : "#00B32C",
          borderRadius: "0px",
          opacity: 0.4,
          color: "white",
          border: "0px",
          height: 100,
        },
      };
    }
    if (event.dataType in { Meeting: "", Exam: "", Misc: "" }) {
      console.log(event.dataType);
      return {
        style: {
          backgroundColor:
            event.dataType === "Meeting"
              ? "#805AD5"
              : event.dataType === "Exam"
              ? "#D53F8C"
              : "#718096",
          //   borderRadius: "0px",
          //   opacity: 0.8,
          //   color: "white",
          //   border: "0px",
        },
      };
    }
    return {};
  };
  return (
    <Box style={{ height: "80vh", margin: "5px" }}>
      <Calendar
        localizer={localizer}
        events={data}
        eventPropGetter={eventStyleGetter}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month', 'day','week','work_week']}
      />
      <Stack direction="row" mt={10}>
        <Box fontWeight="bold" fontFamily="cursive" fontSize="12">
          {" "}
          DAY TYPE:{" "}
        </Box>
        <Badge variant="subtle" colorScheme="red">
          Holiday
        </Badge>
        <Badge variant="subtle" colorScheme="green">
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
  );
};
export default CalendarScreen;
