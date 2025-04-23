import config from "@/config";
import { Router } from "express";

const router = Router();

// register endpoints here
// router.use(config.api.prefix, require("./auth.route"));
// router.use(config.api.prefix, require("./user.route"));

// register docs route here if any

// default route
router.get(`${config.api.prefix}/ping`, (req, res) => {
  res.status(200).json({ success: true, message: "pong" });
});
router.get("/", (req, res) => {
  res.send(`Welcome to ${config.api.name}`);
});

const routes = router;
export { routes };
