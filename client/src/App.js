import React from "react";
import { Route, Routes } from "react-router-dom";
import OpenRoute from "./components/auth/OpenRoute";
import Login from "./pages/Login";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PrivateRoute from "./components/auth/PrivateRoute";
import CreateCard from "./pages/CreateCard";

const App = () => {
    return (
        <div className="w-full h-full min-h-screen bg-white text-black">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={
                        <OpenRoute>
                            <Login />
                        </OpenRoute>
                    }
                />

                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <DashboardLayout></DashboardLayout>
                        </PrivateRoute>
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/createcard" element={<CreateCard />} />
                    <Route path="/editcard/:id" element={<CreateCard />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
