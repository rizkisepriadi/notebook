import { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { deleteTask, updateTask } from "../database/db";
import TodoForm from "./TodoForm";
import { useSnackbar } from "notistack";
import { OptionsButton } from "./Button.module";

export default function Card({
  title,
  description,
  category,
  id,
  type,
  startDate,
  endDate,
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask(id);
      enqueueSnackbar("Task deleted successfully!", {
        variant: "success",
        autoHideDuration: 500,
      });
      setTimeout(() => {
        document.location.reload();
      }, 500);
    } catch (error) {
      console.error("Failed to delete task:", error);
      enqueueSnackbar("Failed to delete task. Please try again.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const handleMove = async (newType) => {
    try {
      await updateTask(id, { type: newType });
      enqueueSnackbar(`Task moved to ${newType} successfully!`, {
        variant: "success",
        autoHideDuration: 3000,
      });
      setTimeout(() => {
        document.location.reload();
      }, 500);
    } catch (error) {
      console.error("Failed to move task:", error);
      enqueueSnackbar("Failed to move task. Please try again.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return isUpdating ? (
    <TodoForm
      action={() => setIsUpdating(false)}
      task={{ id, text: title, category, description, type }}
    />
  ) : (
    <div className="card text-primary-content bg-base-300 w-full rounded-lg">
      <div className="card-body p-4">
        <div className="flex justify-between items-center gap-2">
          <div className="badge badge-primary p-3 bg-primary bg-opacity-40 badge-outline">
            <h1 className="text-black">{category}</h1>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <SlOptionsVertical />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box px-5 py-4 z-[1] shadow"
            >
              <li>
                <OptionsButton
                  action={() => setIsUpdating(true)}
                  name={"Update"}
                />
              </li>
              <li>
                <OptionsButton action={handleDelete} name={"Delete"} />
              </li>
              {type === "todo" && (
                <li>
                  <OptionsButton
                    action={() => handleMove("in-progress")}
                    name={"In Progress"}
                  />
                </li>
              )}
              {type === "in-progress" && (
                <li>
                  <OptionsButton
                    action={() => handleMove("done")}
                    name={"Done"}
                  />
                </li>
              )}
            </ul>
          </div>
        </div>
        <h2 className="card-title font-medium">{title}</h2>
        <div className="text-sm">
          Date : {startDate} - {endDate}
        </div>
        <p className="font-light">{description}</p>
      </div>
    </div>
  );
}
