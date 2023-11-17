const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const Port = process.env.PORT;
app.set("trust proxy", true);

const visitedClients  = new Set()

app.get("/client", (req, res) => {
  const clientIP = req.ip; // Extract client IP address
  const userAgent = req.get("user-agent"); // Extract user agent

  // Create a unique identifier for the client based on IP and user agent
  const clientIdentifier = `${clientIP}-${userAgent}`;

  // Check if the client has already visited
  if (visitedClients.has(clientIdentifier)) {
    console.log("Duplicate visit from the same client. Ignoring.");
    return res.status(200).send("Duplicate visit");
  }

  // If not visited, record the visit and add the client to the set
  visitedClients.add(clientIdentifier);

  // Your logic to store currentURL and referralSource in the database or do whatever you want
  console.log("URL visit recorded successfully.");
  console.log("Client IP:", clientIP);
  console.log("User Agent:", userAgent);

  res.status(200).json({message:"URL visit recorded successfully.",ip:clientIP,user:userAgent});
});

app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});
