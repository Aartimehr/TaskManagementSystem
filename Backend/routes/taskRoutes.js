const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Task = require('../models/Task'); 

// THE PROTECT MIDDLEWARE (Extracts req.user.id)
const protect = (req, res, next) => {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer')) {
        try {
            token = token.split(' ')[1]; // Remove 'Bearer' prefix
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // This creates the req.user.id you need!
            req.user = decoded; 
            next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
};

// GET ALL TASKS (Filtered by req.user.id)
router.get('/', protect, async (req, res) => {
    try {
        // Only fetch tasks belonging to the logged-in user
        const tasks = await Task.findAll({ where: { UserId: req.user.id } });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// CREATE NEW TASK (Assigned to req.user.id)
router.post('/', protect, async (req, res) => {
    try {
        const { title, description, scheduledTime } = req.body;
        const newTask = await Task.create({
            title,
            description,
            scheduledTime,
            status: 'pending',
            UserId: req.user.id // Links task to the user from the token
        });
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: "Could not create task" });
    }
});

// UPDATE TASK STATUS (Complete/Undo)
router.put('/:id', protect, async (req, res) => {
    try {
        const { status } = req.body;
        await Task.update({ status }, { 
            where: { id: req.params.id, UserId: req.user.id } 
        });
        res.json({ message: "Task updated" });
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
});

module.exports = router;