import React from "react";
import Button from "react-bootstrap/Button";
import instance from "../../api/request";

function Todo({checkAuth}) {
    const logOutFunction = async () => {
        
        const res = await instance.post("/router?action=logout");
        if (res.data.ok) {
           localStorage.removeItem("token");
            localStorage.removeItem("activeID");
            checkAuth(false);
       }
    }
    return (
        <Button variant="primary" type="submit" onClick={logOutFunction}>
            Submit
          </Button>

    )
}
export default Todo;