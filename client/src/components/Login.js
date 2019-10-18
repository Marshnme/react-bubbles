import React,{useState, useEffect} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";



const Login = (props) => {
  const [form, setForm] = useState({username:"",password:""})
  

  const  handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
    .post("/api/login", form)
    .then(res =>{
        console.log("post res",res)
        localStorage.setItem("token",res.data.payload)
        props.history.push("/bubble-page")
    })

  }

  const handleChanges = e => {
    setForm({...form, [e.target.name] : e.target.value})
  };
  return (
    <>
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={form.username} placeholder="username..." onChange={handleChanges}></input>
        <input type="password" name="password" value={form.password} placeholder="password..." onChange={handleChanges}></input>
        <button type="submit">Login</button>
      </form>
    </div>
      
      
    </>
  );
};

export default Login;
