import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Renew = () => {
  const { id } = useParams(); // Use useParams to get the id from the URL
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    month: "",
  });

  const handleChange = (e) => {
    setRoom((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async () => {
    try {
      await axios.post(`http://localhost:8081/auth/renew/${id}`, room);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(room);

  return (
    <div className="form">
      <input
        type="number"
        placeholder="Month"
        onChange={handleChange}
        name="month"
      />
      <button className="formButton" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default Renew;
