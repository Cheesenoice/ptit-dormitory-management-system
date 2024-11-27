import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", (req, res) => {
  const sql = "SELECT * FROM student_info WHERE code = ? AND password = ?";
  con.query(sql, [req.body.code, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });

    if (result.length > 0) {
      const code = result[0].code;
      const id = result[0].id;
      const token = jwt.sign(
        { role: "student", code: code, id: id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true, id: id });
    } else {
      return res.json({ loginStatus: false, Error: "wrong code or password" });
    }
  });
});

//get student_info kèm room
// router.get("/detail/:id", (req, res) => {
//   const id = req.params.id;
//   const sql = `SELECT sr.id, sr.createddate, sr.expiredate, si.code AS info_code, si.name AS info_name, r.number AS room_number, dl.price, dl.name AS dorm_name
//   FROM student_info si
//   JOIN student_room sr ON si.id = sr.info_id
//   JOIN room r ON sr.room_id = r.id
//   JOIN dorm_list dl ON r.dorm_id = dl.id
//   WHERE si.id = ?`;
//   con.query(sql, [id], (err, result) => {
//     if (err) return res.json({ Status: false });
//     return res.json(result);
//   });
// });
//get info student
router.get("/detail/:id", (req, res) => {
  const dormId = req.params.id;
  const q = `SELECT * FROM student_info WHERE id = ?;`;
  con.query(q, [dormId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//get mem của room
router.get("/room/:id", (req, res) => {
  const dormId = req.params.id;
  const q = `SELECT
  sr.*,
  si.name,
  si.code,
  si.contact,
  room.number AS room_number,
  dorm_list.price
FROM
  student_room sr
JOIN
  student_info si ON sr.info_id = si.id
JOIN
  room ON sr.room_id = room.id
JOIN
  dorm_list ON dorm_list.id = room.dorm_id 
WHERE
  sr.room_id = (SELECT room_id FROM student_room WHERE id = (SELECT id FROM student_room WHERE info_id = ?)); 
 `;
  con.query(q, [dormId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//get history
router.get("/history/:id", (req, res) => {
  const dormId = req.params.id;
  const q = `SELECT *
  FROM renewal
  WHERE contract_id = (SELECT id FROM student_room WHERE info_id = ?)
  ORDER BY createddate DESC;
    `;
  con.query(q, [dormId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as StudentRouter };
