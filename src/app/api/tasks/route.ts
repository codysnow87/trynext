import { NextResponse } from 'next/server';

// Define the in-memory storage for tasks
let tasks: { id: number; title: string }[] = [];

export async function GET() {
    return NextResponse.json(tasks); // Return all tasks
}

export async function POST(req: Request) {
    const { title } = await req.json();

    if (!title) {
        return NextResponse.json({ message: 'Task title is required' }, { status: 400 });
    }

    const newTask = { id: tasks.length + 1, title };
    tasks.push(newTask);

    return NextResponse.json(newTask, { status: 201 });
}

export async function DELETE(req: Request) {
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ message: 'Task ID is required' }, { status: 400 });
    }

    tasks = tasks.filter(task => task.id !== id);

    return NextResponse.json({ message: 'Task deleted successfully' });
}
