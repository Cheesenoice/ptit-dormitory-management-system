import axios from "axios";
import React, { useEffect, useState } from "react";

const History = () => {
  const id = localStorage.getItem("student");
  const [roomInfo, setRoomInfo] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/student/history/" + id)
      .then((result) => {
        setRoomInfo(result.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>History</h4>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <div>
          <h3>Lịch sử ở ktx</h3>
        </div>
        <div className="d-flex align-items-center flex-column mt-5">
          {roomInfo.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>createddate</th>
                  <th>renewaldate</th>
                  <th>Month</th>
                </tr>
              </thead>
              <tbody>
                {roomInfo.map((room) => (
                  <tr key={room.id}>
                    <td>
                      {new Date(room.createddate).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      {new Date(room.renewaldate).toLocaleDateString("en-GB")}
                    </td>
                    <td>{room.month}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>NO HISTORY FOUND</p>
          )}
        </div>
        <div className="d-flex align-items-center flex-column mt-5"></div>
      </div>
    </div>
  );
};

export default History;
