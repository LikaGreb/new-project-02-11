import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import instance from "../../api/request";
import { useState } from "react";
import ToDoList from "../ToDoList/ToDoList";
import AddItem from "../AddItem/AddItem";
import styles from "./Todo.module.scss"

function Todo({ checkAuth }) {
  const [items, setItems] = useState([]);
  const [isNewItem, setNewItem] = useState(false);
  const changeData = (param) => {
    setNewItem(param);
  };
  const logOutFunction = async () => {
    const res = await instance.post("/router?action=logout");
    if (res.data.ok) {
      localStorage.removeItem("token");
      localStorage.removeItem("activeID");
      checkAuth(false);
    }
  };
  useEffect(() => {
    const getItems = async () => {
      const res = await instance.post("router?action=getItems", {
        activeID: localStorage.getItem("activeID"),
      });
      //console.log(res.data.items);
      setItems(res.data.items);
    };
    getItems();
    setNewItem(false);
  }, [isNewItem]);
  return (
    <div className={styles.todo}>
      <Button className={styles.logoutBtn}  variant="primary" type="submit" onClick={logOutFunction}>
        Logaut
      </Button>
      <h1>Add new task:</h1>
      <AddItem changeData={changeData} />
      {items.length === 0 ? null : (
        <ToDoList items={items} changeData={changeData} />
      )}
      
      
    </div>
  );
}
export default Todo;
