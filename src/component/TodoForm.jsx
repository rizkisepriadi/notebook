import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { addTask, fetchCategories, updateTask } from "../database/db";
import { useSnackbar } from "notistack";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TodoForm({ action, task = null }) {
  const isEditMode = !!task;
  const [text, setText] = useState(task?.text || "");
  const [category, setCategory] = useState(task?.category || "");
  const [type, setType] = useState(task?.type || "todo");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState(task?.description || "");
  const [dateRange, setDateRange] = useState([
    task?.startDate || null,
    task?.endDate || null,
  ]);
  const { enqueueSnackbar } = useSnackbar();

  const [startDate, endDate] = dateRange;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryList = await fetchCategories();
        setCategories(categoryList);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async () => {
    if (!text.trim() || !category.trim()) {
      enqueueSnackbar("Task and Category fields are required!");
      return;
    }

    if (!startDate || !endDate) {
      enqueueSnackbar("Please select a valid date range!");
      return;
    }

    const taskData = {
      text,
      category,
      type,
      description,
      startDate,
      endDate,
    };

    try {
      if (isEditMode) {
        await updateTask(task.id, taskData);
        enqueueSnackbar("Task updated successfully!", { variant: "success" });
        setTimeout(() => {
          document.location.reload();
        }, 500);
      } else {
        await addTask(taskData);
        enqueueSnackbar("Task added successfully!", { variant: "success" });
        setTimeout(() => {
          document.location.reload();
        }, 500);
      }
      action();
    } catch (error) {
      console.error(`Failed to ${isEditMode ? "update" : "add"} task:`, error);
      enqueueSnackbar("There was an error. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <div className="bg-white w-96 h-auto py-8 px-6 flex flex-col items-center relative rounded-lg shadow-lg">
      {/* Close Button */}
      <div
        onClick={action}
        className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
      >
        <IoClose className="text-2xl" />
      </div>

      <h2 className="text-lg font-semibold mb-4">
        {isEditMode ? "Edit Task" : "Add Task"}
      </h2>

      {/* Task Input */}
      <label className="form-control w-full max-w-xs mb-4">
        <span className="label-text pb-1">Task</span>
        <input
          type="text"
          placeholder="Task name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </label>

      {/* Category Dropdown */}
      <label className="form-control w-full max-w-xs mb-4">
        <span className="label-text pb-1">Category</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      {/* Type Selector */}
      <label className="form-control w-full max-w-xs mb-4">
        <span className="label-text pb-1">Type</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </label>

      {/* Date Range Picker */}
      <label className="form-control w-full max-w-xs mb-4">
        <span className="label-text pb-1">Date Range</span>
        <DatePicker
          selected={startDate}
          onChange={(update) => setDateRange(update)}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          className="input input-bordered w-full max-w-xs"
          dateFormat="dd/MM/yyyy"
          placeholderText="Select start and end date"
        />
      </label>

      {/* Description Input */}
      <label className="form-control w-full max-w-xs mb-4">
        <span className="label-text pb-1">Description</span>
        <textarea
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="textarea textarea-bordered textarea-md w-full max-w-xs"
        ></textarea>
      </label>

      {/* Buttons */}
      <div className="flex justify-end w-full gap-2 mt-4">
        <button
          onClick={action}
          className="btn btn-outline btn-error"
          type="button"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          type="button"
        >
          {isEditMode ? "Save Changes" : "Add Task"}
        </button>
      </div>
    </div>
  );
}
