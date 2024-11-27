import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

//get student_info kèm room
router.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT sr.id, sr.createddate, sr.expiredate, si.code AS info_code, si.name AS info_name, r.number AS room_number, dl.price, dl.name AS dorm_name
  FROM student_info si
  JOIN student_room sr ON si.id = sr.info_id
  JOIN room r ON sr.room_id = r.id
  JOIN dorm_list dl ON r.dorm_id = dl.id
  WHERE si.id = ?`;
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false });
    return res.json(result);
  });
});
//get mem của room
router.get("/room/:id", (req, res) => {
  const dormId = req.params.id;
  const q = `SELECT sr.*, si.name, si.code, si.contact, room.number AS room_number
  FROM student_room sr
  JOIN student_info si ON sr.info_id = si.id
  JOIN room ON sr.room_id = room.id
  WHERE sr.room_id = (SELECT room_id FROM student_room WHERE id =  (SELECT id FROM student_room WHERE info_id = ?));
    `;
  con.query(q, [dormId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// DORM
//
//get dorm
router.get("/dorm", (req, res) => {
  const q = "SELECT * FROM dorm_list";
  con.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//get dorm id
router.get("/dorm/:id", (req, res) => {
  const dormId = req.params.id; // Assuming you want to get the dorm ID from the URL parameter
  const q =
    "SELECT r.id, r.number AS room_number, dl.name AS dorm_name, dl.price AS dorm_price, (dl.slot - COUNT(sr.id)) AS available_slot FROM room r JOIN dorm_list dl ON r.dorm_id = dl.id LEFT JOIN student_room sr ON r.id = sr.room_id WHERE dl.id = ? HAVING available_slot > 0 ORDER BY available_slot ASC;";

  con.query(q, [dormId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//post studentInfo
router.post("/form", (req, res) => {
  const q =
    "INSERT INTO rentform (`code`, `name`,`password`, `gender`,`contact`, `room_id`) VALUES (?)";
  const values = [
    req.body.code,
    req.body.name,
    req.body.password,
    req.body.gender,
    req.body.contact,
    req.body.room_id,
  ];

  con.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("studentInfo has been created");
  });
});

export { router as HomeRouter };
