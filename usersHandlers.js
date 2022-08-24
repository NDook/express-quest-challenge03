const database = require("./database");

const getUser = (req, res) => {
  database
    .query("select * from users")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if(users[0]) {
        res.json(users[0]);
      } else {
        res.status(404).send("Not found");
      }
      
    })
    .catch((err) => {
      err.status(404);
    });
};

const postUser = (req, res)  => {
    const { firstname, lastname, email, city, language } = req.body;
  
    database
      .query(
        "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
        [firstname, lastname, email, city, language]
      )
      .then(([result]) => {
        console.log(result);
        res.location(`/api/users/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the user");
      });
  }

module.exports = {
  getUser,
  getUserById,
  postUser,
};
