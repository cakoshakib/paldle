import React from "react";
import championData from "./data/champions.json";

const App = () => {
  return <div>Hello, World! {JSON.stringify(championData)}</div>;
};

export default App;
