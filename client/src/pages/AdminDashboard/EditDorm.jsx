import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditDorm = () => {
  const [dorm, setDorm] = useState({
    name: "",
    slot: "",
    price: "",
    status: "",
  });

  const { id } = useParams(); // Assuming you have a route parameter for dorm ID
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch dorm data using dorm ID when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/auth/dorm/${id}`
        );
        // Make sure the response.data has the expected structure
        setDorm(response.data[0]); // Assuming dorm data is received in the expected format
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const handelChange = (e) => {
    setDorm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/auth/dorm/${id}`, dorm);
      navigate("/dashboard/dorm");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(dorm);

  return (
    <div className="form">
      <h1>Edit Dorm</h1>
      <input
        type="text"
        placeholder="name"
        onChange={handelChange}
        name="name"
        value={dorm.name || ""}
      />
      <input
        type="number"
        placeholder="slot"
        onChange={handelChange}
        name="slot"
        value={dorm.slot || ""}
      />
      <input
        type="text"
        placeholder="price"
        onChange={handelChange}
        name="price"
        value={dorm.price || ""}
      />
      <button className="formButton" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default EditDorm;
