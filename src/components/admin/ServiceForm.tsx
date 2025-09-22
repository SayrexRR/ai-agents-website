import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const ServiceForm = ({ onAdded }: { onAdded: () => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('services').insert([
      { title, description, icon_url: iconUrl },
    ]);

    if (error) {
      setMessage('❌ Помилка: ' + error.message);
    } else {
      setMessage('✅ Послугу додано!');
      setTimeout(() => navigate('/admin/services'), 1000);
      setTitle('');
      setDescription('');
      setIconUrl('');
      onAdded(); // оновити список
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow">
      <h3 className="text-lg font-bold mb-4">Додати нову послугу</h3>
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
        Додати
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
};

export default ServiceForm;