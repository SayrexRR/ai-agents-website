import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const AdminServiceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      const { data, error } = await supabase.from('services').select('*').eq('id', id).single();
      if (error) {
        setMessage('❌ Не вдалося завантажити послугу');
      } else if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setIconUrl(data.icon_url);
      }
    };
    fetchService();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('services')
      .update({ title, description, icon_url: iconUrl })
      .eq('id', id);

    if (error) {
      setMessage('❌ Помилка оновлення: ' + error.message);
    } else {
      setMessage('✅ Послугу оновлено!');
      setTimeout(() => navigate('/admin/services'), 1000);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Редагування послуги</h2>
      <form onSubmit={handleUpdate} className="p-4 bg-white rounded shadow">
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
          type="text"
          placeholder="URL іконки"
          value={iconUrl}
          onChange={e => setIconUrl(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Зберегти
        </button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default AdminServiceEdit;