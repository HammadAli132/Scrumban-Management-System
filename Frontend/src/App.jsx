import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();
  const hideNavbar = ['/', '/signup'].includes(location.pathname);

  return (
    <div className={`flex lg:flex-row w-full h-full ${hideNavbar ? "items-center justify-center" : ""}`}>
        {!hideNavbar && <NavigationBar />}
        <Outlet />
    </div>
  );
}
