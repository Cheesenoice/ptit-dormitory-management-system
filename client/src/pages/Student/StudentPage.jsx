import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const StudentPage = () => {
  const id = localStorage.getItem("student");
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const [roomInfo, setRoomInfo] = useState([]);

  useEffect(() => {
    // Fetch student info
    axios
      .get("http://localhost:8081/student/detail/" + id)
      .then((result) => {
        setInfo(result.data[0]);
      })
      .catch((err) => console.log(err));

    // Fetch room info
    axios
      .get("http://localhost:8081/student/room/" + id)
      .then((result) => {
        setRoomInfo(result.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/student/logout")
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("student");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Student Info</h4>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <div className="d-flex align-items-center flex-column mt-5">
          <h3>Tên SV: {info.name}</h3>
          <h3>MSSV: {info.code}</h3>
          <div>
            {roomInfo.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Roomate</th>
                    <th>Code</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {roomInfo.map((room) => (
                    <tr key={room.id}>
                      <td>{room.room_number}</td>
                      <td>{room.name}</td>
                      <td>{room.code}</td>
                      <td>{room.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No roommate found</p>
            )}
          </div>
        </div>
        <div className="d-flex align-items-center flex-column mt-5"></div>

        <div>
          <Link to={`/student/edit/` + id} className="btn btn-primary me-2">
            Update
          </Link>
          <Link to={`/student/history`} className="btn btn-primary me-2">
            History
          </Link>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
