import { Bell, Moon, Search, Sun } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const location = useLocation();
  const navigate = useNavigate()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const searchParams = new URLSearchParams(location.search);
    if (query) {
      searchParams.set("search", query);
    } else {
      searchParams.delete("search");
    }
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 flex h-[80px] w-full items-center bg-background px-4 shadow-sm md:h-[100px]">
      
      <button onClick={toggleSidebar} className="block md:hidden">
        <Menu className="h-6 w-6 text-gray-700" />
      </button>

      <div className="flex flex-1 items-center gap-4 px-6">
        <div className="relative flex-1 max-w-xl space-x-3">
          <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search here"
            className="w-full pl-8 rounded-full"
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            5
          </span>
        </button>
        <button 
          className="p-2 hover:bg-accent rounded-full transition-colors"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>
              {(localStorage.getItem('userName') || 'Masum Khan').slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {localStorage.getItem('userName') || 'Masum Khan'}
        </div>
      </div>
    </header>
  );
}
