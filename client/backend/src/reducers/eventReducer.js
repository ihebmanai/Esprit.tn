import {
  ADD_EVENT,
  GET_EVENTS,
  GET_EVENT,
  DELETE_EVENT,
  EVENT_LOADING,
  EDIT_EVENT,
  UNARCHIVE_EVENT,
  ARCHIVE_EVENT
} from "../actions/types";

const initialState = {
  events: [],
  event: {},
  loading: false,
  search: [],
  searching :false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EVENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
        loading: false
      };
    case GET_EVENT:
      return {
        ...state,
        event: action.payload,
        loading: false
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events,action.payload],
        event: action.payload
      };
    case EDIT_EVENT:
      return {
        ...state,
        events: state.events.map((event) => event._id === action.payload._id ? event = action.payload : event)
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event._id !== action.payload),
      };
    case UNARCHIVE_EVENT: 
    return {
      ...state,
      events: state.events.map((event) => event._id === action.payload._id ? event = action.payload : event)
    };
    case ARCHIVE_EVENT: 
    return {
      ...state,
      events: state.events.map((event) => event._id === action.payload._id ? event = action.payload : event)
    };
    default:
      return state;
  }
}

