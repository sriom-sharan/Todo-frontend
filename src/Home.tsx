import { useEffect, useState } from "react";
import Task from "./components/Task";
import { axiosInstance } from "../axiosInstance";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination";
import { useNavigate } from "react-router-dom";

type TaskType = {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: "high" | "low" | "medium";
  dueDate: string;
};

const Home = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<TaskType[]>([
    {
      _id: "",
      title: "",
      description: "",
      status: "",
      priority: "low",
      dueDate: "",
    },
  ]);

  if (localStorage.getItem("isLoggedin") != "true") {
    navigate("/signup");
  }

  const handleUpdate = (id: string, updatedTask: Partial<TaskType>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  async function getTasks() {
    setLoading(true);
    const response = await axiosInstance.get(`tasks?page=${page}&limit=10`);
    if (response.data.success) {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      const sortedTasks = response.data.tasks
        .filter((task: TaskType) => task.status !== "completed")
        .sort(
          (a: TaskType, b: TaskType) =>
            priorityOrder[a.priority] - priorityOrder[b.priority]
        );
      console.log(sortedTasks);

      setTasks(sortedTasks);
    } else if (response.data.msg === "No tasks found for this user") {
      setTasks([]);  // Clear tasks if no tasks are found
    }
    setLoading(false);
    console.log(response);
  }

  useEffect(() => {
    getTasks();
  }, [page]);

  return (
    <div className="w-full  flex flex-wrap flex-col gap-4 justify-between items-center">
      <p className="text-white text-2xl  font-medium font-serif border-b-2">
        All Tasks
      </p>
      {loading && (
        <p className="text-white animate-pulse text-xl">Getting tasks...</p>
      )}
      {!loading && tasks.length === 0 && (
        <p className="text-white text-xl">No tasks found. Create a task!</p>
      )}
      {!loading && tasks.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center">
          {tasks.map((d) => (
            <Task
              title={d.title}
              description={d.description}
              status={d.status}
              priority={d.priority}
              dueDate={d.dueDate}
              id={d._id}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setPage((prev) => prev - 1);
              }}
              href="#"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={page <= 1}
              onClick={() => {
                setPage(1);
              }}
              href="#"
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={page === 2}
              onClick={() => {
                setPage(2);
              }}
              href="#"
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={page === 3}
              onClick={() => {
                setPage(3);
              }}
              href="#"
            >
              3
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Home;
