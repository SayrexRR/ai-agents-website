/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { Pencil, Trash2, Plus } from "lucide-react";
import SearchBar from "../SearchBar";

const ServiceList = () => {
  const [services, setServices] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const filteredServices = services.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("id, title, price");

    if (error) console.error(error);
    else setServices(data || []);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Вы уверены, что хотите удалить этот сервис?")) {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) alert("❌ Ошибка удаления: " + error.message);
      else fetchServices();
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="p-6">
      {/* Заголовок + кнопка */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Сервисы</h1>
        <Link to="/admin/services/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Добавить сервис
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

      {/* Таблиця */}
      <div className="overflow-x-auto bg-white border rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                Название
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                Цена (€)
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-6 text-center text-gray-500 text-sm"
                >
                  Нет доступных сервисов
                </td>
              </tr>
            )}
            {filteredServices.map((s) => (
              <tr
                key={s.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {s.title}
                </td>
                <td className="px-6 py-4 text-gray-700">{s.price}</td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <Link to={`/admin/services/edit/${s.id}`}>
                    <Button variant="outline" className="flex gap-1">
                      <Pencil className="w-4 h-4" /> Редактировать
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    className="flex gap-1"
                    onClick={() => handleDelete(s.id)}
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

export default ServiceList;
