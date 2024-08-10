import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "../widgets/layout";
import routes from "../routes";
import { setOpenConfigurator } from "../context";
import { Home, Tables } from "../pages/Dashboard";
import { useState } from "react";
import Profile from "../pages/Dashboard/profile";
import Notifications from "../pages/Dashboard/notifications";

export function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={null}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        {selectedTab === "dashboard" && <Home />}
        {selectedTab === "profile" && <Profile />}
        {selectedTab === "notifications" && <Notifications />}
        {selectedTab === "tables" && <Tables />}
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
