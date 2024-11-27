import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudentInfo = () => {
  const [info, setInfo] = useState({
    code: "",
    name: "",
    password: "",
    gender: "",
    contact: "",
  });

  const navigate = useNavigate();

  const handelChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/auth/studentInfo", info);
      navigate("/dashboard/studentInfo");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info);
  return (
    <div className="form">
      <h1>Add New Student</h1>
      <input
        type="text"
        placeholder="Code"
        onChange={handelChange}
        name="code"
      />
      <input
        type="text"
        placeholder="Name"
        onChange={handelChange}
        name="name"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={handelChange}
        name="password"
      />
      <input
        type="text"
        placeholder="Gender"
        onChange={handelChange}
        name="gender"
      />
      <input
        type="text"
        placeholder="Contact"
        onChange={handelChange}
        name="contact"
      />
      <button className="formButton" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default AddStudentInfo;
