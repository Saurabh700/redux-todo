import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTodo, getTodo, updateTodo } from "./action";

const TodoItem = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { todos } = useSelector((store) => store);
  console.log(todos, "inside");
  const selectedItem = todos.filter((item) => item.id === Number(params.id));
  console.log(params);
  console.log(selectedItem, "clicked");

  const toggleStatus = (id, status, dispatch) => {
    updateTodo(id, status, dispatch);
  };

  const navigate = useNavigate();
  const handleDelete = (id) => {
    deleteTodo(id);
    navigate("/");
    dispatch(getTodo);
  };

  return (
    <div>
      TodoItem
      <div>
        {selectedItem.map((item) => (
          <div key={item.id}>
            <div>Item ID: {item.id}</div>
            <div>Title: {item.title}</div>
            <div>Status: {item.status ? "Incomplete" : "Completed"}</div>
            <button
              onClick={() => toggleStatus(item.id, !item.status, dispatch)}
            >
              Toggle Status
            </button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default TodoItem;
