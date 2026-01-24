const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Crear tarea
router.post('/create', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creando la tarea' });
    }
});

// Traer todas las tareas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo las tareas' });
    }
});

// Traer tarea por id
router.get('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error buscando la tarea' });
    }
});

// Marcar como completada
router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params._id,
            { completed: true },
            { new: true }
        );
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando la tarea' });
    }
});

// Actualizar solo título
router.put('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params._id,
            { title: req.body.title },
            { new: true }
        );
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando la tarea' });
    }
});

// Eliminar tarea
router.delete('/id/:_id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params._id);
        res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando la tarea' });
    }
});

module.exports = router;
