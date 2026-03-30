import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Login from "../auth/Login";
import Register from "../auth/Register";

import Dashboard from "../admin/Dashboard";
import AdminRooms from "../admin/Rooms";
import Bookings from "../admin/Bookings";
import Customers from "../admin/Customers";
import Payments from "../admin/Payments";
import Reports from "../admin/Reports";

import Home from "../customer/Home";
import BookRoom from "../customer/BookRoom";
import CustomerServices from "../customer/Services";
import MyBookings from "../customer/MyBookings";
import ServiceDetails from "../customer/ServiceDetails";
import MyServices from "../customer/MyServices";
import CustomerRooms from "../customer/Rooms";

import StaffDashboard from "../staff/StaffDashboard";
import Tasks from "../staff/Tasks";
import StaffServices from "../staff/Services";
import CompletedTasks from "../staff/CompletedTasks";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="ADMIN">
          <Dashboard />
        </ProtectedRoute>
      }/>
      <Route path="/rooms" element={<AdminRooms />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/reports" element={<Reports />} />

      {/* Customer */}
      <Route
        path="/home"
        element={
        <ProtectedRoute role="CUSTOMER">
        <Home />
        </ProtectedRoute>
      }/>
      <Route path="/customer-rooms" element={<CustomerRooms />} />
      <Route path="/book-room" element={<BookRoom />} />
      <Route path="/services" element={<CustomerServices />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/service-details" element={<ServiceDetails />} />
      <Route path="/my-services" element={<MyServices />} />
      <Route path="/hotel/:id" element={<CustomerRooms />} />

      {/* Staff */}
      <Route
        path="/staff"
        element={
        <ProtectedRoute role="STAFF">
        <StaffDashboard />
        </ProtectedRoute>
      }/>
      <Route path="/staff/tasks" element={<Tasks />} />
      <Route path="/staff/services" element={<StaffServices />} />
      <Route path="/staff/completed" element={<CompletedTasks />} />

    </Routes>
  );
}

export default AppRoutes;