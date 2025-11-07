import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ContactForm from "../components/ContactForm";
import Layout from "../components/Layout";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Contact = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("settings").select("*").single();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight">
          Контакты
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Контактна інформація */}
          {settings && (
            <div className="space-y-8">
              {/* Три картки */}
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 text-center shadow hover:shadow-md transition">
                  <FaEnvelope className="mx-auto text-blue-600 w-8 h-8 mb-2" />
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-700 break-words">
                    {settings.contact_email}
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-6 text-center shadow hover:shadow-md transition">
                  <FaPhoneAlt className="mx-auto text-green-600 w-8 h-8 mb-2" />
                  <p className="font-semibold">Телефон</p>
                  <p className="text-gray-700 break-words">
                    {settings.contact_phone}
                  </p>
                </div>

                <div className="bg-red-50 rounded-xl p-6 text-center shadow hover:shadow-md transition">
                  <FaMapMarkerAlt className="mx-auto text-red-600 w-8 h-8 mb-2" />
                  <p className="font-semibold">Адресс</p>
                  <p className="text-gray-700 break-words">
                    {settings.contact_address}
                  </p>
                </div>
              </div>

              {/* Соцмережі — круглі значки під контактами */}
              <div className="flex flex-wrap justify-center gap-4">
                {settings.facebook_url && (
                  <a
                    href={settings.facebook_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shadow"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                )}
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 text-white hover:opacity-90 transition shadow"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                )}
                {settings.linkedin_url && (
                  <a
                    href={settings.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800 transition shadow"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Форма */}
          <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
              Напишите нам
            </h2>
            <p className="text-gray-500 text-center mb-6">
              Оставте сообщение — мы свяжемся с вами в ближайшее время.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;