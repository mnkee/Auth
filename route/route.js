import { index, login, register } from "../controller/user.controller.js";
import { signUp, auth, logOut } from "../controller/auth.controller.js";
import { validateAuth } from "../middleware/validateAuth";
import express from "express"; 
let router = express.Router();

router.get("/", validateAuth, index);
router.get("/register", register);
router.get("/login", login);
router.post("/register", signUp );
router.post("/login", auth );
router.post("/logout", logOut );

 export default router; 