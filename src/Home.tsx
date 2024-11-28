import { useEffect, useState } from "react";
import Task from "./components/Task";
import { axiosInstance } from "../axiosInstance";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination";

type TaskType = {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
};

const Home = () => {
  const [page, setPage] = useState(1)
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      _id: "",
      title: "",
      description: "",
      status: "",
      priority: "",
    },
  ]);
  const handleUpdate = (id: string, updatedTask: Partial<TaskType>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  async function getTasks() {
    const response = await axiosInstance.get(`tasks?page=${page}&limit=10`);
    if (response.data.success) {
      setTasks(response.data.tasks);
    } else if (response.data.msg == "No tasks found for this user") {
    }
    console.log(response);
  }

  useEffect(() => {
    getTasks();
  }, [page]);

  return (
    <div className="w-full h-screen flex flex-wrap  gap-4 justify-center items-center">
      <div className="flex flex-wrap gap-4 justify-center">

      {tasks.map((d) => (
        <Task
        title={d.title}
        description={d.description}
        status={d.status}
        priority={d.priority}
        id={d._id}
        onUpdate={handleUpdate}
        />
      ))}
      </div>
     <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={()=>{setPage((prev)=>(prev-1))}}  href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive={page<=1} onClick={()=>{setPage(1)}} href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive={page==2} onClick={()=>{setPage(2)}} href="#">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive={page==3} onClick={()=>{setPage(3)}} href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis onClick={()=>{setPage((prev)=>(prev+1))}} />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
    </div>
  );
};

export default Home;
