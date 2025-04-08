const express = require('express'); 

const app = express();

app.use(express.json());

const port = 3000;

let tasks = [
    { id: 1, title: 'Tarea 1', description: 'Descripción de la tarea 1', completed: false, createdAt: '2025-04-07' },
    { id: 2, title: 'Tarea 2', description: 'Descripción de la tarea 2', completed: false, createdAt: '2025-04-07' },
    { id: 3, title: 'Tarea 3', description: 'Descripción de la tarea 3', completed: false, createdAt: '2025-04-07' },
    { id: 4, title: 'Tarea 4', description: 'Descripción de la tarea 4', completed: false, createdAt: '2025-04-07' },
    { id: 5, title: 'Tarea 5', description: 'Descripción de la tarea 5', completed: false, createdAt: '2025-04-07' },
];

app.get('/api/tasks', (req, res) => {
    try {
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
});

app.post('/api/tasks', (req, res) => {
    try {
        const { title, description, completed = false } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'El título y la descripción son obligatorios' });
        }

        const newTask = {
            id: tasks.length + 1,
            title,
            description,
            completed,
            createdAt: new Date().toISOString(),
        };

        tasks.push(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
});

app.put('/api/tasks/:id', (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const { title, description } = req.body;

        const task = tasks.find(t => t.id === taskId);

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        if (!title || !description) {
            return res.status(400).json({ message: 'El título y la descripción son obligatorios' });
        }

        task.title = title;
        task.description = description;

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
});

app.delete('/api/tasks/:id', (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        tasks.splice(taskIndex, 1);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
