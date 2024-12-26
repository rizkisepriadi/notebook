/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { fetchTasks, openDB } from "../database/db";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function FullCalendarView() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const initializeDBAndLoadTasks = async () => {
      try {
        await openDB();
        const tasks = await fetchTasks();
        const formattedEvents = tasks
          .filter((task) => task.startDate && task.endDate)
          .map((task) => ({
            title: task.text || "Untitled Task",
            start: new Date(task.startDate),
            end: new Date(task.endDate),
            allDay: false,
            id: task.id,
            type: task.type,
          }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };

    initializeDBAndLoadTasks();
  }, []);

  return (
    <div className="h-screen w-full px-4">
      <h1 className="text-2xl font-bold mb-4">Calendar View</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 100px)", width: "100%" }}
        eventPropGetter={(event) => {
          console.log(event.type);
          let backgroundColor;

          switch (event.type) {
            case "todo":
              backgroundColor = "#FFA726";
              break;
            case "in-progress":
              backgroundColor = "#29B6F6";
              break;
            case "done":
              backgroundColor = "#66BB6A";
              break;
            default:
              backgroundColor = "#E0E0E0";
          }

          return {
            style: {
              backgroundColor,
              color: "white",
            },
          };
        }}
      />
    </div>
  );
}
