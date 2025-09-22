/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const BLOG_BUCKET = "blog";

async function getUserId() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user.id;
}

async function uploadCover(file: File, userId: string) {
  const ext = file.name.split(".").pop();
  const path = `${userId}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BLOG_BUCKET)
    .upload(path, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(BLOG_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const userId = await getUserId();
      if (!userId) {
        setMessage("❌ Потрібно увійти в акаунт для створення статті");
        return;
      }

      let coverImage: string | null = null;
      if (cover) {
        coverImage = await uploadCover(cover, userId);
      }

      const { error } = await supabase
        .from("blog_posts")
        .insert([{ title, slug, content, cover_image: coverImage }]);

      if (error) throw error;

      setMessage("✅ Статтю створено!");
      setTimeout(() => navigate("/admin/blog"), 1000);
    } catch (err: any) {
      setMessage("❌ Помилка: " + (err.message || "невідома"));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Нова стаття</h2>
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Markdown контент"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-2 p-2 border rounded h-64 font-mono"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files?.[0] || null)}
          className="w-full mb-3"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Зберегти
        </button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;
