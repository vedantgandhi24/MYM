const app = require("express")();
// const { v4 } = require("uuid");

app.use(cors());

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Define routes
app.use("/api/users", require("./routes/users"));

app.get("/test", (req, res) => {
	res.send("WELCOME!!!");
});

module.exports = app;
