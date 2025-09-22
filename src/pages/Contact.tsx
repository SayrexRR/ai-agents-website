import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Layout from "../components/Layout";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    if (!name || !email || !message) {
      setStatus("❌ Заповніть усі поля");
      return;
    }

    const { error } = await supabase
      .from("messages")
      .insert([{ name, email, message }]);

    if (error) {
      setStatus("❌ Помилка: " + error.message);
    } else {
      setStatus("✅ Повідомлення надіслано!");
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-2xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-6">Звʼяжіться зі мною</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow space-y-4"
        >
          <input
            type="text"
            placeholder="Ваше імʼя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Ваше повідомлення"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded h-40"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Надіслати
          </button>
          {status && <p className="mt-2">{status}</p>}
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
