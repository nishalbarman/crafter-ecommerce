import { useState } from "react";
import "./App.css";
import AllRoutes from "./routes/AllRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AllRoutes />
    </>
  );
}

export default App;
