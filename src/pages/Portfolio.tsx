import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { PortfolioItem } from '../interfaces/Portfolio'; 
import Layout from '../components/Layout';

const Portfolio = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error(error);
      else setItems(data || []);
      setLoading(false);
    };

    fetchItems();
  }, []);

  return (
    <Layout>
      <div className="w-full py-8 px-6">
        <h1 className="text-3xl font-bold mb-6">Наші роботи</h1>
        {loading ? (
          <p>Завантаження...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {items.map(item => (
              <div key={item.id} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="mb-4">{item.description}</p>
                {item.project_url && (
                  <a
                    href={item.project_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Переглянути проєкт →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Portfolio;