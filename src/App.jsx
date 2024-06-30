// 75c82df7a5ce6827e14b42270f4008c6

import { useState } from "react";

const ApiKey = "75c82df7a5ce6827e14b42270f4008c6";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Chittagong");
  return (
    <>
      <h1 className="text-3xl">Vite + React</h1>
    </>
  );
};

export default App;
