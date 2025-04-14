import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./config/Router";

function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

const MainContent = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex justify-center items-center overflow-x-clip p-4 mt-4">
        <Router />
      </div>
    </div>
  );
};

export default App;
