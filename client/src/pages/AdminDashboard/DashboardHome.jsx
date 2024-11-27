import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./dashboard.css";

const DashboardHome = () => {
  const [expiredStudents, setExpiredStudents] = useState([]);
  const [registrationHistory, setRegistrationHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expireResponse = await axios.get(
          "http://localhost:8081/auth/expire"
        );
        setExpiredStudents(expireResponse.data);

        const historyResponse = await axios.get(
          "http://localhost:8081/auth/studentroom"
        );
        setRegistrationHistory(historyResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id, isExpired) => {
    try {
      await axios.delete(`http://localhost:8081/auth/studentRoom/${id}`);
      // Update the state without reloading the entire page
      if (isExpired) {
        setExpiredStudents((prevExpired) =>
          prevExpired.filter((student) => student.id !== id)
        );
      } else {
        setRegistrationHistory((prevHistory) =>
          prevHistory.filter((student) => student.id !== id)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderExpiredStudents = () => {
    return expiredStudents.map((student) => (
      <tr key={student.id}>
        <td>{student.info_code}</td>
        <td>{student.info_name}</td>
        <td>{student.room_number}</td>
        <td>{student.dorm_name}</td>
        <td>{student.price}</td>
        <td>{new Date(student.createddate).toLocaleDateString("en-GB")}</td>
        <td>{new Date(student.expiredate).toLocaleDateString("en-GB")}</td>
        <td>
          <Link
            to={`/dashboard/renew/${student.id}`}
            className="btn btn-info btn-sm me-2"
          >
            Gia hạn
          </Link>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => handleDelete(student.id, true)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  const renderRegistrationHistory = () => {
    return registrationHistory.map((student) => (
      <tr key={student.id}>
        <td>{student.info_code}</td>
        <td>{student.info_name}</td>
        <td>{student.room_number}</td>
        <td>{student.dorm_name}</td>
        <td>{student.price}</td>
        <td>{new Date(student.createddate).toLocaleDateString("en-GB")}</td>
        <td>{new Date(student.expiredate).toLocaleDateString("en-GB")}</td>
        <td>
          <Link
            to={`/dashboard/view/${student.id}`}
            className="btn btn-info btn-sm me-2"
          >
            Xem
          </Link>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => handleDelete(student.id, false)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <div>
        <Link to={`/dashboard/newstudent`} className="btn btn-info btn-sm mb-2">
          Học sinh mới
        </Link>
        <h2>Sinh viên hết hạn</h2>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderExpiredStudents()}</tbody>
        </table>
      </div>
      <div>
        <h2>Lịch sử đăng kí</h2>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderRegistrationHistory()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
