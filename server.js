const con = require("./connection");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); //we should add this line if we want use json in our app!

// app.get("/", (req, res) => {
//   res.send("api ok!");
// });

app.get("/", (req, res) => {
  con.query("select * from student", (err, result) => {
    if (err) {
      res.send("error");
    } else {
      res.send(result);
    }
  });
});

//!!!!!!it show error!!!!
app.post("/", (req, res) => {
  const data = req.body;
  //in this way we can pass the dynamic values with postman body or we can pass the value right here as an object
  con.query("INSERT INTO student SET ?", data, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error inserting data into database");
    } else {
      res.send({ message: "Data inserted successfully", result });
    }
  });
});

//pass data as static parameters to update data in db
// app.put("/", (req, res) => {
//     //   const data = [16, "mohammad"];
//     //con.query("UPDATE student SET grade=? WHERE name=?", data, (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Error updating data in database");
//     } else {
//       res.send({ message: "Data updating successfully", result });
//     }
//   });
// });

//pass parameters with id params and for example should pass id to the url for update that stu like localhost:4200/1  that 1 is equal id.
// app.put("/:id", (req, res) => {
//   //we use params because id is located in url but for post req we should use body because of the security of post it show nothing in the url!
//   const data = [20, "mohammad", req.params.id];
//   con.query("UPDATE student SET grade=? WHERE name=?", data, (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Error updating data in database");
//     } else {
//       res.send({ message: "Data updating successfully", result });
//     }
//   });
// });

//now we want pass data in postman as dynamic front end
app.put("/:id", (req, res) => {
  //in this example we take id from params and take name or grade from body!!!
  const data = [req.body.grade, req.body.name, req.params.id];
  con.query("UPDATE student SET grade=? WHERE name=?", data, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating data in database");
    } else {
      res.send({ message: "Data updating successfully", result });
    }
  });
});

app.delete("/:id", (req, res) => {
  con.query(
    `DELETE from student WHERE id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});
app.listen(4200);
