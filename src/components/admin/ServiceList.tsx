import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Link } from 'react-router-dom';
import type { Service } from '../../interfaces/Service';

const ServiceList = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setServices(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Ви впевнені, що хочете видалити цю послугу?')) {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) alert('❌ Помилка видалення: ' + error.message);
      else fetchServices();
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) return <p>Завантаження...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Назва</th>
            <th className="px-4 py-2 text-left">Опис</th>
            <th className="px-4 py-2 text-left">Іконка</th>
            <th className="px-4 py-2 text-left">Редагувати</th>
            <th className="px-4 py-2 text-left">Видалити</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id} className="border-t">
              <td className="px-4 py-2 font-medium">{service.title}</td>
              <td className="px-4 py-2">{service.description}</td>
              <td className="px-4 py-2">
                {service.icon_url && (
                  <img src={service.icon_url} alt="icon" className="w-8 h-8" />
                )}
              </td>
              <td className="px-4 py-2 space-x-2">
                <Link
                  to={`/admin/services/edit/${service.id}`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  ✏️
                </Link>
                
              </td>
              <td>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceList;