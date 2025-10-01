import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    if (!name || !email || !message) {
      setStatus("❌ Заполните все поля");
      return;
    }

    const { error } = await supabase
      .from("messages")
      .insert([{ name, email, message }]);

    if (error) {
      setStatus("❌ Ошибка: " + error.message);
    } else {
      setStatus("✅ Сообщение отправоено!");
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 bg-white shadow-lg rounded-xl p-8 space-y-6"
    >
      <input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
        required
      />
      <input
        type="email"
        placeholder="Ваш Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
        required
      />
      <textarea
        placeholder="Опишите ваш запрос"
        value={message}
        rows={5}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Отправить
      </button>
      {status && <p className="mt-2">{status}</p>}
    </form>
  );
};

export default ContactForm;
