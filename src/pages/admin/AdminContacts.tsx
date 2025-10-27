import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card"; 
import { Mail, Trash2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import SearchBar from "../../components/SearchBar";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read?: boolean;
}

const MessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredMessages = messages.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "unread" && !m.is_read);
    return matchSearch && matchFilter;
  });


  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setMessages(data || []);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("id", id);
    if (!error) {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
      );
      toast.success("Сообщение позначено как прочитаное");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить сообщение?")) return;
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (!error) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setSelected(null);
      toast.success("Сообщение удалено");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Поиск по имени, email или тексту ..."
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border text-gray-500 rounded px-3 py-2"
        >
          <option value="all">Все</option>
          <option value="unread">Непрочитаные</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ліва панель — список */}
        <Card className="col-span-1 overflow-y-auto max-h-[80vh]">
          <ul className="divide-y">
            {filteredMessages.map((m) => (
              <li
                key={m.id}
                onClick={() => {
                  setSelected(m);
                  if (!m.is_read) markAsRead(m.id);
                }}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition ${
                  !m.is_read ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(m.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">{m.message}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Права панель — деталі */}
        <Card className="col-span-2 p-6">
          {selected ? (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{selected.name}</h2>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-blue-600 text-sm"
                  >
                    {selected.email}
                  </a>
                </div>
                <div className="flex gap-2">
                  {!selected.is_read && (
                    <Button
                      variant="outline"
                      onClick={() => markAsRead(selected.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" /> Прочитано
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(selected.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Удалить
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <p className="text-gray-700 whitespace-pre-line">
                  {selected.message}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 flex items-center justify-center h-full">
              <Mail className="w-6 h-6 mr-2" /> Виберите сообщение из списка
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MessagesPage;
