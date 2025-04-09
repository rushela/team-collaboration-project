// Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { FiHome, FiUser, FiBell, FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Sidebar for the user dashboard
const UserSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally clear localStorage on logout
    // localStorage.removeItem("token");
    // localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Box bg="blue.800" color="white" w="250px" minH="100vh" p="4">
      <Heading size="md" mb="8">
        TeamSync
      </Heading>
      <VStack align="start" spacing="4">
        <Button variant="ghost" leftIcon={<FiHome />}>
          Dashboard
        </Button>
        <Button variant="ghost" leftIcon={<FiUser />}>
          My Tasks
        </Button>
        <Button variant="ghost" leftIcon={<FiBell />}>
          Notifications
        </Button>
        <Button variant="ghost" leftIcon={<FiSettings />}>
          Settings
        </Button>
      </VStack>
      <Box mt="auto">
        <Button variant="ghost" leftIcon={<FiLogOut />} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

// Main content for the user dashboard
const DashboardContent = () => {
  const [fullName, setFullName] = useState("");
  const [companyID, setCompanyID] = useState("");

  // Fetch user data from /me route on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // If no token, user is not logged in

    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFullName(res.data.fullName);
        setCompanyID(res.data.companyID);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  }, []);

  return (
    <Box p="8">
      {/* Display the user's name and company ID */}
      <Heading mb="4">
        Welcome, {fullName} {companyID && `(${companyID})`}
      </Heading>
      <Text mb="6">Overview of your tasks and notifications</Text>
      <Flex mb="4" gap="4" wrap="wrap">
        <Box p="6" boxShadow="md" borderRadius="md" bg="white" minW="200px">
          <Heading size="sm">Active Tasks</Heading>
          <Text mt="2">5 tasks in progress</Text>
        </Box>
        <Box p="6" boxShadow="md" borderRadius="md" bg="white" minW="200px">
          <Heading size="sm">Upcoming Deadlines</Heading>
          <Text mt="2">2 tasks due soon</Text>
        </Box>
        <Box p="6" boxShadow="md" borderRadius="md" bg="white" minW="200px">
          <Heading size="sm">Notifications</Heading>
          <Text mt="2">3 new alerts</Text>
        </Box>
      </Flex>
      <Box p="6" boxShadow="md" borderRadius="md" bg="white">
        <Heading size="sm" mb="2">
          Recent Activity
        </Heading>
        <Text>Task X was updated, Task Y was completed, and more...</Text>
      </Box>
    </Box>
  );
};

// Combined User Dashboard layout
const Dashboard = () => (
  <Flex>
    <UserSidebar />
    <Box flex="1" bg="gray.100" minH="100vh">
      <DashboardContent />
    </Box>
  </Flex>
);

export default Dashboard;
