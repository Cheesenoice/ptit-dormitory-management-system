import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudentRoom = () => {
  // lấy data của student no room
  const [noroom, setNoroom] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/auth/studentnoRoom")
      .then((response) => {
        setNoroom(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  // lấy data của available room
  const [available, setAvailable] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/auth/availableroom")
      .then((response) => {
        setAvailable(response.data);
      })
      .catch((error) => {
        console.error("Error fetching available room data:", error);
      });
  }, []);

  // post room
  const [room, setRoom] = useState({
    info_id: "",
    room_id: "",
    month: "",
  });

  const navigate = useNavigate();

  const handelChange = (e) => {
    setRoom((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    // chọn xong r mới cho click
    if (!room.info_id || !room.room_id) {
      alert("Chưa chọn thông tin!");
      return;
    }
    try {
      await axios.post("http://localhost:8081/auth/studentRoom", room);
      navigate("/dashboard/studentroom");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(room);

  return (
    <div className="form">
      <label>Choose Student:</label>
      {noroom.length === 0 ? (
        <p>Không có học sinh mới</p>
      ) : (
        <select name="info_id" value={room.info_id} onChange={handelChange}>
          <option value="" disabled>
            Select Student
          </option>
          {noroom.map((student) => (
            <option key={student.id} value={student.id}>
              {`${student.code} - ${student.name}`}
            </option>
          ))}
        </select>
      )}

      <label>Choose Room:</label>
      {available.length === 0 ? (
        <p>Hết Phòng</p>
      ) : (
        <select name="room_id" value={room.room_id} onChange={handelChange}>
          <option value="" disabled>
            Select Room
          </option>
          {available.map((room) => (
            <option key={room.id} value={room.id}>
              {`${room.room_number} - ${room.dorm_name} - trống ${room.available_slot} giường`}
            </option>
          ))}
        </select>
      )}
      <input
        type="number"
        placeholder="Month"
        onChange={handelChange}
        name="month"
      />

      <button className="formButton" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default AddStudentRoom;
