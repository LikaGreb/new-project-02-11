
import './App.css';
//import axios from "axios";
import { useState } from "react";
import Todo from "./components/Todo/Todo.js"
import Auth from "./components/Auth/Auth.js"

function App() {
  const [token, setToken] = useState(!!window.localStorage.getItem("token"));
  const [activeID, setActiveID] = useState(!!window.localStorage.getItem("activeID"));
  const checkAuth = (param) => {
    
      setToken(param);
      setActiveID(param);
   
  }
  return (
    token && activeID ? <Todo  checkAuth={checkAuth}/> : <Auth checkAuth={checkAuth} />
    
  )
}

export default App;
