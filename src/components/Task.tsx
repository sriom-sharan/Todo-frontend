import { useState } from "react";
import "react-edit-text/dist/index.css";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { putData } from "@/utils/postData";
import { Link } from "react-router-dom";

type TaskProps = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: "high" | "low" | "medium";
  dueDate: string;

  onUpdate: (id: string, updatedTask: Partial<TaskProps>) => void;
};

const Task = (props: TaskProps) => {
  const { id, title, description, status, priority, onUpdate, dueDate } = props;
  let due = dueDate.split("T");
  const dueDay = due[0];
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title,
    description,
    priority,
    status,
  });

  let colorPriority = "bg-yellow-300";
  if (priority === "high") {
    colorPriority = "bg-red-400";
  } else if (priority === "low") {
    colorPriority = "bg-green-400";
  }

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const response = await putData(`/tasks/${props.id}`, formData);
    console.log(response);

    onUpdate(id, formData);
    setIsEditing(false);
  };
  const handleStatusChange = async () => {
    try {
      const updatedTask = { status: "completed" };
      await putData(`/tasks/${id}`, updatedTask); // Send the update to the backend
      onUpdate(id, updatedTask); // Notify parent about the status change
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  if (isEditing) {
    // Render Edit UI
    return (
      <div className="edit-task w-80 bg-gray-200 p-4 h-56 rounded-md">
        <label className="text-sm">Title</label>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="mb-2 p-2 border rounded w-full"
        />
        <label className="text-sm">Description</label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="mb-2 p-2 border h-5 rounded w-full"
        />

        <div className="flex justify-between gap-2">
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mb-2 p-2  bg-white border rounded w-1/3 float-left"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="flex justify-center gap-2 items-center">
            <Button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render View UI
  return (
    <div

      className={`task flex ${
        status === "completed" ? "hidden" : "opacity-100"
      } p-2 py-4 gap-2 border rounded-md text-black bg-white w-96 `}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-xl capitalize">{title}</h3>
        </div>
        <p className="capitalize  truncate pr-2">{description}</p>
        <span className="w-full flex gap-2 font-semibold">
          Priority-
          <span
            className={`priority-badge ${colorPriority} text-sm w-min px-2 capitalize `}
          >
            {priority}
          </span>
        </span>
        <span className="w-full flex gap-2 font-semibold">
          Due Date-
          <span className={`priority-badge  text-sm w-min px-2 capitalize `}>
            {dueDay}
          </span>
        </span>
        <div className="flex justify-end gap-2 mt-2">
          <Link
            to={`task-detail/${id}`}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            View
          </Link>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-black- text-white rounded"
          >
            Edit
          </button>
          <Button
            onClick={handleStatusChange}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Task;
