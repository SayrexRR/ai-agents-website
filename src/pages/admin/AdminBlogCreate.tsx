import { useNavigate } from "react-router-dom";
import BlogForm from "../../components/admin/BlogForm";
import { supabase } from "../../lib/supabaseClient";
import type { BlogPost } from "../../interfaces/Blog";
import { toast } from "sonner";

const AdminBlogCreate = () => {
  const navigate = useNavigate();

  async function handleSave(post: BlogPost) {
    const { error } = await supabase.from("blog_posts").insert([post]);
    if (!error) {
      navigate("/admin/blog");
      toast.success("Блог создано");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 font-semibold">Создать новый блог</h1>
      <BlogForm onSave={handleSave} />
    </div>
  );
};

export default AdminBlogCreate;
