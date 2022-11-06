import { Button, Form } from "react-bootstrap";
import instance from "../../api/request";
import { toast } from "react-toastify";
import MyToast from "../ToastContainer/ToastContainer";
import { useState } from "react";
import styles from "./AddItem.module.scss"

function AddItem({ changeData }) {
  const [text, setText] = useState("");
  const add = async () => {
    try {
      const res = await instance.post("router?action=createItem", {
        activeID: localStorage.getItem("activeID"),
        text: text,
      });
      if (res.data.id && res.data.id !== "") {
        changeData(true);
      }
    } catch {
      toast("404 Server error!!!");
      return;
    }
  };
  return (
    <div className={styles.addItemDiv}>
      <MyToast />
      <Form className={styles.addItem}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="New task"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="outline-primary" onClick={add}>Add task</Button>
      </Form>
    </div>
  );
}
export default AddItem;
