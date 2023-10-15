import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "../components/shared/NavBar/NavBar";
import { AuthContext } from "../Contexts/AuthProvider";

const DashboardLayout = () => {
  const { isValidUser } = useContext(AuthContext);

  return (
    <div>
      <NavBar></NavBar>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content bg-base-100">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side bg-primary">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-100">
            <h2 className="text-xl font-bold mb-4 text-center">Work Flow</h2>
            <li>
              <Link to="/dashboard" className="hover:bg-info">
                Dashboard
              </Link>
            </li>
            {(isValidUser?.role === "admin" ||
              isValidUser?.role === "superAdmin") && (
                <>
                  <li>
                    <Link to="/dashboard/addClient" className="hover:bg-info">
                      Add Client
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/addCaregiver" className="hover:bg-info">
                      Add Employee
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/addOrganization" className="hover:bg-info">
                      Add Organization
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/addAdminAndOfficeStuff" className="hover:bg-info">
                      Add Admin And Office Stuff
                    </Link>
                  </li>

                  <li>
                    <Link to="/dashboard/clientList" className="hover:bg-info">
                      Client List
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/caregiverList" className="hover:bg-info">
                      Caregiver List
                    </Link>
                  </li>
                  {/* <li>
                  <Link to="/dashboard/addSchedule" className="hover:bg-info">
                    Add Schedule
                  </Link>
                </li> */}
                  {/* <li>
                  <Link to="/dashboard/createEvents" className="hover:bg-info">
                    Create Events
                  </Link>
                </li> */}
                  <li>
                    <Link className="hover:bg-info">Accounting</Link>
                  </li>
                  <li>
                    <Link className="hover:bg-info">Reporting</Link>
                  </li>
                </>
              )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
