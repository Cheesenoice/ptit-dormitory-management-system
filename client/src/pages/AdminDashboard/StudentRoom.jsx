import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";

const StudentRoom = () => {
  const [full, setFull] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/auth/studentroom")
      .then((response) => {
        setFull(response.data);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8081/auth/studentRoom/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Full Data </h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Room</th>
            <th>Dorm</th>
            <th>Price</th>
            <th>Created</th>
            <th>Expired</th>
          </tr>
        </thead>
        <tbody>
          {full
            .filter((item) =>
              Object.values(item).some(
                (value) =>
                  value &&
                  value
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
            )
            .map((item) => (
              <tr key={item.id}>
                <td>{item.info_code}</td>
                <td>{item.info_name}</td>
                <td>{item.room_number}</td>
                <td>{item.dorm_name}</td>
                <td>{item.price}</td>
                <td>
                  {new Date(item.createddate).toLocaleDateString("en-GB")}
                </td>
                <td>{new Date(item.expiredate).toLocaleDateString("en-GB")}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/` + item.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div>
        <button>
          <Link to="/dashboard/addStudentRoom">Add Room for new student</Link>
        </button>
      </div>
    </div>
  );
};

export default StudentRoom;
