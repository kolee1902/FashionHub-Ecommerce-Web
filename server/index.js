const express = require("express");
const cors = require("cors")
const app = express();
const routers = require('./routers/Posts.js');
app.use(express.json());

const db = require('./models');

app.use(cors());
app.use('/api', routers);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});