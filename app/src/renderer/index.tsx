import React from "react";
import {render} from "react-dom";

import { App } from "./App";
import { AppProvider } from "./Actions/App";
import { PlayerProvider } from "./Actions/Player";

const app = document.createElement("div");
document.body.append(app);

render(
  <AppProvider>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </AppProvider>,
  app
);
