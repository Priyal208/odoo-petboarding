const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("./config/passport.js");
const error = require("./utils/error.js");
const localAuth = require("./routes/localAuth.js");
const booking = require('./routes/booking.js')
const facility = require('./routes/facility.js')
const pet = require('./routes/pets.js')
//const cron = require("node-cron");
const port = 3000 || process.env.PORT;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://meghprajapati009:hello123@cluster0.jq910sn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 week
    rolling: true, //redefining cookie age
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./utils/capacityAdjustment.js");

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/auth/api/v1", localAuth);
app.use('/routes/api/v1', booking );
app.use('/routes/api/v1', facility )

app.use(error);

mongoose
  .connect(
    "mongodb+srv://meghprajapati009:hello123@cluster0.jq910sn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err) => {
    console.log(err);
  });
