const router = require("express").Router();
const apiAuth = require("../middlewares/apiAuth");

router.use("/triturar", apiAuth, require("./endpoints/triturar"));
router.use("/turner_web", apiAuth, require("./endpoints/web_prohibida"));
router.use("/fallar", apiAuth, require("./endpoints/fallar"));
router.use("/internet", apiAuth, require("./endpoints/internet"));
router.use("/obradearte", apiAuth, require("./endpoints/obradearte"));
router.use("/corazon", apiAuth, require("./endpoints/corazon"));
router.use("/bob", apiAuth, require("./endpoints/bob"));


module.exports = router;