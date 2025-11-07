import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "sonner";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Запис у БД
      const { error } = await supabase.from("messages").insert([form]);
      if (error) throw error;

      // 2. Отримати email з settings
      const { data: settings, error: settingsError } = await supabase
        .from("settings")
        .select("*")
        .single();
      if (settingsError) throw settingsError;

      // 3. Виклик Edge Function для відправки email
      const response = await supabase.functions.invoke("send-message", {
        body: {
          to: settings.contact_email,
          name: form.name,
          email: form.email,
          message: form.message,
        },
      });

      if (!response.error) {
        throw new Error("Ошибка при отправки email");
      }

      toast.success("Сообщение отправлено!");
      setForm({ name: "", email: "", message: "" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error("Случилась ошибка. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Ваше имя"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Ваш email"
        value={form.email}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />
      <textarea
        name="message"
        placeholder="Ваше сообщение"
        value={form.message}
        onChange={handleChange}
        className="w-full border rounded p-2 h-32"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Отправление..." : "Отправить"}
      </button>
    </form>
  );
};

export default ContactForm;
