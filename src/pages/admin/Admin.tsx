import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import ServiceList from "../../components/admin/ServiceList";

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Адмін-панель</h1>
      <p>Вітаємо, {user?.email}</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Вийти
      </button>
      <ServiceList />
    </Layout>
  );
};

export default Admin;