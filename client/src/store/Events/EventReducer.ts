import { api } from "../api";
import { Dispatch, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import {
  IParticipant,
  Ievent,
  IeventParticipant,
  userParticipant,
  Ieventsend,
} from "./events";

/*----ActionTypes--------*/
export const GET_EVENT = "GET_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
export const UPD_EVENT = "UPD_EVENT";

/*-------ActionTypeInterface--------*/
interface getEventsAction {
  type: typeof GET_EVENT;
}
interface updEventsAction {
  type: typeof UPD_EVENT;
  payload: IeventParticipant;
}

export type EventsActionTypes = getEventsAction | updEventsAction;

export const getEvent = (
  toast: any | undefined
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  api
    .get("/events")
    .then((res: IeventParticipant | any) => {
      dispatch({ type: UPD_EVENT, payload: res.data });
    })
    .catch((err) => {
      toast({
        title: `Events get failure`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    })
    .finally(() => console.log("api/events get request made"));
};

export const createEvent = (
  eventOpts: Ieventsend,
  toast: any | undefined
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  api
    .post("/events", {
      ...eventOpts,
    })
    .then((res: IeventParticipant | any) => {
      dispatch({ type: UPD_EVENT, payload: res.data });
      toast({
        title: `Event ${eventOpts.EventName} create success`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    })
    .catch((err) => {
      toast({
        title: `Event ${eventOpts.EventName} create failure`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    })
    .finally(() => console.log("api/events post request made"));
};

export const updateEvent = (
  eventOpts: Ieventsend,
  toast: any | undefined,
  onClose: any | undefined,
  history: any | undefined
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  console.log("Inside updateEvent in [evntReducer.ts]", eventOpts);
  api
    .put("/events", {
      ...eventOpts,
    })
    .then(async (res: IeventParticipant | any) => {
      await onClose();
      dispatch({ type: UPD_EVENT, payload: res.data });
      toast({
        title: `Event ${eventOpts.EventName} update success`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      dispatch(getEvent(toast));
      //history.replace('/protected/events')
    })
    .catch((err) => {
      toast({
        title: `Event ${eventOpts.EventName} update failure`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    })
    .finally(() => console.log("api/events put request made"));
};

export const delEvent = (
  EventId: string,
  toast: any | undefined
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  api
    .delete("/events", {
      params: {
        EventId: EventId,
      },
    })
    .then((res: IeventParticipant | any) => {
      dispatch({ type: UPD_EVENT, payload: res.data });
      toast({
        title: `Event delete data success`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    })
    .catch((err: any) => {
      toast({
        title: `Event delete data failure`,
        description: `${err.response}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    })
    .finally(() => console.log("/api/events delete api called"));
};

const initialState: IeventParticipant = {
  events: [],
  participant: [],
};

export const EventReducer = (
  state = initialState,
  action: EventsActionTypes
): IeventParticipant => {
  switch (action.type) {
    case UPD_EVENT:
      return {
        events: [...action.payload.events],
        participant: [...action.payload.participant],
      };
    default:
      return { ...state };
  }
};

export default EventReducer;
