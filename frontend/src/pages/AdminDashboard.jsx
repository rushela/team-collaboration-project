import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { FiHome, FiUsers, FiFileText, FiSettings, FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import UserManagement from './UserManagement'; // Import the User Management component

// Dashboard Home component that fetches profile data
const DashboardHome = () => {
  const [fullName, setFullName] = useState('');
  const [companyID, setCompanyID] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    axios.get('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setFullName(res.data.fullName);
      setCompanyID(res.data.companyID);
    })
    .catch((err) => {
      console.error('Error fetching user profile', err);
    });
  }, []);

  return (
    <Box p="8">
      <Heading mb="4">Welcome, {fullName} ({companyID})</Heading>
      <Text mb="6">Manage users, review tasks, and view analytics for TeamSync</Text>
      <Flex gap="4" wrap="wrap">
        <Box p="6" boxShadow="md" borderRadius="md" bg="white" flex="1" minW="200px">
          <Heading size="sm">User Management</Heading>
          <Text mt="2">Total Users: 150</Text>
        </Box>
        <Box p="6" boxShadow="md" borderRadius="md" bg="white" flex="1" minW="200px">
          <Heading size="sm">Task Oversight</Heading>
          <Text mt="2">Pending Approvals: 10</Text>
        </Box>
        <Box p="6" boxShadow="md" borderRadius="md" bg="white" flex="1" minW="200px">
          <Heading size="sm">Performance Reports</Heading>
          <Text mt="2">85% task completion last month</Text>
        </Box>
      </Flex>
      <Box p="6" boxShadow="md" borderRadius="md" bg="white" mt="4">
        <Heading size="sm" mb="2">Recent Activity</Heading>
        <Text>New user registrations, task updates, and system alerts</Text>
      </Box>
    </Box>
  );
};

// Sidebar component
const AdminSidebar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <Box bg="blue.800" color="white" w="250px" minH="100vh" p="4">
      <Heading size="md" mb="8">TeamSync Admin</Heading>
      <VStack align="start" spacing="4">
        <Button variant="ghost" leftIcon={<FiHome />} onClick={() => navigate("/admindashboard")}>
          Dashboard
        </Button>
        {role === "Admin" && (
          <Button variant="ghost" leftIcon={<FiUsers />} onClick={() => navigate("/admindashboard/user-management")}>
            User Management
          </Button>
        )}
        <Button variant="ghost" leftIcon={<FiFileText />} onClick={() => navigate("/admindashboard/task-oversight")}>
          Task Oversight
        </Button>
        <Button variant="ghost" leftIcon={<FiSettings />} onClick={() => navigate("/admindashboard/settings")}>
          Settings
        </Button>
      </VStack>
      <Box mt="auto">
        <Button variant="ghost" leftIcon={<FiLogOut />} onClick={() => {
          // Optionally clear the token on logout
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          navigate("/login");
        }}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

// Layout combining the sidebar and nested routes
const AdminDashboardLayout = () => (
  <Flex>
    <AdminSidebar />
    <Box flex="1" bg="gray.100" minH="100vh">
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route
          path="task-oversight"
          element={<Box p="8"><Heading>Task Oversight Page</Heading></Box>}
        />
        <Route
          path="settings"
          element={<Box p="8"><Heading>Settings Page</Heading></Box>}
        />
      </Routes>
    </Box>
  </Flex>
);

const AdminDashboard = () => {
  return <AdminDashboardLayout />;
};

export default AdminDashboard;
