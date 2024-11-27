import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RentForm.css";

const DormForm = () => {
  const navigate = useNavigate();
  const [dorms, setDorms] = useState([]);
  const [selectedDorm, setSelectedDorm] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    password: "",
    gender: "",
    contact: "",
  });
  const [noBedAvailable, setNoBedAvailable] = useState(false);

  useEffect(() => {
    const fetchDorms = async () => {
      try {
        const result = await axios.get("http://localhost:8081/home/dorm");
        setDorms(result.data);
      } catch (error) {
        console.error("Error fetching dorms:", error);
      }
    };

    fetchDorms();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      if (selectedDorm) {
        try {
          const result = await axios.get(
            `http://localhost:8081/home/dorm/${selectedDorm}`
          );
          setRooms(result.data);

          // Check if there are no beds available
          setNoBedAvailable(result.data.length === 0);
        } catch (error) {
          console.error("Error fetching rooms:", error);
        }
      }
    };

    fetchRooms();
  }, [selectedDorm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the required fields are blank
    if (
      formData.code.trim() === "" ||
      formData.name.trim() === "" ||
      formData.password.trim() === "" ||
      formData.gender.trim() === "" ||
      formData.contact.trim() === "" ||
      selectedDorm.trim() === "" ||
      (selectedRoom.trim() === "" && !noBedAvailable)
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Check if the selected room is "Hết Phòng"
    if (selectedRoom.trim() === "" && noBedAvailable) {
      alert("Hết Phòng chọn phòng khác đi");
      return;
    }

    const data = {
      ...formData,
      room_id: selectedRoom || null,
    };

    try {
      await axios.post("http://localhost:8081/home/form", data);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          placeholder="Code"
          name="code"
          value={formData.code}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>
      <label>
        <select
          value={formData.gender}
          name="gender"
          onChange={handleInputChange}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          {/* Add more options if needed */}
        </select>
      </label>
      <label>
        <input
          type="text"
          placeholder="Contact"
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Dorm:
        <select
          value={selectedDorm}
          onChange={(e) => setSelectedDorm(e.target.value)}
        >
          <option value="">Select a dorm</option>
          {dorms.map((dorm) => (
            <option key={dorm.id} value={dorm.id}>
              {dorm.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Room:
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          {noBedAvailable ? (
            <option value="" disabled>
              Hết Phòng
            </option>
          ) : (
            <>
              <option value="">Còn Phòng</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.room_number}
                </option>
              ))}
            </>
          )}
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DormForm;
