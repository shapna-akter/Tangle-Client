import CareGivers from "../../components/pages/CareGivers/CareGivers";
import Certification from "../../components/pages/Certification/Certification";
import Clients from "../../components/pages/Clients/Clients";
import DailyProgress from "../../components/pages/DailyProgress/DailyProgress";
import AddCaregiver from "../../components/pages/Dashboard/Add/AddCaregiver";
import AddClient from "../../components/pages/Dashboard/Add/AddClient";
import AddSchedule from "../../components/pages/Dashboard/Add/AddSchedule";
import CaregiverList from "../../components/pages/Dashboard/UserList/CaregiverList";
import CreateEvents from "../../components/pages/Dashboard/CreateEvents/CreateEvents";
import Dashboard from "../../components/pages/Dashboard/Dashboard/Dashboard";
import Payment from "../../components/pages/Dashboard/Payment/Payment";
import EmployeesList from "../../components/pages/EmployeesList/EmployeesList";
import Home from "../../components/pages/Home/Home/Home";
import Email from "../../components/pages/Login/Email";
import Login from "../../components/pages/Login/Login";
import ResetPassword from "../../components/pages/Login/ResetPassword";
import ErrorPage from "../../components/shared/ErrorPage/ErrorPage";
import DashboardLayout from "../../layout/DashboardLayout";
import AdminRoute from "../privateRoute/AdminRoute";
import PrivateRoute from "../privateRoute/PrivateRoute";
import ClientsList from "../../components/pages/Dashboard/UserList/ClientsList";
import AddAdminAndOfficeStuff from "../../components/pages/Dashboard/Add/AddAdminAndOfficeStuff";
import AddOrganization from "../../components/pages/Dashboard/Add/AddOrganization";
const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../layout/Main");

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/clients/:id",
        element: (
          <PrivateRoute>
            <Clients></Clients>
          </PrivateRoute>
        ),
      },
      {
        path: "/caregivers/:id",
        element: (
          <PrivateRoute>
            <CareGivers></CareGivers>
          </PrivateRoute>
        ),
      },
      {
        path: "/employeesList",
        element: <EmployeesList></EmployeesList>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/addSchedule",
        element: <AddSchedule></AddSchedule>,
      },
      {
        path: "/dashboard/createEvents",
        element: <CreateEvents></CreateEvents>,
      },
      {
        path: "/dashboard/clientList",
        element: (
          <AdminRoute>
            <ClientsList></ClientsList>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/caregiverList",
        element: (
          <AdminRoute>
            <CaregiverList></CaregiverList>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addClient",
        element: (
          <AdminRoute>
            <AddClient />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addCaregiver",
        element: (
          <AdminRoute>
            <AddCaregiver />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addAdminAndOfficeStuff",
        element: (
          <AdminRoute>
            <AddAdminAndOfficeStuff />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addOrganization",
        element: (
          <AdminRoute>
            <AddOrganization />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment",
        element: <Payment></Payment>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/email",
    element: <Email></Email>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword></ResetPassword>,
  },
  {
    path: "/dailyProgress",
    element: <DailyProgress></DailyProgress>,
  },
  {
    path: "/certification",
    element: <Certification></Certification>,
  },
]);
