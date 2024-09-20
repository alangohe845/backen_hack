
const express = require("express");
const router = express.Router();
const {getRespuestas, getRespuesta, createRespuesta, updateRespuesta, deleteRespuesta} = require('../controllers/respuestas.js');


router.get('/', getRespuestas);
router.get("/:id_user", getRespuesta);

router.post("/:id_user", createRespuesta);

// update a product
router.put("/:id", updateRespuesta);

// delete a product
router.delete("/:id", deleteRespuesta);




module.exports = router;
