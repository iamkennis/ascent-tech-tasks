import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";
import { MainNav } from "@/components/main-nav";
import { useState } from "react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-50 max-h-full relative">
     <MainNav isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="p-4 relative">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}


