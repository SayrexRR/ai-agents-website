import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        {/* Лого та опис */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">AI Agents</h2>
          <p className="text-gray-600 mt-2">
            Мы создаем интелектуальных агентов, которые помогают выростать
            бизнесу и экономить ресурсы.
          </p>
        </div>

        {/* Навігація */}
        <div>
          <h3 className="font-semibold text-gray-800">Навигация</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-600">
                Главная
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-blue-600">
                Услуги
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="hover:text-blue-600">
                Портфолио
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-blue-600">
                Блог
              </Link>
            </li>
          </ul>
        </div>

        {/* Контакти */}
        <div>
          <h3 className="font-semibold text-gray-800">Контакты</h3>
          <p className="mt-2 text-gray-600">Email: info@aiagents.com</p>
          <p className="text-gray-600">Тел: +380 00 000 00 00</p>
        </div>
      </div>
      <div className="text-center text-gray-500 py-4 border-t">
        © 2025 AI Agents. Все права захищены.
      </div>
    </footer>
  );
};

export default Footer;
