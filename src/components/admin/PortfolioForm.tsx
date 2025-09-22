import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const PortfolioForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Завантаження зображення у Supabase Storage
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) {
      setMessage("❌ Потрібно увійти в акаунт для завантаження");
      return;
    }

    let imageUrl: string | null = null;

    if (file) {
      const ext = file.name.split(".").pop();
      const path = `${userId}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(path, file);

      if (uploadError) {
        setMessage(
          "❌ Помилка завантаження зображення: " + uploadError.message
        );
        return;
      }

      const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
      imageUrl = data.publicUrl;
    }

    // ✅ Додаємо запис у таблицю
    const { error } = await supabase.from('portfolio_items').insert([
      { title, description, project_url: projectUrl, image_url: imageUrl },
    ]);

    if (error) {
      setMessage('❌ Помилка: ' + error.message);
    } else {
      setMessage('✅ Проєкт додано!');
      setTimeout(() => navigate('/admin/portfolio'), 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-bold mb-4">Додати новий проєкт</h3>
      <input
        type="text"
        placeholder="Назва"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <textarea
        placeholder="Опис"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="url"
        placeholder="Посилання на проєкт"
        value={projectUrl}
        onChange={e => setProjectUrl(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files?.[0] || null)}
        className="w-full mb-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Додати
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
};

export default PortfolioForm;