const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);

// const sequelize = new Sequelize("mysql://root:1234@localhost/propit");

// GET missions
router.get("/missions", async function (req, res) {
  await sequelize
    .query("SELECT * FROM missions")
    .then((results, metadata) => {
      res.send(results[0]);
    });
});

// GET users
router.get("/users", async function (req, res) {
  await sequelize
    .query("SELECT * FROM accounts")
    .then((results, metadata) => {
      res.send(results[0]);
    });
});

// POST mission
router.post("/mission", async function (req, res) {

  let mission = req.body;
  let query = `INSERT INTO propit.missions VALUES 
  (null,
    ${mission.userId},
    '${mission.name}',
    '${mission.phone}',
    '${mission.email}', 
    '${mission.detail}',
    '${mission.date}'
    )`;
  await sequelize.query(query);
  res.end();
});

//DELETE mission
router.delete('/delMission', async function (req, res) {
  let event = req.body;
  let query = `DELETE FROM missions WHERE missionId = ${event.missionId}`
  await sequelize.query(query);
})

//PUT mission
router.put("/changeMission", async function (req, res) {
  let data = req.body;
  await sequelize.query(`UPDATE missions SET name = '${data.name}', phone = '${data.phone}', email = '${data.email}', detail = '${data.detail}', date = '${data.date}' WHERE missionId = ${data.missionId}`)
})


router.get("/missions/:userId", async function (req, res) {
  let { userId } = req.params;
  await sequelize
  .query(`SELECT * FROM missions WHERE userId = '${userId}'`)
  .then(function (results, metadata) {
    res.send(results[0]);
  });
});

router.get("/users/:email", async function (req, res) {
  let { email } = req.params;
  await sequelize
  .query(`SELECT * FROM accounts WHERE email = '${email}'`)
  .then(function (results, metadata) {
    res.send(results[0]);
  });
});

router.get("/user/:username", async function (req, res) {
  let { username } = req.params;
  await sequelize
  .query(`SELECT * FROM accounts WHERE username = '${username}'`)
  .then(function (results, metadata) {
    res.send(results[0]);
  });
});

//POST user
router.post("/user", async function (req, res) {
  let user = req.body;
  let query = `INSERT INTO propit.accounts VALUES 
  (null,
    '${user.username}',
    '${user.password}',
    '${user.name}', 
    '${user.email}',
    '${user.type}',
    '${user.phone}'
    )`;
  await sequelize.query(query);
  res.end();
});

//PUT user
router.put("/changeUser", async function (req, res) {
  let data = req.body;
  await sequelize.query(`UPDATE accounts SET type = '${data.type}' WHERE userId = ${data.userId}`)
})


//DELETE user
router.delete('/delUser', async function (req, res) {
  let event = req.body;
  let query = `DELETE FROM accounts WHERE userId = ${event.userId}`
  await sequelize.query(query);
})

module.exports = router;
