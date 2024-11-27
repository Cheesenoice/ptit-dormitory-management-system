import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    des: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  const handelChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8081/books/" + bookId, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(book);
  return (
    <div className="form">
      <h1>Update Book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handelChange}
        name="title"
      />
      <input type="text" placeholder="des" onChange={handelChange} name="des" />
      <input
        type="number"
        placeholder="price"
        onChange={handelChange}
        name="price"
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handelChange}
        name="cover"
      />
      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default Add;
