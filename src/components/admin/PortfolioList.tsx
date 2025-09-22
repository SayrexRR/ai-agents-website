import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import type { PortfolioItem } from "../../interfaces/Portfolio";
import { Link } from "react-router-dom";

const PortfolioList = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setItems(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Видалити цей проєкт?")) {
      const { error } = await supabase
        .from("portfolio_items")
        .delete()
        .eq("id", id);
      if (error) alert("❌ " + error.message);
      else fetchItems();
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <p>Завантаження...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Назва</th>
            <th className="px-4 py-2 text-left">Опис</th>
            <th className="px-4 py-2 text-left">Зображення</th>
            <th className="px-4 py-2 text-left">Посилання</th>
            <th className="px-4 py-2 text-left">Редагувати</th>
            <th className="px-4 py-2 text-left">Видалити</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">{item.title}</td>
              <td className="px-4 py-2">{item.description}</td>
              <td className="px-4 py-2">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt="preview"
                    className="w-16 h-16 object-cover"
                  />
                )}
              </td>
              <td className="px-4 py-2">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt="preview"
                    className="w-16 h-16 object-cover"
                  />
                )}
              </td>

              <td className="px-4 py-2 space-x-2">
                <Link
                  to={`/admin/portfolio/edit/${item.id}`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  ✏️
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(item.id)}
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

export default PortfolioList;
