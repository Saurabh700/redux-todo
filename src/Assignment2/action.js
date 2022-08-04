import axios from "axios";
import {
  GET_TODO_FAILURE,
  GET_TODO_REQUEST,
  GET_TODO_SUCCESS,
} from "./actionTypes";

const setTodo = (payload) => {
  return {
    type: GET_TODO_SUCCESS,
    payload,
  };
};
const todoError = () => {
  return {
    type: GET_TODO_FAILURE,
  };
};

const todoLoading = () => {
  return {
    type: GET_TODO_REQUEST,
  };
};

// here the error is we cannot declare dispatch=useDispatch() on root level--> we can only declare it inside a react component but here we dont have any so we will pass dispatch as a argument and this is the reason why we use thunk

const getTodo = (dispatch) => {
  dispatch(todoLoading());
  axios
    .get("http://localhost:8080/todos")
    .then((res) => dispatch(setTodo(res.data)))
    .catch((err) => dispatch(todoError(err)));
};

// const getTodoviaQuery = (dispatch) => {
//   dispatch(todoLoading());
//   axios.get("http://localhost:8080/todos");
// };

function deleteTodo(id) {
  // axios({
  //   url: `https://json-server-mocker-masai.herokuapp.com/tasks/${id}`,
  //   method: "delete",
  // });
  // working below one
  axios
    .delete(`http://localhost:8080/todos/${id}`)
    .then(() => getTodo())
    .catch((res) => console.log(res));
}

const handleAdd = (todoItem, dispatch) => {
  console.log(todoItem, "got it?");
  return axios
    .post("http://localhost:8080/todos", {
      title: todoItem,
      status: false,
    })
    .then(() => dispatch(getTodo))
    .catch((err) => console.log(err));
};

function updateTodo(id, toggle, dispatch) {
  axios
    .patch(`http://localhost:8080/todos/${id}`, {
      status: toggle,
    })
    .then(() => dispatch(getTodo))
    .catch((res) => console.log(res));
}

export {
  setTodo,
  todoError,
  todoLoading,
  getTodo,
  deleteTodo,
  handleAdd,
  updateTodo,
};
