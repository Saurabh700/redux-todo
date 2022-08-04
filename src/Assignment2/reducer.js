import {
  GET_TODO_FAILURE,
  GET_TODO_REQUEST,
  GET_TODO_SUCCESS,
} from "./actionTypes";

const initState = {
  todos: [],
  isLoading: false,
  isError: false,
};

const reducer = (oldState = initState, action) => {
  switch (action.type) {
    case GET_TODO_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
      };
    case GET_TODO_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        todos: action.payload,
      };
    case GET_TODO_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };
    default:
      return oldState;
  }
};
export { reducer };
