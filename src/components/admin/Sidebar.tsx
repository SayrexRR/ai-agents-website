import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Briefcase,
  Image,
  Mail,
  Settings,
  FileText,
  ArrowLeft,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { name: "Главная", path: "/admin", icon: LayoutDashboard },
  { name: "Сервисы", path: "/admin/services", icon: Briefcase },
  { name: "Портфолио", path: "/admin/portfolio", icon: Image },
  { name: "Блог", path: "/admin/blog", icon: FileText },
  { name: "Сообщения", path: "/admin/contacts", icon: Mail },
  { name: "Настройки", path: "/admin/settings", icon: Settings },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white shadow-md flex flex-col min-h-screen transition-all duration-300`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b text-gray-300">
        {!collapsed && (
          <span className="text-xl font-bold text-blue-600">Admin Panel</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-gray-100 text-black"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Навігація */}
      <nav className="flex-1 px-2 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
              title={collapsed ? item.name : undefined} // тултіп у компактному режимі
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Нижня частина */}
      <div className="p-4 border-t text-gray-300 space-y-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition"
          title={collapsed ? "Выйти" : undefined}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && "Выйти"}
        </button>
        <NavLink
          to="/"
          className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition"
          title={collapsed ? "На главную" : undefined}
        >
          <ArrowLeft className="w-5 h-5" />
          {!collapsed && "На главную"}
        </NavLink>
        {!collapsed && (
          <div className="text-xs text-gray-300 text-center pt-2 border-t">
            <span className="text-gray-500">© 2025 AI Agents</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
