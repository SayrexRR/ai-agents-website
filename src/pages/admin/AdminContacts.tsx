import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

const AdminContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setStatus("❌ Помилка завантаження");
    } else {
      setContacts(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Видалити повідомлення?")) return;

    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) {
      setStatus("❌ Помилка видалення: " + error.message);
    } else {
      setStatus("✅ Видалено");
      fetchContacts();
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) return <p>Завантаження...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Повідомлення користувачів</h2>
      {status && <p className="mb-2">{status}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Імʼя</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Повідомлення</th>
              <th className="px-4 py-2 text-left">Дата</th>
              <th className="px-4 py-2 text-left">Дії</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.email}</td>
                <td
                  className="px-4 py-2 cursor-pointer text-blue-600 underline"
                  onClick={() => setSelected(c)}
                >
                  {c.message.length > 30
                    ? c.message.slice(0, 30) + "…"
                    : c.message}
                </td>
                <td className="px-4 py-2">
                  {new Date(c.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    🗑️ Видалити
                  </button>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  Немає повідомлень
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Модальне вікно */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-2">Повідомлення</h3>
            <p>
              <strong>Імʼя:</strong> {selected.name}
            </p>
            <p>
              <strong>Email:</strong> {selected.email}
            </p>
            <p className="mt-2 whitespace-pre-wrap">{selected.message}</p>
            <p className="text-sm text-gray-500 mt-4">
              {new Date(selected.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
