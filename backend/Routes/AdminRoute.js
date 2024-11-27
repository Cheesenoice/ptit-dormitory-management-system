import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
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
// get dorm by id
router.get("/dorm/:id", (req, res) => {
  const dormId = req.params.id;
  const q = "SELECT * FROM dorm_list WHERE id = ?";
  con.query(q, [dormId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//post dorm
router.post("/dorm", (req, res) => {
  const q =
    "INSERT INTO dorm_list (`name`, `slot`,`price`, `status`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.slot,
    req.body.price,
    req.body.status,
  ];

  con.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Dorm has been created");
  });
});
//delte dorm
router.delete("/dorm/:id", (req, res) => {
  const dormId = req.params.id;
  const q = "DELETE FROM dorm_list WHERE id = ?";

  con.query(q, [dormId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Dorm has been deleted");
  });
});
//edit dorm nhưng chưa dùng
router.put("/dorm/:id", (req, res) => {
  const dormId = req.params.id;
  const q =
    "UPDATE dorm_list SET `name`=?, `slot`=?,`price`=?, `status`=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.slot,
    req.body.price,
    req.body.status,
  ];

  con.query(q, [...values, dormId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Dorm has been updated");
  });
});

//ROOM
//
// get room kèm dorm
router.get("/room", (req, res) => {
  const q =
    "SELECT r.water,r.elec,r.id AS id, r.number AS room_number, dl.name AS dorm_name, dl.price AS dorm_price, (dl.slot - COUNT(sr.id)) AS available_slot FROM room r JOIN dorm_list dl ON r.dorm_id = dl.id LEFT JOIN student_room sr ON r.id = sr.room_id GROUP BY r.id, dl.id ORDER BY `room_number` ASC;";
  con.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//post room
router.post("/room", (req, res) => {
  const q = "INSERT INTO room (`number`, `dorm_id`) VALUES (?)";
  const values = [req.body.number, req.body.dorm_id];

  con.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Room has been created");
  });
});
//delete room
router.delete("/room/:id", (req, res) => {
  const roomId = req.params.id;
  const q = "DELETE FROM room WHERE id = ?";

  con.query(q, [roomId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Room has been deleted");
  });
});

// student
//
//get studentInfo
router.get("/studentInfo", (req, res) => {
  const q = "SELECT * FROM student_info";
  con.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//get studentInfo where status=1
router.get("/studentInfo_status1", (req, res) => {
  const q = "SELECT * FROM student_info WHERE student_info.status = 1";
  con.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//post studentInfo
router.post("/studentInfo", (req, res) => {
  const q =
    "INSERT INTO student_info (`code`, `name`,`password`, `gender`,`contact`) VALUES (?)";
  const values = [
    req.body.code,
    req.body.name,
    req.body.password,
    req.body.gender,
    req.body.contact,
  ];

  con.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("studentInfo has been created");
  });
});
//delete studentInfo
router.delete("/studentInfo/:id", (req, res) => {
  const dormId = req.params.id;
  const q = "DELETE FROM student_info WHERE id = ?";

  con.query(q, [dormId], (err, data) => {
    if (err) return res.json(err);
    return res.json("studentInfo has been deleted");
  });
});

// student room
//
//get student chưa có room
router.get("/studentnoRoom", (req, res) => {
  const q =
    "SELECT student_info.id,student_info.code , student_info.name FROM student_info LEFT JOIN student_room ON student_info.id = student_room.info_id WHERE student_room.info_id IS NULL;";
  con.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//get room còn giường
router.get("/availableroom", (req, res) => {
  const q =
    "SELECT r.id, r.number AS room_number, dl.name AS dorm_name, dl.price AS dorm_price, (dl.slot - COUNT(sr.id)) AS available_slot FROM room r JOIN dorm_list dl ON r.dorm_id = dl.id LEFT JOIN student_room sr ON r.id = sr.room_id GROUP BY r.id, dl.id HAVING available_slot > 0 ORDER BY `available_slot` ASC;";
  con.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//get room het giường
router.get("/notavailableroom", (req, res) => {
  const q =
    "SELECT r.id, r.number AS room_number, dl.name AS dorm_name, dl.price AS dorm_price, (dl.slot - COUNT(sr.id)) AS available_slot FROM room r JOIN dorm_list dl ON r.dorm_id = dl.id LEFT JOIN student_room sr ON r.id = sr.room_id GROUP BY r.id, dl.id HAVING available_slot = 0 ORDER BY `available_slot` ASC;";
  con.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//get student_info kèm room
router.get("/studentroom", (req, res) => {
  const q =
    "SELECT sr.id, sr.createddate, sr.expiredate, si.code AS info_code, si.name AS info_name, r.number AS room_number, dl.price, dl.name AS dorm_name FROM student_info si JOIN student_room sr ON si.id = sr.info_id JOIN room r ON sr.room_id = r.id JOIN dorm_list dl ON r.dorm_id = dl.id;";
  con.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//get student_info kèm room và hết hạn
router.get("/expire", (req, res) => {
  const q =
    "SELECT sr.id, sr.createddate, sr.expiredate, si.code AS info_code, si.name AS info_name, r.number AS room_number, dl.price, dl.name AS dorm_name FROM student_info si JOIN student_room sr ON si.id = sr.info_id JOIN room r ON sr.room_id = r.id JOIN dorm_list dl ON r.dorm_id = dl.id WHERE sr.expiredate < CURDATE();";
  con.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//post studentRoom and update
router.post("/studentRoom", (req, res) => {
  const studentRoomQuery =
    "INSERT INTO student_room (`info_id`, `room_id`, `month`) VALUES (?)";
  const studentRoomValues = [
    req.body.info_id,
    req.body.room_id,
    req.body.month,
  ];

  con.query(studentRoomQuery, [studentRoomValues], (err, studentRoomResult) => {
    if (err) {
      return res.json(err);
    }

    const newRecordId = studentRoomResult.insertId;

    // Update expiredate based on the newly inserted record
    const updateExpireDateQuery = `
      UPDATE student_room
      SET expiredate = DATE_ADD(NOW(), INTERVAL ? MONTH)
      WHERE id = ?
    `;

    const updateExpireDateValues = [req.body.month, newRecordId];

    con.query(
      updateExpireDateQuery,
      updateExpireDateValues,
      (updateExpireDateErr) => {
        if (updateExpireDateErr) {
          return res.json(updateExpireDateErr);
        }

        // Insert into renewal table
        const renewalQuery =
          "INSERT INTO renewal (`contract_id`, `month`) VALUES (?)";
        const renewalValues = [newRecordId, req.body.month];

        con.query(
          renewalQuery,
          [renewalValues],
          (renewalErr, renewalResult) => {
            if (renewalErr) {
              return res.json(renewalErr);
            }

            const renewalRecordId = renewalResult.insertId;

            // Update renewaldate based on the newly inserted record in the renewal table
            const updateRenewalDateQuery = `
          UPDATE renewal
          SET renewaldate = DATE_ADD(NOW(), INTERVAL ? MONTH)
          WHERE id = ?
        `;

            const updateRenewalDateValues = [req.body.month, renewalRecordId];

            con.query(
              updateRenewalDateQuery,
              updateRenewalDateValues,
              (updateRenewalDateErr) => {
                if (updateRenewalDateErr) {
                  return res.json(updateRenewalDateErr);
                }

                return res.json(
                  "studentRoom has been created, expiredate, and renewaldate updated"
                );
              }
            );
          }
        );
      }
    );
  });
});

//post renew và lưu ngày
router.post("/renew/:id", (req, res) => {
  const q = "INSERT INTO renewal (`contract_id`, `month`) VALUES (?)";
  const values = [req.params.id, req.body.month];

  con.query(q, [values], (err, result) => {
    if (err) {
      return res.json(err);
    }

    const newRecordId = result.insertId;

    // Update expiredate in renewal table based on the newly inserted record
    const updateRenewalQuery = `
      UPDATE renewal
      SET renewaldate = DATE_ADD(NOW(), INTERVAL ? MONTH)
      WHERE id = ?
    `;

    const updateRenewalValues = [req.body.month, newRecordId];

    con.query(updateRenewalQuery, updateRenewalValues, (updateRenewalErr) => {
      if (updateRenewalErr) {
        return res.json(updateRenewalErr);
      }

      // Update expiredate in student_room table based on the newly inserted record
      const updateStudentRoomQuery = `
        UPDATE student_room
        SET expiredate = DATE_ADD(NOW(), INTERVAL ? MONTH)
        WHERE id = ?
      `;

      const updateStudentRoomValues = [req.body.month, req.params.id];

      con.query(
        updateStudentRoomQuery,
        updateStudentRoomValues,
        (updateStudentRoomErr) => {
          if (updateStudentRoomErr) {
            return res.json(updateStudentRoomErr);
          }

          return res.json(
            "studentRoom has been created and expiredate updated"
          );
        }
      );
    });
  });
});

//delete studentroom
router.delete("/studentRoom/:id", (req, res) => {
  const dormId = req.params.id;
  const q = "DELETE FROM student_room WHERE id = ?";

  con.query(q, [dormId], (err, data) => {
    if (err) return res.json(err);
    return res.json("studentRoom has been deleted");
  });
});

//get mem của room
router.get("/room/:id", (req, res) => {
  const dormId = req.params.id;
  const q =
    "SELECT sr.*, si.name, si.code, si.contact, room.number AS room_number FROM student_room sr JOIN student_info si ON sr.info_id = si.id JOIN room ON sr.room_id = room.id WHERE sr.room_id = ?";

  con.query(q, [dormId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//get history
router.get("/history/:id", (req, res) => {
  const dormId = req.params.id;
  const q = `SELECT * FROM renewal WHERE contract_id = ? ORDER BY createddate DESC;
    `;
  con.query(q, [dormId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//get student_info kèm room và hết hạn
router.get("/rentform", (req, res) => {
  const q = "SELECT * FROM rentform;";
  con.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//delete rentform
router.delete("/rentform/:id", (req, res) => {
  const dormId = req.params.id;
  const q = "DELETE FROM rentform WHERE id = ?";

  con.query(q, [dormId], (err, data) => {
    if (err) return res.json(err);
    return res.json("studentRoom has been deleted");
  });
});
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as AdminRouter };
