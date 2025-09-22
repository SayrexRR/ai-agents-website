/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

const BLOG_BUCKET = "blog";

function getExt(fileName: string) {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "jpg";
}

async function getUserId() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user.id;
}

async function uploadCover(file: File, userId: string) {
  const ext = getExt(file.name);
  const path = `${userId}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BLOG_BUCKET)
    .upload(path, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(BLOG_BUCKET).getPublicUrl(path);
  return { publicUrl: data.publicUrl, path };
}

// Extracts "userId/filename.ext" from a public URL like:
// https://<proj>.supabase.co/storage/v1/object/public/blog/userId/filename.ext
function getStoragePathFromPublicUrl(publicUrl: string | null | undefined) {
  if (!publicUrl) return null;
  const marker = `/object/public/${BLOG_BUCKET}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;
  return publicUrl.substring(idx + marker.length);
}

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [coverUrl, setCoverUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
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
        setCoverUrl(data.cover_image || "");
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setSubmitting(true);

    try {
      const userId = await getUserId();
      if (!userId) {
        setMessage("❌ Потрібно увійти в акаунт, щоб редагувати статтю.");
        setSubmitting(false);
        return;
      }

      let newCoverUrl = coverUrl;
      let oldPathToRemove: string | null = null;

      if (file) {
        // remember old path (if existed) for optional cleanup
        oldPathToRemove = getStoragePathFromPublicUrl(coverUrl);

        const { publicUrl } = await uploadCover(file, userId);
        newCoverUrl = publicUrl;
      }

      const { error } = await supabase
        .from("blog_posts")
        .update({
          title,
          slug,
          content,
          cover_image: newCoverUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      // Optional: cleanup old file if a new one was uploaded
      if (file && oldPathToRemove) {
        await supabase.storage.from(BLOG_BUCKET).remove([oldPathToRemove]);
      }

      setMessage("✅ Статтю оновлено!");
      setTimeout(() => navigate("/admin/blog"), 800);
    } catch (err: any) {
      setMessage("❌ Помилка оновлення: " + (err?.message || "невідома"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Завантаження…</p>;

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
        {coverUrl && (
          <div className="mb-3">
            <p className="text-sm text-gray-600">Поточна обкладинка:</p>
            <img
              src={coverUrl}
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
          disabled={submitting}
          className="bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {submitting ? "Зберігаємо…" : "Зберегти"}
        </button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default EditBlog;
