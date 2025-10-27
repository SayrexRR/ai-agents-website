import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { PortfolioItem } from "../../interfaces/Portfolio";
import SearchBar from "../SearchBar";

const PortfolioList = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setItems(data || []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить работу?")) return;
    await supabase.from("portfolio_items").delete().eq("id", id);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Портфолио</h1>
        <Link to="/admin/portfolio/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Добавить работу
          </Button>
        </Link>
      </div>

      <div className="text-left">
        <h3 className="pb-3">Поиск</h3>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Поиск по заголовку ..."
        />
      </div>

      <div className="overflow-x-auto bg-white border rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                Изображение
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                Название
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                Дата
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 flex justify-end gap-2">
                  <Link to={`/admin/portfolio/edit/${item.id}`}>
                    <Button variant="outline" className="flex gap-1">
                      <Pencil className="w-4 h-4" /> Редактировать
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    className="flex gap-1"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4" /> Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioList;
