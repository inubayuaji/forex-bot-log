const { Router } = require("express");
const router = Router();

const positionCtrl = require("../controllers/position");

router.get("/position", positionCtrl.index);
router.post("/position", positionCtrl.create);
router.get("/position/:ticket", positionCtrl.find);
router.post("/position/:ticket/close", positionCtrl.close);
router.get("/position/:ticket/modify", positionCtrl.indexModify);
router.post("/position/:ticket/modify", positionCtrl.createModify);

module.exports = router;
