import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6">Адмін-панель</h2>
        <nav className="flex flex-col gap-4">
          <NavLink to="/admin/services" className={({ isActive }) => isActive ? 'text-yellow-400 font-semibold' : ''}>
            🛠️ Послуги
          </NavLink>
          <NavLink to="/admin/blog" className={({ isActive }) => isActive ? 'text-yellow-400 font-semibold' : ''}>
            📝 Блог
          </NavLink>
          <NavLink to="/admin/portfolio" className={({ isActive }) => isActive ? 'text-yellow-400 font-semibold' : ''}>
            🎨 Портфоліо
          </NavLink>
        </nav>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🔓 Вийти
        </button>
        <NavLink
          to="/"
          className="text-center text-blue-300 hover:text-blue-500"
        >
          ⬅️ На головну
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;