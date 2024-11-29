import { axiosInstance } from "../../axiosInstance";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
};

const TaskDetails = () => {
  const { taskId } = useParams(); // Get taskId from the route
  const navigate = useNavigate()
  const [task, setTask] = useState<Task | null>(null); // State for storing task details
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const response = await axiosInstance.get(`/tasks/${taskId}`);
        console.log(response);

        if (response.data?.task) {
          setTask(response.data.task);
        } else {
          setError("Task not found.");
        }
      } catch (err) {
        setError("Error fetching task.");
        console.error("Error fetching task:", err);
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  if (loading) {
    return <div>Loading task details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!task) {
    return <div>No task details found.</div>;
  }

  let colorPriority = "bg-yellow-300/60";
  if (task.priority === "high") {
    colorPriority = "bg-red-400/60";
  } else if (task.priority === "low") {
    colorPriority = "bg-green-400/60";
  }

  return (
    <Card className="w-screen h-screen justify-center">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="flex items-center gap-4"> <span className="bg-gray-400 flex justify-center p-2 rounded-full items-center" onClick={()=>navigate(-1)}><IoIosArrowBack /></span> {task.title}</CardTitle>
        <p className="bg-orange-400 px-2 rounded-full"> {task.status}</p>
      </CardHeader>
      <p className=" px-4 font-semibold">Description</p>
      <CardContent className={`flex flex-col ${colorPriority}  h-1/3 mx-4`}>
      
        <p>{task.description}</p>
      
      </CardContent>
      <CardFooter>
        <p>Priority: {task.priority}</p>
      </CardFooter>
    </Card>
  );
};

export default TaskDetails;
