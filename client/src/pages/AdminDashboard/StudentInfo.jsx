import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";

const StudentInfo = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/auth/studentInfo")
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching studentInfo data:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8081/auth/studentInfo/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h2>Student Data </h2>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {info.map((info) => (
            <tr key={info.id}>
              <td>{info.code}</td>
              <td>{info.name}</td>
              <td>{info.gender}</td>
              <td>{info.contact}</td>
              <td>
                <Link
                  to={`/dashboard/edit_employee/` + info.id}
                  className="btn btn-info btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleDelete(info.id)}
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
          <Link to="/dashboard/addStudentInfo">Add Student Info</Link>
        </button>
      </div>
    </div>
  );
};

export default StudentInfo;
