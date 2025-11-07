import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .single();
      if (!error && data) {
        setSettings(data);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer
      id="footer"
      className="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Лого та опис */}
        <div>
          <h2 className="text-3xl font-extrabold text-blue-600 tracking-tight">
            {settings?.site_name || "AI Agents"}
          </h2>
          <p className="text-gray-600 mt-3 leading-relaxed">
            {settings?.site_description ||
              "Мы создаем интеллектуальных агентов, которые помогают бизнесу расти и экономить ресурсы."}
          </p>
        </div>

        {/* Навігація */}
        <div>
          <h3 className="font-semibold text-gray-800 uppercase tracking-wide">
            Навигация
          </h3>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-600 transition">
                Главная
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-blue-600 transition">
                Услуги
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="hover:text-blue-600 transition">
                Портфолио
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-blue-600 transition">
                Блог
              </Link>
            </li>
          </ul>
        </div>

        {/* Контакти + соцмережі */}
        <div className="flex flex-col items-start">
          <h3 className="font-semibold text-gray-800 uppercase tracking-wide">
            Контакты
          </h3>
          <p className="mt-3 text-gray-600">
            Email: {settings?.contact_email || "info@aiagents.com"}
          </p>
          <p className="text-gray-600">
            Тел: {settings?.contact_phone || "+380 00 000 00 00"}
          </p>

          {/* Соцмережі під контактами */}
          <div className="flex gap-4 mt-6">
            {settings?.facebook_url && (
              <a
                href={settings.facebook_url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                <FaFacebookF />
              </a>
            )}
            {settings?.instagram_url && (
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 text-white hover:opacity-90 transition"
              >
                <FaInstagram />
              </a>
            )}
            {settings?.linkedin_url && (
              <a
                href={settings.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800 transition"
              >
                <FaLinkedinIn />
              </a>
            )}
            {settings?.twitter_url && (
              <a
                href={settings.twitter_url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-400 text-white hover:bg-sky-500 transition"
              >
                <FaTwitter />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Нижній рядок */}
      <div className="text-center text-gray-500 py-6 border-t">
        © {new Date().getFullYear()} {settings?.site_name || "AI Agents"}. Все
        права защищены.
      </div>
    </footer>
  );
};

export default Footer;
