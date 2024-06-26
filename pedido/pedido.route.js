const express = require('express')
const router = express.Router();
const { readPedidoConFiltros, createPedido, updatePedido, deletePedido } = require("./pedido.controller");
const { respondWithError } = require('../utils/functions');
const authenticateToken = require('../middlewares/authMiddleware');

async function GetPedidos(req, res) {
    try {
        const resultadosBusqueda = await readPedidoConFiltros(req.query);

        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch(e) {
        res.status(500).json({msg: ""})
    }
}

async function PostPedido(req, res) {
    try {

        await createPedido(req.body);

        res.status(200).json({
            mensaje: "Éxito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}


async function PatchPedidos(req, res) {
    try {

        await updatePedido(req.body);

        res.status(200).json({
            mensaje: "Éxito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}


async function DeletePedidos(req, res) {
    try {

        await deletePedido(req.params.id);

        res.status(200).json({
            mensaje: "Éxito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

router.get("/", authenticateToken, GetPedidos);
router.post("/", authenticateToken, PostPedido);
router.patch("/", authenticateToken, PatchPedidos);
router.delete("/:id", authenticateToken, DeletePedidos);


module.exports = router;