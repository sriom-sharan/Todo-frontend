import AddTask from "./components/AddTask";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination";
import Home from "./Home";

function App() {
  return (
    <div className="bg-secondary-foreground flex flex-col justify-center h-screen w-screen">
      <div className="flex flex-col justify-between p-6 h-full">
        <Home  />
   
      </div>
      <AddTask />
    </div>
  );
}

export default App;
