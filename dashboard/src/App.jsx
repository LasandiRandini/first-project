import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Sidebar from "./components/sidebar";
import EmployeeMain from "./pages/employeeMain";
import DepartmentMain from "./pages/departmentMain";
import Setting from "./pages/setting";

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
       
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
