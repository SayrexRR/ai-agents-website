import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "../../components/admin/BlogForm";
import { supabase } from "../../lib/supabaseClient";
import type { BlogPost } from "../../interfaces/Blog";
import { toast } from "sonner";

const AdminBlogEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => setPost(data || null));
  }, [id]);

  async function handleSave(updated: BlogPost) {
    const { error } = await supabase
      .from("blog_posts")
      .update(updated)
      .eq("id", id);
    if (!error) {
      navigate("/admin/blog");
      toast.success("Блог обновлен");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 font-semibold">Редактировать блог</h1>
      {post && <BlogForm post={post} onSave={handleSave} />}
    </div>
  );
};

export default AdminBlogEdit;
