require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { security } = require("./security");
const authRoutes = require("./routes/auth.routes");
const portalRoutes = require("./routes/portal.routes");
const adminRoutes = require("./routes/admin.routes");
const importRoutes = require("./routes/import.routes");

const app = express();
security(app);

app.use(morgan("dev"));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/public", express.static(path.join(__dirname, "../public")));

app.use(authRoutes);
app.use(portalRoutes);
app.use(adminRoutes);
app.use(importRoutes);

app.get("/", (req, res) => res.redirect("/login"));

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`Server running: http://localhost:${port}`));
