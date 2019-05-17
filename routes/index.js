// this file collects the other routes and provides the endpoint names
const router = require("express").Router();
const authRoutes = require("./auth-routes");
const profileRoutes = require("./profile-routes");
const apiRoutes = require("./api-routes");

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/api", apiRoutes);

module.exports = router;