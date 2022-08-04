import React, { useEffect } from "react";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteTodo, getTodo, handleAdd, updateTodo } from "./action";
import { Link } from "react-router-dom";
import TodoItem from "./TodoItem";

const Todo = () => {
  // most imp is to understand dispatch --> which we are using in useEffect - handleAdd - getTodo

  const { todos, isLoading, isError } = useSelector((store) => {
    return {
      todos: store.todos,
      isLoading: store.isLoading,
      isError: store.isError,
    };
  }, shallowEqual);

  const [todoItem, setTodoItem] = useState("");
  console.log(todos);

  const dispatch = useDispatch();

  useEffect(() => {
    // getTodo() ->1st
    // getTodo(dispatch); -> 2nd
    dispatch(getTodo); // -> 3rd
    // yaha se dispatch nikla to vo jayega middleware ke paas --> and jaisey hi middleware ko pata chalega ki dispatch ke andar to ek function hai to vo swap kar dega--> jaisey hi swap hua vaisey hi getTodo call ho jayega and then getTodo execute hoga which is in action.js --> tab jakar server se data milega
  }, []);

  return (
    <div>
      <div>Todo</div>
      {isLoading && <div>---------Loading--------</div>}
      {isError && <div>--------Error-------</div>}
      <div>
        <input type="text" onChange={(e) => setTodoItem(e.target.value)} />
      </div>
      <button onClick={() => handleAdd(todoItem, dispatch)}>ADD</button>
      {/* <button onClick={() => deleteTodo(6)}>delete</button>
      <button onClick={() => updateTodo(4)}>update</button> */}
      <div>ITEMS</div>
      {todos.map((item) => (
        <div key={item.id}>
          <Link to={`/${item.id}`}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Todo;
