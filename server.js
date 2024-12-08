const express = require("express");
const app = express();
const cors = require("cors");
const tutorials = require("./app/routes/tutorial.routes");
const corsOptions = {
    origin :"http://localhost:8081"
};

//getting the request body 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/tutorials",tutorials);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tutorials  application." });
});
const PORT =8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});