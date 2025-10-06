/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Plus, FileText, Briefcase, Image, Mail } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    posts: 0,
    services: 0,
    portfolio: 0,
    messages: 0,
  });
  const [latestPosts, setLatestPosts] = useState<any[]>([]);
  const [latestMessages, setLatestMessages] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Підрахунок кількості
        const [
          { count: posts },
          { count: services },
          { count: portfolio },
          { count: messages },
        ] = await Promise.all([
          supabase
            .from("blog_posts")
            .select("*", { count: "exact", head: true }),
          supabase.from("services").select("*", { count: "exact", head: true }),
          supabase
            .from("portfolio_items")
            .select("*", { count: "exact", head: true }),
          supabase.from("messages").select("*", { count: "exact", head: true }),
        ]);

        setStats({
          posts: posts || 0,
          services: services || 0,
          portfolio: portfolio || 0,
          messages: messages || 0,
        });

        // Останні 5 постів
        const { data: postsData } = await supabase
          .from("blog_posts")
          .select("id, title, created_at")
          .order("created_at", { ascending: false })
          .limit(5);

        setLatestPosts(postsData || []);

        // Останні 5 повідомлень
        const { data: messagesData } = await supabase
          .from("contacts")
          .select("id, name, message, created_at")
          .order("created_at", { ascending: false })
          .limit(5);

        setLatestMessages(messagesData || []);
      } catch (err) {
        console.error(err);
        toast.error("Ошибка при загрузке данных");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Админ панель</h1>

      {/* Метрики */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <CardTitle>Посты</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.posts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-green-600" />
            <CardTitle>Сервисы</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.services}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Image className="w-5 h-5 text-purple-600" />
            <CardTitle>Портфолио</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.portfolio}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-red-600" />
            <CardTitle>Сообщения</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.messages}</p>
          </CardContent>
        </Card>
      </div>

      {/* Останні дії */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Последние посты</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {latestPosts.length === 0 && (
                <li className="text-gray-500">Нет постов</li>
              )}
              {latestPosts.map((p) => (
                <li key={p.id} className="flex justify-between">
                  <span>{p.title}</span>
                  <span className="text-gray-400">
                    {new Date(p.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Последние сообщения</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {latestMessages.length === 0 && (
                <li className="text-gray-500">Нет сообщений</li>
              )}
              {latestMessages.map((m) => (
                <li key={m.id} className="flex justify-between">
                  <span className="truncate max-w-[200px]">
                    {m.name}: {m.message}
                  </span>
                  <span className="text-gray-400">
                    {new Date(m.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Швидкі дії */}
      <div className="flex gap-4">
        <Button
          onClick={() => navigate("/admin/blog/new")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Новый пост
        </Button>
        <Button
          onClick={() => navigate("/admin/services/new")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Новый сервис
        </Button>
        <Button
          onClick={() => navigate("/admin/portfolio/new")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Новая работа
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
