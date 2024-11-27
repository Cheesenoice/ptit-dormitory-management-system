import React, { useState, useEffect } from "react";
import axios from "axios";

const YourComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios
      .get("http://localhost:8081/auth/rentform")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Make a delete request to your server with the item ID
    axios
      .delete(`http://localhost:8081/auth/rentform/${id}`)
      .then((response) => {
        // Update the state after successful deletion
        setData((prevData) => prevData.filter((item) => item.id !== id));
        console.log("Item deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <div>
      <h1>Sinh viên mới</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Room</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.contact}</td>
              <td>{item.room_id}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YourComponent;
