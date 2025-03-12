import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

export default function App() {
    return (
      <div className="flex lg:flex-row w-full h-full">
          <NavigationBar />
          <Outlet />
      </div>
    );
}
