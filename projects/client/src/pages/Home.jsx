import React from "react";
import CompTesting from "../components/componentTest/CompTesting";

const Home = () => {
  return (
    <div>
      <div>Home</div>
      <CompTesting title="Good" />
      {/* <CompTesting title="Bad" />
      <CompTesting title="Service" />
      <CompTesting title="Project Completed" /> */}
    </div>
  );
};

export default Home;
