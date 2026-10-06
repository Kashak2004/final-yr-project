const express = require("express");
const { generateCurriculum } = require("../controllers/curriculumController");
const router = express.Router();

router.post("/generate", generateCurriculum);

module.exports = router;
