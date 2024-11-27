import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const View = () => {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8081/auth/studentRoom/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:8081/auth/room/" + id);
        setRoom(result.data); // Assuming the response is an array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Any cleanup code, if necessary
    };
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div>
        <button>
          <Link to="/">Dorm</Link>
        </button>
        <button>
          <Link to="/room">Room</Link>
        </button>
        <button>
          <Link to="/studentInfo">Student</Link>
        </button>
        <button>
          <Link to="/studentRoom">Student Room</Link>
        </button>
      </div>
      <h2>Room Member</h2>
      <table>
        <thead>
          <tr>
            <th>room number</th>
            <th>code</th>
            <th>name</th>
            <th>contact</th>
          </tr>
        </thead>
        <tbody>
          {room.map((room) => (
            <tr key={room.id}>
              <td>{room.room_number}</td>
              <td>{room.code}</td>
              <td>{room.name}</td>
              <td>{room.contact}</td>
              <td>
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
  );
};

export default View;
