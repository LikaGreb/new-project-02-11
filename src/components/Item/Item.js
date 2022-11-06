import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import styles from "./Item.module.scss";
import instance from "../../api/request";
import { useState } from "react";
import { toast } from "react-toastify";
import MyToast from "../ToastContainer/ToastContainer";

function Item({ item, changeData }) {
  const [isInput, setIsInput] = useState(false);
  const [valueInput, setValueInput] = useState(item.text);
  const saveItem = async () => {
    try {
      const res = await instance.post("router?action=editItem", {
        activeID: localStorage.getItem("activeID"),
        text: valueInput,
        id: item.id,
        checked: item.checked,
      });
      if (res.data.ok) {
        changeData(true);
        setIsInput(false);
      }
    } catch {
      toast("404 Server error!!!");
      return;
    }
  };
  const changeItem = async () => {
    try {
      const res = await instance.post("router?action=editItem", {
        activeID: localStorage.getItem("activeID"),
        text: item.text,
        id: item.id,
        checked: !item.checked,
      });
      if (res.data.ok) {
        changeData(true);
      }
    } catch {
      toast("404 Server error!!!");
      return;
    }
  };
  const deleteItem = async () => {
    try {
      const res = await instance.post("router?action=deleteItem", {
        activeID: localStorage.getItem("activeID"),
        id: item.id,
      });
      if (res.data.ok) {
        changeData(true);
      }
    } catch {
      toast("404 Server error!!!");
      return;
    }
  };
  const editItem = () => {
    setIsInput(true);
  };
  return (
    <>
      <MyToast />
      <div className={styles.item}>
        <div className={styles.checkInput}>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            onChange={changeItem}
            checked={item.checked}
          />
        </Form.Group>
        {isInput ? (
          <input
            type="text"
            onChange={(e) => {
              setValueInput(e.target.value);
            }}
            value={valueInput}
          />
        ) : (
                      <p className={item.checked ? styles.checked : "unchecked"}> {item.text}</p>
              )}
        </div>      
        <div className={styles.buttons}>
          <Button  variant="outline-warning" onClick={editItem}>
            Edit
          </Button>{" "}
          <Button variant="outline-success" onClick={saveItem}>
            Save
          </Button>{" "}
          <Button variant="outline-danger" onClick={deleteItem}>
            Delete
          </Button>{" "}
        </div>
      </div>
    </>
  );
}
export default Item;
