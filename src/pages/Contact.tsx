import { useSettings } from "../lib/useSettings";
import ContactForm from "../components/ContactForm";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Contact = () => {
  const settings = useSettings();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-12">Контакты</h1>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Контактна інформація */}
        {settings && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 text-center shadow hover:shadow-md transition">
                <FaEnvelope className="mx-auto text-blue-600 w-8 h-8 mb-2" />
                <p className="font-semibold">Email</p>
                <p className="text-gray-700 break-words">
                  {settings.contact_email}
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-6 text-center shadow hover:shadow-md transition">
                <FaPhoneAlt className="mx-auto text-green-600 w-8 h-8 mb-2" />
                <p className="font-semibold">Телефон</p>
                <p className="text-gray-700 break-words">
                  {settings.contact_phone}
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6 text-center shadow hover:shadow-md transition">
                <FaMapMarkerAlt className="mx-auto text-red-600 w-8 h-8 mb-2" />
                <p className="font-semibold">Адресс</p>
                <p className="text-gray-700 break-words">
                  {settings.contact_address}
                </p>
              </div>
            </div>

            {/* Соцмережі */}
            <div className="flex justify-center gap-6 mt-6">
              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition"
                >
                  <FaFacebookF />
                </a>
              )}
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-pink-500 text-white p-4 rounded-full hover:bg-pink-600 transition"
                >
                  <FaInstagram />
                </a>
              )}
              {settings.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-700 text-white p-4 rounded-full hover:bg-blue-800 transition"
                >
                  <FaLinkedinIn />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Форма */}
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
            Напишите нам
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Оставьте сообщение, и мы свяжемся с вами в ближайшее время
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
