"use client";

import { useState, useEffect } from "react";
import { SchedulerProvider, SchedularView } from "mina-scheduler";

// Helper function to generate recurring events indefinitely
const generateRecurringEvents = (baseEvent, days) => {
  const events = [];
  const now = new Date();
  const yearsToGenerate = 5; // Generate events for the next 5 years
  const endOfSchedule = new Date(now.getFullYear() + yearsToGenerate, 11, 31); // Arbitrary future date for demonstration

  for (let date = new Date(now); date <= endOfSchedule; date.setDate(date.getDate() + 1)) {
    if (days.includes(date.getDay())) {
      const eventStart = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        ...baseEvent.startTime.split(":").map(Number)
      );
      const eventEnd = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        ...baseEvent.endTime.split(":").map(Number)
      );

      events.push({
        id: `${baseEvent.id}-${date.toISOString()}`,
        title: baseEvent.title,
        description: baseEvent.description,
        startDate: eventStart,
        endDate: eventEnd,
        variant: baseEvent.variant,
      });
    }
  }
  return events;
};

// Initial event templates and recurrence rules
const eventTemplates = [
  {
    id: "the-root-cellar-1",
    title: "The Root Cellar",
    description: "Foundational Beginner",
    startTime: "10:00",
    endTime: "12:00",
    variant: "success",
    days: [2, 4],
  },
  {
    id: "the-root-cellar-2",
    title: "The Root Cellar",
    description: "Advanced Beginner",
    startTime: "10:00",
    endTime: "12:00",
    variant: "success",
    days: [2, 4],
  },
  {
    id: "in-her-presence-1",
    title: "In Her Presence",
    description: "Beginner Online – Women",
    startTime: "10:30",
    endTime: "12:30",
    variant: "secondary",
    days: [2, 4, 5],
  },
  {
    id: "in-her-presence-2",
    title: "In Her Presence",
    description: "Beginner Online – Women",
    startTime: "13:00",
    endTime: "15:00",
    variant: "secondary",
    days: [1, 3, 5],
  },
  {
    id: "in-her-presence-3",
    title: "In Her Presence",
    description: "Beginner Online – Mixed",
    startTime: "12:30",
    endTime: "14:30",
    variant: "secondary",
    days: [2, 4, 5],
  },
  {
    id: "in-her-presence-4",
    title: "In Her Presence",
    description: "Beginner @SMCC",
    startTime: "17:30",
    endTime: "19:00",
    variant: "secondary",
    days: [1, 3, 4],
  },
  {
    id: "in-her-presence-5",
    title: "In Her Presence",
    description: "Beginner @Saco Hotel",
    startTime: "17:30",
    endTime: "19:00",
    variant: "secondary",
    days: [2],
  },
  {
    id: "in-her-presence-6",
    title: "In Her Presence",
    description: "Beginner @Saco Hotel",
    startTime: "10:30",
    endTime: "12:00",
    variant: "secondary",
    days: [6],
  },
  {
    id: "in-her-presence-6",
    title: "In Her Presence",
    description: "Beginner @Riverside Shelter",
    startTime: "10:00",
    endTime: "12:00",
    variant: "secondary",
    days: [2, 6],
  },
  {
    id: "in-her-presence-7",
    title: "In Her Presence",
    description: "Intermediate Online – Women",
    startTime: "10:00",
    endTime: "12:00",
    variant: "secondary",
    days: [2, 4, 5],
  },
  {
    id: "in-her-presence-8",
    title: "In Her Presence",
    description: "High-Intermediate",
    startTime: "09:30",
    endTime: "11:30",
    variant: "secondary",
    days: [2, 4, 5],
  },
  {
    id: "in-her-presence-9",
    title: "In Her Presence",
    description: "English for Career Success",
    startTime: "10:00",
    endTime: "12:00",
    variant: "secondary",
    days: [5],
  },
  {
    id: "in-her-presence-10",
    title: "In Her Presence",
    description: "Workforce Development",
    startTime: "18:00",
    endTime: "20:00",
    variant: "secondary",
    days: [3],
  },
  {
    id: "in-her-presence-11",
    title: "In Her Presence",
    description: "Pronunciation and Conversation",
    startTime: "17:30",
    endTime: "19:00",
    variant: "secondary",
    days: [2, 4],
  },
  {
    id: "in-her-presence-12",
    title: "In Her Presence",
    description: "Public Speaking @SMCC",
    startTime: "17:30",
    endTime: "19:00",
    variant: "secondary",
    days: [2],
  },
  {
    id: "hope-acts-1",
    title: "Hope Acts",
    description: "Basic Beginner (WhatsApp)",
    startTime: "09:30",
    endTime: "11:00",
    variant: "warning",
    days: [1, 3],
  },
  {
    id: "hope-acts-2",
    title: "Hope Acts",
    description: "Advanced Beginner (Zoom)",
    startTime: "09:30",
    endTime: "11:30",
    variant: "warning",
    days: [1],
  },
  {
    id: "hope-acts-3",
    title: "Hope Acts",
    description: "Advanced Beginner (WhatsApp)",
    startTime: "09:30",
    endTime: "11:30",
    variant: "warning",
    days: [3],
  },
  {
    id: "hope-acts-4",
    title: "Hope Acts",
    description: "Intermediate (Zoom)",
    startTime: "10:00",
    endTime: "12:00",
    variant: "warning",
    days: [2, 4],
  },
  {
    id: "the-salvation-army-1",
    title: "The Salvation Army",
    description: "ESL Beginner Class",
    startTime: "09:30",
    endTime: "11:30",
    variant: "danger",
    days: [2, 4, 5],
  },
  {
    id: "the-salvation-army-2",
    title: "The Salvation Army",
    description: "ESL Intermediate Class",
    startTime: "12:30",
    endTime: "14:30",
    variant: "danger",
    days: [2, 4, 5],
  },
  {
    id: "the-greater-portland-immigrant-welcome-center-1",
    title: "The Greater Portland Immigrant Welcome Center",
    description: "English Conversation Classes (placement test). ",
    startTime: "10:30",
    endTime: "11:30",
    variant: "primary",
    days: [1],
  }
];

export default function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const allEvents = eventTemplates.flatMap((template) =>
      generateRecurringEvents(template, template.days)
    );
    setEvents(allEvents);
  }, []);

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 py-8 md:py-10">
      <SchedulerProvider initialState={events} weekStartsOn="monday">
        <SchedularView />
      </SchedulerProvider>
    </section>
  );
}

// "use client";

// import { SchedulerProvider, SchedularView } from "mina-scheduler";

// export default function Calendar() {
//   return (
//     <section className="flex w-full flex-col items-center justify-center gap-4 py-8 md:py-10">
//       <SchedulerProvider>
//         <SchedularView />
//       </SchedulerProvider>
//     </section>
//   );
// }