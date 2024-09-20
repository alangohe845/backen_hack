
const express = require("express");
const router = express.Router();
const {getRespuestas, getRespuesta, createRespuesta, updateRespuesta, deleteRespuesta} = require('../controllers/respuestas.js');


router.get('/', getRespuestas);
router.get("/:id", getRespuesta);

router.post("/", createRespuesta);

// update a product
router.put("/:id", updateRespuesta);

// delete a product
router.delete("/:id", deleteRespuesta);




module.exports = router;
