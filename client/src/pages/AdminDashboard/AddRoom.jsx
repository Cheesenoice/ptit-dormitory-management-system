import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  // lấy data của dorm
  const [dorm, setDorm] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/auth/dorm")
      .then((response) => {
        setDorm(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dorm data:", error);
      });
  }, []);
  // get room
  const [room, setRoom] = useState({
    number: "",
    dorm_id: "",
  });

  const navigate = useNavigate();

  const handelChange = (e) => {
    setRoom((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/auth/room", room);
      navigate("/dashboard/Room");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(room);
  return (
    <div className="form">
      <h1>Add New Room</h1>
      <input
        type="text"
        placeholder="number"
        onChange={handelChange}
        name="number"
      />
      <label>Dorm:</label>
      <select name="dorm_id" value={room.dorm_id} onChange={handelChange}>
        <option value="" disabled>
          Select Dorm
        </option>
        {dorm.map((dorm) => (
          <option key={dorm.id} value={dorm.id}>
            {`${dorm.name} - ${dorm.price}`}
          </option>
        ))}
      </select>

      <button className="formButton" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default AddRoom;
