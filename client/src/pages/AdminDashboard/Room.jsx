import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Room = () => {
  const [room, setRoom] = useState([]);
  const [nope, setNope] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRoom, setFilteredRoom] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/auth/availableroom")
      .then((response) => {
        setRoom(response.data);
        setFilteredRoom(response.data);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
    axios
      .get("http://localhost:8081/auth/notavailableroom")
      .then((response) => {
        setNope(response.data);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
  }, []);

  useEffect(() => {
    // Filter the room based on available slots
    const filteredData = room.filter(
      (room) =>
        room.available_slot.toString().includes(searchTerm) ||
        room.dorm_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRoom(filteredData);
  }, [searchTerm, room]);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/auth/room/" + id)
      .then((err) => {
        if (err.data.success) {
          alert("Room deleted successfully");
          window.location.reload();
        } else {
          console.log("Phòng có học sinh:", err.data.error);
          alert("Phòng có học sinh.");
        }
      })
      .catch((error) => {
        console.error("Error deleting room:", error);
        alert("Error deleting room. Check the console for details.");
      });
  };

  return (
    <div>
      <div>
        <h2>Phòng còn giường </h2>
        <input
          type="text"
          placeholder="Search by available slot or dorm name"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Price</th>
              <th>Available Slot</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoom.map((room) => (
              <tr key={room.id}>
                <td>{room.room_number}</td>
                <td>{room.dorm_name}</td>
                <td>{room.dorm_price}</td>
                <td>{room.available_slot}</td>
                <td>
                  <Link
                    to={`/dashboard/room/` + room.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(room.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Phòng hết giường </h2>
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Price</th>
              <th>Available Slot</th>
            </tr>
          </thead>
          <tbody>
            {nope.map((nope) => (
              <tr key={nope.id}>
                <td>{nope.room_number}</td>
                <td>{nope.dorm_name}</td>
                <td>{nope.dorm_price}</td>
                <td>{nope.available_slot}</td>
                <td>
                  <Link
                    to={`/dashboard/room/` + nope.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(nope.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div></div>
      </div>
      <button>
        <Link to="/dashboard/addRoom">Add Room</Link>
      </button>
    </div>
  );
};

export default Room;
