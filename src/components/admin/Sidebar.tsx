import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Briefcase, Image, Mail, Settings, FileText, ArrowLeft, LogOut } from "lucide-react";

const navItems = [
  {
    name: "Главная",
    path: "/admin",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Сервисы",
    path: "/admin/services",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    name: "Портфолио",
    path: "/admin/portfolio",
    icon: <Image className="w-5 h-5" />,
  },
  { 
    name: "Блог",
    path: "/admin/blog",
    icon: <FileText className="w-5 h-5" /> 
  },
  {
    name: "Сообщения",
    path: "/admin/contacts",
    icon: <Mail className="w-5 h-5" />,
  },
  {
    name: "Настройки",
    path: "/admin/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center font-bold text-xl text-blue-600 border-b">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
              end
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="flex-1 p-4 place-content-end place-items-center">
          <button
            onClick={handleLogout}
            className="bg-red-400 text-white hover:bg-red-600 flex gap-3 px-4 py-2 text-center rounded-lg transition"
          >
            <LogOut />
            Выйти
          </button>
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-2 text-center rounded-lg hover:bg-blue-600 bg-blue-400 text-white mt-6"
          >
            <ArrowLeft />
            На главную
          </NavLink>
        </div>
        <div className="p-4 text-sm text-gray-500 border-t">
          © 2025 AI Agents
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;