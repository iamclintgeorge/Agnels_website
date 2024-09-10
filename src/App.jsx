import React from "react";
import Header from "./components/Header.jsx";
import News from "./components/News.jsx";
import Welcome from "./components/Welcome.jsx";
import Widgets from "./components/Widgets.jsx";

function App() {
  return (
    <div className="flex flex-col space-y-4">
      <Header />
      <News />
      <Welcome />
      <Widgets />
    </div>
  );
}

export default App;
