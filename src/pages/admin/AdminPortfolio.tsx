import { Link } from 'react-router-dom';
import PortfolioList from '../../components/admin/PortfolioList';

const AdminPortfolio = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Портфоліо</h2>
        <Link
          to="/admin/portfolio/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Додати проєкт
        </Link>
      </div>
      <PortfolioList />
    </div>
  );
};

export default AdminPortfolio;