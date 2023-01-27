import "./App.css";
import React from "react";
import type {FC} from "react";
import {MainView} from "@src/react/components/app/components/main-view/MainView";

const App: FC = () => (
  <div className="app">
    <MainView/>
  </div>
);

export default App;
