import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Dashboard from "../layouts/Dashboard";
import ManageClasses from "../pages/Dashboard/ManageClasses";
import PrivateRoute from "./PrivateRoute";
import ManageUser from "../pages/Dashboard/ManageUser";
import AddClass from "../pages/Dashboard/AddClass";
import MyClass from "../pages/Dashboard/MyClass";
import Classes from "../pages/Classes/Classes";
import Instructors from "../pages/Instructors/Instructors";
import SelectedClasses from "../pages/Dashboard/SelectedClasses";
import EnrolledClasses from "../pages/Dashboard/EnrolledClasses";
import Payment from "../pages/Dashboard/Payment";
import ErrorLayout from "../layouts/ErrorLayout";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorLayout></ErrorLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/registration",
                element: <Registration></Registration>
            },
            {
                path: "/classes",
                element: <Classes></Classes>
            },
            {
                path: "/instructors",
                element: <Instructors></Instructors>
            },
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "manageClasses",
                element: <ManageClasses></ManageClasses>
            },
            {
                path: "manageUser",
                element: <ManageUser></ManageUser>
            },
            {
                path: "addClass",
                element: <AddClass></AddClass>
            },
            {
                path: "myClasses",
                element: <MyClass></MyClass>
            },
            {
                path: "selectedClasses",
                element: <SelectedClasses></SelectedClasses>
            },
            {
                path: "enrolledClasses",
                element: <EnrolledClasses></EnrolledClasses>
            },
            {
                path: "payment/:id/:classId/:price/:name",
                element: <Payment></Payment>
            },
            {
                path: "paymentHistory",
                element: <PaymentHistory></PaymentHistory>
            },
        ]
    },
]);