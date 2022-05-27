const express = require("express");
const cookieparser = require("cookie-parser");
require("./utils/db");
const cors = require("cors");
const RoomRouter = require("./routes/RoomRouter");
const UserRouter = require("./routes/UserRouter");

const app = express();
app.use(cookieparser());
const port = process.env.PORT || 3000;
app.use(cors(
    {
        origin : "*",
        methods : ["POST" ,"GET","DELETE" ,"PATCH"]
    }
))

app.use(express.json());
app.use(UserRouter);
app.use(RoomRouter);
app.get('/',(req,res)=>{
    res.send('Hello')
})
app.listen(port, () => {
  console.log("App started");
});
