import React, { useState, useEffect } from "react";
import axios from "axios";

const Water = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/auth/ROOM");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Room List</h2>
      <table>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Dorm Name</th>
            <th>Dorm Price</th>
            <th>Water Cost</th>
            <th>Electricity Cost</th>
            <th>Available Slots</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.room_number}</td>
              <td>{room.dorm_name}</td>
              <td>{room.dorm_price}</td>
              <td>{room.water}</td>
              <td>{room.elec}</td>
              <td>{room.available_slot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Water;
