const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/getAllUsers", UserController.getAllUsers);
router.post("/blockUser", UserController.blockUser);
router.post("/unblockUser", UserController.unblockUser);
router.post("/deleteUser", UserController.deleteUser);

module.exports = router;
