import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import { welcome } from "./controllers/welcome.js";

const app = express();
dotenv.config();

// This line adds middleware to the Express application (app), specifically the body-parser middleware.
// body-parser is a middleware that helps in parsing the request body of incoming HTTP requests.
// The json() method of body-parser is used here. It instructs the middleware to parse incoming request bodies as JSON.
// { limit: "30mb", extended: true } are options passed to the json() method:
// limit: "30mb" specifies the maximum request body size to 30 megabytes. This is used to prevent overly large requests from consuming too many server resources.
// extended: true allows for complex, nested JSON objects to be parsed.
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// This line is similar to the first one but deals with URL-encoded form data. It adds another instance of the body-parser middleware, this time configured to parse URL-encoded data.
// { limit: "30mb", extended: true } are the same options as in the previous line, specifying a maximum request body size and enabling parsing of complex objects.
// app.use(cors());

// This line adds the cors middleware to your Express application.
// CORS stands for Cross-Origin Resource Sharing, and it is a security feature implemented in web browsers. CORS restricts web pages from making requests to a different domain than the one that served the web page. The cors middleware helps configure the server to allow or restrict cross-origin HTTP requests.
// By using app.use(cors()), you are enabling Cross-Origin Resource Sharing and allowing your server to respond to requests from different domains. This is often required when your server serves data to a web application running on a different domain.

app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get("/", welcome);
app.use("/posts", postRoutes);

app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

// This option is set to true to enable the new URL parser. In older versions of MongoDB, the connection URL had a different format, and setting this option to true ensures that Mongoose uses the updated URL parser to parse the connection string correctly. This option is required for more recent versions of MongoDB.
// useUnifiedTopology: true,
// This option is set to true to enable the unified topology. Unified topology is a new way of managing connections to MongoDB servers. It's recommended to set this option to true for modern MongoDB versions.

console.log(process.env.CONNECTION_URL);
mongoose
    .connect(process.env.CONNECTION_URL, {})
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    )
    .catch((error) => console.log(error.message));
