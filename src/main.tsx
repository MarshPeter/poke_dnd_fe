import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./Login.tsx";
import Trainer from "./Trainer.tsx";
import PokemonParty from "./PokemonParty.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login></Login>,
    },
    {
        path: "/trainer/:id",
        element: <Trainer></Trainer>,
    },
    {
        path: "/trainer/:id/pokemon",
        element: <PokemonParty></PokemonParty>,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
);
