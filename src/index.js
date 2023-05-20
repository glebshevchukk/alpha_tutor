import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import Opener from "./routes/opener";
import Chat from "./routes/chat";
import Tree from "./routes/tree"
import Jeopordy from "./routes/jeopordy/components/Jeopordy.tsx"
import Video from "./routes/video";
import Loading from "./routes/loading";
import "./index.css";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Opener/>
  },
  {
    path:"/loading",
    element: <Loading/>
  },
  {
    path: "/combo",
    element: <Root />,
    children: [
      {
        path: "tree_page",
        element: <Tree/>,
      },
      {
        path: "chat_page",
        element: <Chat/>,
      },
      {
        path: "jeopordy_page",
        element: <Jeopordy/>,
      },
      {
        path: "video_page",
        element: <Video/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(

    <RouterProvider router={router} />

);