import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDorm = () => {
  const [dorm, setDorm] = useState({
    name: "",
    slot: "",
    price: "",
    status: "",
  });

  const navigate = useNavigate();

  const handelChange = (e) => {
    setDorm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/auth/dorm", dorm);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(dorm);
  return (
    <div className="form">
      <h1>Add New Dorm</h1>
      <input
        type="text"
        placeholder="name"
        onChange={handelChange}
        name="name"
      />
      <input
        type="number"
        placeholder="slot"
        onChange={handelChange}
        name="slot"
      />
      <input
        type="text"
        placeholder="price"
        onChange={handelChange}
        name="price"
      />
      <button className="formButton" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default AddDorm;
