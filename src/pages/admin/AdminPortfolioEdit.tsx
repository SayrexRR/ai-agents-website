/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

const BUCKET = "portfolio";

async function getUserId() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user.id;
}

async function uploadImage(file: File, userId: string) {
  const ext = file.name.split(".").pop();
  const path = `${userId}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

const AdminPortfolioEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setMessage("❌ Не вдалося завантажити проєкт");
      } else if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setLink(data.project_url);
        setImageUrl(data.image_url || "");
      }
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const userId = await getUserId();
      if (!userId) {
        setMessage("❌ Потрібно увійти для редагування");
        return;
      }

      let newImageUrl = imageUrl;
      if (file) {
        newImageUrl = await uploadImage(file, userId);
      }

      const { error } = await supabase
        .from("portfolio_items")
        .update({
          title,
          description,
          project_url: link,
          image_url: newImageUrl,
        })
        .eq("id", id);

      if (error) throw error;

      setMessage("✅ Проєкт оновлено!");
      setTimeout(() => navigate("/admin/portfolio"), 1000);
    } catch (err: any) {
      setMessage("❌ Помилка: " + (err.message || "невідома"));
    }
  };

  if (loading) return <p>Завантаження…</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Редагування проєкту</h2>
      <form
        onSubmit={handleUpdate}
        className="p-4 bg-white rounded shadow space-y-3"
      >
        <input
          type="text"
          placeholder="Назва"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Опис"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded h-32"
          required
        />
        <input
          type="url"
          placeholder="Посилання на проєкт"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {imageUrl && (
          <div>
            <p className="text-sm text-gray-600">Поточне зображення:</p>
            <img
              src={imageUrl}
              alt="cover"
              className="w-32 h-32 object-cover rounded"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full"
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

export default AdminPortfolioEdit;
