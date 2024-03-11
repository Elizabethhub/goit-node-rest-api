import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import ElasticEmail from "@elasticemail/elasticemail-client";

import nodemailer from "nodemailer";

import "dotenv/config";

import authRouter from "./routes/authRouter.js";
import contactsRouter from "./routes/contactsRouter.js";
///
const { UKR_NET_PASSWORD, UKR_NET_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465, //25, 2525
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  from: UKR_NET_EMAIL,
  to: "hihitah625@sfpixel.com",
  subject: "Test email",
  html: "<strong>Test email</strong>",
};

transport
  .sendMail(email)
  .then(() => console.log("Email sent successfully"))
  .catch((err) => console.log("err", err));
///
// const { ELASTICEMAIL_API_KEY, ELASTICEMAIL_FROM } = process.env;
// const defaultClient = ElasticEmail.ApiClient.instance;

// const { apikey } = defaultClient.authentications;
// apikey.apiKey = ELASTICEMAIL_API_KEY;

// const api = new ElasticEmail.EmailsApi();
// const email = ElasticEmail.EmailMessageData.constructFromObject({
//   Recipients: [new ElasticEmail.EmailRecipient("hihitah625@sfpixel.com")],
//   Content: {
//     Body: [
//       ElasticEmail.BodyPart.constructFromObject({
//         ContentType: "HTML",
//         Content: "<strong>Test email</strong>",
//       }),
//     ],
//     Subject: "Test email",
//     From: ELASTICEMAIL_FROM,
//   },
// });

// const callback = function (error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log("API called successfully.");
//   }
// };
// api.emailsPost(email, callback);
///
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { DB_HOST, PORT = 4000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
