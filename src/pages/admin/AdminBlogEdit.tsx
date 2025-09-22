/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

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

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setMessage("❌ Не вдалося завантажити статтю");
      } else if (data) {
        setTitle(data.title);
        setSlug(data.slug);
        setContent(data.content);
        setCoverImage(data.cover_image || "");
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const userId = await getUserId();
      if (!userId) {
        setMessage("❌ Потрібно увійти в акаунт для редагування");
        return;
      }

      let newCoverImage = coverImage;
      if (file) {
        newCoverImage = await uploadCover(file, userId);
      }

      const { error } = await supabase
        .from("blog_posts")
        .update({
          title,
          slug,
          content,
          cover_image: newCoverImage,
        })
        .eq("id", id);

      if (error) throw error;

      setMessage("✅ Статтю оновлено!");
      setTimeout(() => navigate("/admin/blog"), 1000);
    } catch (err: any) {
      setMessage("❌ Помилка: " + (err.message || "невідома"));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Редагування статті</h2>
      <form onSubmit={handleUpdate} className="p-4 bg-white rounded shadow">
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
        {coverImage && (
          <div className="mb-3">
            <p className="text-sm text-gray-600">Поточна обкладинка:</p>
            <img
              src={coverImage}
              alt="cover"
              className="w-32 h-32 object-cover rounded"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
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

export default EditBlog;
