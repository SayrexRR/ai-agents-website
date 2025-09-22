import { Link } from 'react-router-dom';
import ServiceList from '../../components/admin/ServiceList';


const AdminServices = () => {
  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>Послуги</h2>
        <Link
          to='/admin/services/new'
          className='bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700'
        >
          ➕ Додати послугу
        </Link>
      </div>
      <ServiceList />
    </div>
  );
};

export default AdminServices;