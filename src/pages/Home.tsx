import { Sparkles, Cpu, Bot, Zap, ArrowUpRight, CheckCircle } from "lucide-react";
import Layout from "../components/Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import ContactForm from "../components/ContactForm";

const Home = () => {
  const dataEfficiency = [
    { name: "До AI", value: 40 },
    { name: "После AI", value: 85 },
  ];

  const dataSavings = [
    { name: "Время", value: 45 },
    { name: "Расходы", value: 30 },
    { name: "Ресурсы", value: 25 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

  return (
    <Layout>
      <div>
        {/* Hero Section */}
        <section className="relative pt-28 md:pt-36 min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
          {/* Декоративні градієнтні бульбашки */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            AI Агенты для вашего бизнеса
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              нового поколения
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl">
            Мы создаем кастомные AI решения, которые автоматизируют процессы,
            оптимизируют работу и помогают економить ваше время.
          </p>
          <a
            href="#order"
            className="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <Sparkles size={20} />
            Узнать больше
          </a>
        </section>

        {/* Services */}
        <section id="services" className="py-20 max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Наши услуги
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <div className="p-6 bg-white shadow rounded-xl text-center hover:shadow-lg transition hover:scale-105">
              <Bot className="mx-auto text-blue-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold">AI чат-боты</h3>
              <p className="text-gray-600 mt-2">
                Інтелектуальные боты для поддерки клиентов.
              </p>
            </div>
            <div className="p-6 bg-white shadow rounded-xl text-center hover:shadow-lg transition hover:scale-105">
              <Zap className="mx-auto text-emerald-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold">Автоматизация процесов</h3>
              <p className="text-gray-600 mt-2">Оптимизация рутинных задач.</p>
            </div>
            <div className="p-6 bg-white shadow rounded-xl text-center hover:shadow-lg transition hover:scale-105">
              <Cpu className="mx-auto text-purple-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold">Інтеграции с сервисами</h3>
              <p className="text-gray-600 mt-2">Связь AI с вашими CRM и ERP.</p>
            </div>
          </div>
          <a
            href="/services"
            className="mt-8 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Все услуги
            <ArrowUpRight />
          </a>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
              Преймущества использования{" "}
              <span className="text-blue-600 bg-clip-text">AI агентов</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Ліва частина – графік ефективності */}
              <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">
                  Возростание эфективности
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dataEfficiency}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Права частина – графік розподілу вигод */}
              <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-4 text-green-600">
                  Оптимизация ресурсов
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dataSavings}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {dataSavings.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/*Чому нас обирають*/}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Почему выбирают{" "}
                  <span className="text-blue-600 bg-clip-text">нас</span>?
                </h2>
                <p className="text-lg text-gray-600 text-left mb-8 leading-relaxed">
                  Мы не просто разрабатываем AI-агентов — мы создаем решения,
                  которые трансформируют ваш бизнес и приносят измеримые
                  результаты.
                </p>

                <ul className="space-y-4 mb-8">
                  {[
                    "Персонализированные решения под ваши задачи",
                    "Быстрая интеграция с существующими системами",
                    "Постоянная поддержка и дообучение агентов",
                    "Прозрачная отчетность и аналитика",
                    "Гарантия качества и соблюдение сроков",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl p-8 shadow-2xl border-0">
                <div className="space-y-6">
                  <div className="text-center pb-6 border-b text-gray-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      ROI 300%+
                    </div>
                    <div className="text-gray-600">
                      Средняя окупаемость проектов
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-100 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        -70%
                      </div>
                      <div className="text-xs">
                        Снижение затрат на поддержку
                      </div>
                    </div>
                    <div className="text-center p-4 bg-violet-100 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        +45%
                      </div>
                      <div className="text-xs">Рост конверсии</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Order Form */}
        <section id="order" className="py-20 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Заказать услугу
          </h2>
          <ContactForm />
        </section>
      </div>
    </Layout>
  );
};

export default Home;