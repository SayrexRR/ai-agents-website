import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Layout from '../components/Layout';
import type { Service } from '../interfaces/Service';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error(error);
      else setServices(data || []);
      setLoading(false);
    };

    fetchServices();
  }, []);

  return (
    <Layout>
      <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Наши Услуги</h1>
        {loading ? (
          <p>Завантаження...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <div key={service.id} className="bg-white p-6 rounded shadow">
                {service.icon_url && (
                  <img src={service.icon_url} alt="icon" className="w-12 h-12 mb-4" />
                )}
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Services;