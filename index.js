const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require("./Modules/User");
const user = require("./routes/user")

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB connected successfully"))
.catch((err) => console.log(err));

app.use(express.json({ limit: '124kb' }));
app.use(
  express.urlencoded({
    extended: false,
    limit: '124kb',
  })
);
app.use("/user", userRouter);
app.use("/api", user);
app.listen(process.env.PORT || 5000, () => console.log(`Server running on port: 5000`));
console.log("hi timmy233");