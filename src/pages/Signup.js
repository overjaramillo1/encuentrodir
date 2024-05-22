import React,{useState} from "react";
import UserPool from "./UserPool";
import "./form.css";

const Signup=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");


    const onSubmit=(event)=>{
        event.preventDefault();
        UserPool.signUp(email,password,[],null,(err, data)=>{
            if(err){
                console.error(err);
            }
            console.log(data);
        });
    };


  return (
    <div>
     <form onSubmit={onSubmit}>
     <br />
        <label htmlFor="email">
          Email
          <input
            type="textarea"
            name="email"
            value={email}
            onChange={(event) =>setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="textarea"
            name="password"
            value={password}
            onChange={(event) =>setPassword(event.target.value)}
          />
        </label>
        <input type="submit" />
     </form>
    </div>
  );
}


export default  Signup;