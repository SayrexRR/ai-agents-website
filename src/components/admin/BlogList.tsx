import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import type { BlogPost } from "../../interfaces/Blog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Pencil, Trash2, Plus } from "lucide-react";
import SearchBar from "../SearchBar";

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) toast.error("Ошибка при загрузке постов");
      else setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить пост?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (!error) {
      toast.success("Пост удален");
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-6">
      {/* Заголовок + кнопка */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Блог</h1>
        <Button
          onClick={() => navigate("/admin/blog/new")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Добавить пост
        </Button>
      </div>
      <div className="text-left">
        <h3 className="pb-3">Поиск</h3>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Поиск по заголовку ..."
        />
      </div>

      {/* Список постов */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden hover:shadow-lg transition border rounded-md"
          >
            {post.cover_image && (
              <div className="h-40 overflow-hidden">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-600">
                {post.title}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {post.author || "Без автора"} •{" "}
                {new Date(post.created_at!).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {post.content.replace(/<[^>]+>/g, "").slice(0, 150)}...
              </p>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                  className="flex items-center gap-1"
                >
                  <Pencil className="w-4 h-4" /> Редактировать
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(post.id!)}
                  className="flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Удалить
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
