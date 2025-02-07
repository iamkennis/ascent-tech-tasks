import {
  BarChart2,
  Calendar,
  FileText,
  FolderOpen,
  LayoutGrid,
  LogOut,
  MessageSquare,
  Settings,
  Users,
  X
} from "lucide-react";
import logo from "@/assets/dash-logo.svg";
import { Link, useLocation } from "react-router-dom";
import { auth } from "@/services/firebase";

const navItems = [
  { title: "Overview", icon: LayoutGrid, href: "/dashboard/overview" },
  { title: "Meeting", icon: Calendar, href: "/dashboard/meeting" },
  { title: "Message", icon: MessageSquare, href: "/dashboard/message" },
  { title: "Project", icon: FolderOpen, href: "/dashboard/project" },
  { title: "Ticket", icon: FileText, href: "/dashboard/ticket" },
  { title: "Employee", icon: Users, href: "/dashboard/employee", hasSubmenu: true },
  { title: "Attendance", icon: BarChart2, href: "/dashboard/attendance", hasSubmenu: true },
  { title: "Notice", icon: FileText, href: "/dashboard/notice" },
  { title: "HR Tab", icon: Users, href: "/dashboard/hr", hasSubmenu: true },
  { title: "Organization", icon: Users, href: "/dashboard/organization" },
  { title: "Account", icon: Users, href: "/dashboard/account" },
  { title: "Setting", icon: Settings, href: "/dashboard/setting" },
];

export function MainNav({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  const location = useLocation();

  const handleSignOut = async () => {
    try {
        await auth.signOut();
        console.log("User signed out");
        window.location.href = "/";
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-60 bg-white shadow-none transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 md:border-r md:max-h-full`}
    >
      
      <div className="flex items-center justify-between p-4 md:hidden">
        <span className="text-lg font-semibold">Menu</span>
        <button onClick={toggleSidebar}>
          <X className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <figure className="p-3">
          <img src={logo} alt="Floopyinn Logo" width={130} height={40} className="h-8 w-auto" />
        </figure>
        <nav className="grid gap-1 px-2 pt-8">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "bg-[#002B19] text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
                {item.hasSubmenu && (
                  <svg
                    className={`ml-auto h-4 w-4 transition-transform ${
                      isActive ? "text-white rotate-180" : "text-gray-500"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
      <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors w-full"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
