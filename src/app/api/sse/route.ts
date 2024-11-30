import { NextResponse } from 'next/server';

export async function GET() {
    const readableStream = new ReadableStream({
        start(controller) {
            const interval = setInterval(() => {
                controller.enqueue(new TextEncoder().encode(`data: ${new Date().toISOString()}\n\n`));
            }, 1000);

            controller.close = () => {
                clearInterval(interval);
            };
        }
    });

    const res = new NextResponse(readableStream);
    res.headers.set('Content-Type', 'text/event-stream');
    res.headers.set('Cache-Control', 'no-cache');
    res.headers.set('Connection', 'keep-alive');

    return res;
}
