import { useSettings } from "../lib/useSettings";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";

const Footer = () => {
  const settings = useSettings();

  return (
    <footer className="bg-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Logo + description */}
        <div>
          <h2 className="text-3xl font-extrabold text-blue-600">
            {settings?.site_name || "AI Agents"}
          </h2>
          <p className="text-gray-600 mt-3">
            {settings?.site_description ||
              "Интеллектуальные агенты для бизнеса."}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-gray-800 uppercase">Навигация</h3>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li>
              <a href="/" className="hover:text-blue-600">
                Главная
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-blue-600">
                Услуги
              </a>
            </li>
            <li>
              <a href="/portfolio" className="hover:text-blue-600">
                Портфолио
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-blue-600">
                Блог
              </a>
            </li>
          </ul>
        </div>

        {/* Contacts + socials */}
        <div className="items-center flex flex-col">
          <h3 className="font-semibold text-gray-800 uppercase">Контакты</h3>
          <p className="mt-3 text-gray-600 break-words">
            Email: {settings?.contact_email}
          </p>
          <p className="text-gray-600 break-words">
            Тел: {settings?.contact_phone}
          </p>

          <div className="flex gap-4 mt-4">
            {settings?.facebook_url && (
              <a
                href={settings.facebook_url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                <FaFacebookF />
              </a>
            )}
            {settings?.instagram_url && (
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-500 text-white hover:bg-pink-600"
              >
                <FaInstagram />
              </a>
            )}
            {settings?.linkedin_url && (
              <a
                href={settings.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800"
              >
                <FaLinkedinIn />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 py-6 border-t">
        © {new Date().getFullYear()} {settings?.site_name || "AI Agents"}.
      </div>
    </footer>
  );
};

export default Footer;
