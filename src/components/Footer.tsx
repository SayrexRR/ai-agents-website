const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        {/* Лого та опис */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">AI Agents</h2>
          <p className="text-gray-600 mt-2">
            Ми створюємо інтелектуальних агентів, які допомагають бізнесу
            зростати та економити ресурси.
          </p>
        </div>

        {/* Навігація */}
        <div>
          <h3 className="font-semibold text-gray-800">Навігація</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="#" className="hover:text-blue-600">
                Головна
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-blue-600">
                Послуги
              </a>
            </li>
            <li>
              <a href="#benefits" className="hover:text-blue-600">
                Переваги
              </a>
            </li>
            <li>
              <a href="#order" className="hover:text-blue-600">
                Замовлення
              </a>
            </li>
          </ul>
        </div>

        {/* Контакти */}
        <div>
          <h3 className="font-semibold text-gray-800">Контакти</h3>
          <p className="mt-2 text-gray-600">Email: info@aiagents.com</p>
          <p className="text-gray-600">Тел: +380 00 000 00 00</p>
        </div>
      </div>
      <div className="text-center text-gray-500 py-4 border-t">
        © 2025 AI Agents. Всі права захищені.
      </div>
    </footer>
  );
};

export default Footer;
