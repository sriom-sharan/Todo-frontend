import AddTask from "./components/AddTask";

import Home from "./Home";

function App() {
  return (
    <div className="bg-secondary-foreground flex flex-col justify-center bg-black min-h-screen w-screen">
      <div className="flex flex-col justify-between p-6 min-h-screen">
        <Home  />
   
      </div>
      <AddTask />
    </div>
  );
}

export default App;
