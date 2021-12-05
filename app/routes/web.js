const { Router } = require("express");
const router = Router();
const page = require("../controllers/page.js");

router.get("/", page.historyOrder);
router.get("/open-position", page.openPosition);
router.get("/position/:ticket", page.detailPosition);

module.exports = router;
