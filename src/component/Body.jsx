import { format } from "date-fns";
import { useEffect, useState } from "react";
import { fetchTasks, openDB } from "../database/db";
import AddButton from "./Button.module";
import Card from "./Card";
import TableTask from "./TableTask";
import TodoForm from "./TodoForm";

export default function Body() {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const initializeDB = async () => {
      try {
        await openDB();
        setTasks(await fetchTasks());
      } catch (error) {
        console.error("Failed to initialize DB or fetch tasks:", error);
      }
    };
    initializeDB();
  }, []);

  const taskSections = [
    { name: "To do", type: "todo", color: "" },
    { name: "In Progress", type: "in-progress", color: "bg-warning" },
    { name: "Done", type: "done", color: "bg-error" },
  ];

  return (
    <>
      <div className="mx-[2%] pt-4 gap-4 flex">
        {taskSections.map(({ name, type, color }) => {
          const filteredTasks = tasks.filter((task) => task.type === type);
          return (
            <div key={type} className="flex-1">
              <div className="flex flex-col gap-2">
                <TableTask
                  name={name}
                  count={filteredTasks.length}
                  color={color}
                />
                <AddButton action={() => setIsAddingTask(true)} />
                {filteredTasks.map((task) => (
                  <Card
                    key={task.id}
                    id={task.id}
                    title={task.text}
                    description={task.description}
                    category={task.category}
                    type={task.type}
                    startDate={format(task.startDate, "dd-MM-yyyy")}
                    endDate={format(task.endDate, "dd-MM-yyyy")}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {isAddingTask && (
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <TodoForm action={() => setIsAddingTask(false)} />
        </div>
      )}
    </>
  );
}
