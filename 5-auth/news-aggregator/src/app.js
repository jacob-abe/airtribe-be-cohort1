const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { PORT } = require("./config");
// Routes
const authRouter = require("./routes/auth");
const newsRouter = require("./routes/news");
const preferencesRouter = require("./routes/preferences");
// Middleware
const { authMiddleware } = require("./middleware/authMiddleware");

app.use(bodyParser.json());
app.use(authRouter);
app.use(authMiddleware, newsRouter);
app.use(authMiddleware, preferencesRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
