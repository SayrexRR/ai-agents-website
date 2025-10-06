import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import type { BlogPost } from "../../interfaces/Blog"; 
import { useNavigate } from "react-router-dom";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "sonner";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) toast.error("Ошибка при загрузки постов");
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Блог</h1>
        <Button onClick={() => navigate("/admin/blog/new")}>Добавить пост</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition">
            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
            )}
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <p className="text-sm text-gray-500">{post.author || "Без автора"}</p>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <Button
                variant="primary"
                onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
              >
                Редактировать
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(post.id!)}>
                Удалить
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
