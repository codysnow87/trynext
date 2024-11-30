import { NextApiRequest, NextApiResponse } from 'next';

// Define a type for Task
interface Task {
    id: number;
    title: string;
}

// In-memory storage for tasks (cleared when the server restarts)
let tasks: Task[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Fetch all tasks
        res.status(200).json(tasks);
    } else if (req.method === 'POST') {
        // Add a new task
        const { title } = req.body;

        if (!title) {
            res.status(400).json({ message: 'Task title is required' });
            return;
        }

        const newTask: Task = { id: tasks.length + 1, title };
        tasks.push(newTask);
        res.status(201).json(newTask);
    } else if (req.method === 'DELETE') {
        // Delete a task by ID
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ message: 'Task ID is required' });
            return;
        }

        tasks = tasks.filter(task => task.id !== id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } else {
        // Method not allowed
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}
