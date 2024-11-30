'use client'

import { useEffect, useState } from 'react'

export default function TimeDisplay() {
    const [time, setTime] = useState<string>('')

    useEffect(() => {
        const eventSource = new EventSource('/api/sse')

        eventSource.onmessage = (event) => {
            setTime(event.data)
        }

        return () => {
            eventSource.close()
        }
    }, [])

    return (
        <div className="p-4 bg-gray-100 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Current Time (SSE):</h2>
            <p className="text-2xl font-mono">{time}</p>
        </div>
    )
}