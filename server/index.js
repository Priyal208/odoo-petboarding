const express = require("express");
const paypal = require("paypal-rest-sdk");
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
const user = require("./routes/user.js");
const port = 3000 || process.env.PORT;
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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
app.use('/book/api/v1', booking );
app.use('/facility/api/v1', facility )
app.use('/pets/api/v1', pet)
app.use('/user/api/v1', user)

paypal.configure({
  mode: "sandbox",
  client_id:
    "AWJU3GkmBn1GCuwwBglRJ5my3tJ2UYXCiPLy5NwIryaxVT8s-s92i3fWlgV28yvGzqtB9DCnJ_Ru5Evw",
  client_secret:
    "EDXBBw4qnR6qu24H-BPall2popd9_X1UpHY-Bw1bvUcZc1c1qUZUS3lU1howT6S2qXtgdCdFR1on3ldp",
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/payment", async (req, res) => {
  try {
    let create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:3001/paymentsuccess",
        cancel_url: "http://localhost:3001/paymentfailed",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "item",
                sku: "item",
                price: "1.00",
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: "1.00",
          },
          description: "This is the payment description.",
        },
      ],
    };

    await paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        console.log(error);
        throw error;
      } else {
        console.log(payment);

        let data = payment;
        res.json(data);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/paymentsuccess", async (req, res) => {
  try {
    console.log(req.query);

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const express_checkout_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: "1.00",
          },
          description: "This is the payment description.",
        },
      ],
    };

    paypal.payment.execute(
      paymentId,
      express_checkout_json,
      function (error, payment) {
        if (error) {
          console.log(error);
          return res.redirect("http://localhost:3001/paymentfailed");
        } else {
          const response = JSON.stringify(payment);
          const ParsedResponse = JSON.parse(response);

          console.log(ParsedResponse);

          return res.redirect("http://localhost:3001/paymentsuccess");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/paymentfailed", async (req, res) => {
  return res.redirect("http://localhost:3001/paymentfailed");
});

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
