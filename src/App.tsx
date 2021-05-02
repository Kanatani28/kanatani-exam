import React from "react";
import { RoconRoot, useRoutes } from "rocon/react";
import toplevelRoutes from "./routes";

const Routes: React.FC = () => {
  return useRoutes(toplevelRoutes);
};

const App = () => (
  <RoconRoot>
    <Routes />
  </RoconRoot>
);

export default App;
