const express = require("express");
const router = express.Router();
const User = require("../models/User.js"); 

// Crear usuario
router.post("/create", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a user" });
    }
});

// Leer todos los usuarios
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al obtener usuarios" });
    }
});

// Actualizar usuario por ID
router.put("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al actualizar usuario" });
    }
});

// Eliminar usuario por ID
router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send({ message: "Usuario eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al eliminar usuario" });
    }
});

module.exports = router;
