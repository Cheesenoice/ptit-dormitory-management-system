import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dorm = () => {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8081/auth/dorm/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h2>Dorm Data </h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Slot</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dorm.map((dorm) => (
            <tr key={dorm.id}>
              <td>{dorm.name}</td>
              <td>{dorm.slot}</td>
              <td>{dorm.price}</td>
              <td>{dorm.status}</td>
              <td>
                <Link
                  to={`/dashboard/dormedithistory/` + dorm.id}
                  className="btn btn-info btn-sm me-2"
                >
                  dormedithistory
                </Link>
                <Link
                  to={`/dashboard/editdorm/` + dorm.id}
                  className="btn btn-info btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleDelete(dorm.id)}
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
          <Link to="/dashboard/addDorm">Add dorm</Link>
        </button>
      </div>
    </div>
  );
};

export default Dorm;
