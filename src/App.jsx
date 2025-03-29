import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UsersList from "./components/UserList";
import EditUser from "./components/EditUser";
import PrivateRoute from "./utils/PrivateRoute";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersList />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
