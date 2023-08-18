import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Report from "./pages/Report";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import AssetTools from "./pages/AssetAndTools/AssetTools";
import SideBar from "./components/SideBar";

import Testing from "./pages/Testing";
import DataAsset from "./pages/AssetAndTools/DataAsset";

const dataurl = [
  { id: 1, url_master: "/", name: "Login" },
  { id: 2, url_master: "/home", name: "Home" },
  { id: 3, url_master: "/dashboard", name: "Dashboard" },
  { id: 4, url_master: "/asset-tools", name: "AssetTools" },
  { id: 5, url_master: "/settings", name: "Settings" },
  { id: 6, url_master: "/report", name: "Report" },
  { id: 7, url_master: "/asset-tools/data-assets", name: "DataAsset" },
];

const PAGES = {
  Login: <Login />,
  Home: <Home />,
  Dashboard: <Dashboard />,
  AssetTools: <AssetTools />,
  Report: <Report />,
  Testing: <Testing />,
  DataAsset: <DataAsset />,
};

function App() {
  const location = useLocation();

  return (
    <div className="min-h-full flex flex-col">

      {location.pathname !== "/" && <SideBar />}

      <Routes>

        {dataurl.map((url) => {
          return (

            <Route
              key={url.id}
              path={url.url_master}
              element={PAGES[url.name]}
            />

            
          )
        })}
      </Routes>
    </div>
  );
}

export default App;