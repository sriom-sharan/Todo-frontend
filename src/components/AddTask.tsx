import React, { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ToastContainer, toast } from 'react-toastify';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Plus } from "lucide-react";
import { postData } from "@/utils/postData";

import 'react-toastify/dist/ReactToastify.css';

type FormData = {
  title: string;
  description: string;
  priority: string;
  dueDate: string; // Store as a string in YYYY-MM-DD format
};

const AddTask = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    priority: "low",
    dueDate: new Date().toISOString().split("T")[0], // Initialize as YYYY-MM-DD
  });

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const notify = () => toast("Task Created Successfully!");
  const handleSave = async () => {
    setLoading(true)
    const response = await postData("/create-task", {
      ...formData,
      dueDate: new Date(formData.dueDate), // Convert back to Date object for the backend
    });
    if(response.success){
     notify()
    }
    setLoading(false)
    console.log(response);
  };

  return (
    <Drawer>
      <DrawerTrigger className="flex w-56 text-white justify-center gap-2 items-center absolute bottom-4 right-4 bg-black">
        <span className="bg-white text-black rounded-full size-10 text-center flex justify-center items-center">
          <Plus size={22} />
        </span>
        <p className="text-white">Create a new task</p>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-2xl text-center">
            Create a new Task
          </DrawerTitle>
        </DrawerHeader>
        <div className="edit-task w-full p-4 rounded-md">
          <label htmlFor="title" className="font-medium mt-2">
            Title
          </label>
          <Input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="mb-2 p-2 border rounded w-full"
          />

          <label htmlFor="description">Description</label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="mb-2 p-2 border rounded w-full"
          />

          <label htmlFor="dueDate">Select due Date</label>
          <Input
            id="dueDate"
            type="date"
            name="dueDate"
            value={formData.dueDate} // Ensure the date is in YYYY-MM-DD format
            onChange={handleChange}
            className="mb-2 p-2 border rounded w-full"
          />

          <label htmlFor="priority">Select your task's priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mb-2 p-2 bg-white border rounded w-full"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <DrawerFooter className="flex flex-row justify-end mb-4 pr-4">
          <Button
            className="bg-primary hover:bg-blue-600 w-36"
            disabled={loading}
            onClick={handleSave}
          >
          {loading?"Creating task ...":"Create Task"} 
          </Button>
          <DrawerClose  className="p-0 w-36">
            <Button
              variant="destructive"
              className="w-full bg-secondary text-black"
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
        <ToastContainer />
    </Drawer>
  );
};

export default AddTask;
