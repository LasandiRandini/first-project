import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";
import Sidebar from "./components/sidebar";
import EmployeeMain from "./pages/employeeMain";
import DepartmentMain from "./pages/departmentMain";
import Setting from "./pages/setting";
import Login from "./pages/login";
import Register from "./pages/register";

const DashLayout = () => {
  return (
    <div>
      <div className="flex ">
        <div className="w-[320px] ">
          <Sidebar />
        </div>

        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
const router = createBrowserRouter([
  { path: "/", element: <Login />, },
  { path: "/register", element: <Register />, },
  {
    path: "/",
    element: <DashLayout />,
    children: [
      {
        path: "/EmployeeMain",
        element: <EmployeeMain/>,
      },
      {
        path: "/DepartmentMain",
        element: <DepartmentMain/>,
      },
      {
        path: "/Setting",
        element: <Setting/>,
      },
      {
        path: "/Login",
        element: <Login/>,
      },
      {
        path: "/Register",
        element: <Register/>,
      },
       
    ],
  },
]);


function App() {
  return (
    <div>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </div>
  )
}
export default App;
