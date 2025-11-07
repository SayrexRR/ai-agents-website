import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("settings").select("*").single();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  const navItems = [
    { label: "Главная", path: "/" },
    { label: "Услуги", path: "/services" },
    { label: "Портфолио", path: "/portfolio" },
    { label: "Блог", path: "/blog" },
    { label: "Контакты", path: "/contact" },
    { label: "Админ", path: "/admin" },
    { label: "Логин", path: "/login" },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {settings?.logo_url ? (
            <img
              src={settings.logo_url}
              alt={settings.site_name || "Logo"}
              className="h-10 w-auto"
            />
          ) : (
            <span className="text-2xl font-bold text-blue-600">
              {settings?.site_name || "AI Agents Site"}
            </span>
          )}
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `px-2 py-1 transition ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-500"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA button */}
        <div className="hidden md:block">
          <a
            href="/#order"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Заказать
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-lg border-t">
          <div className="flex flex-col px-4 py-4 space-y-3">
            <div className="border-b">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-2 py-2 rounded transition ${
                      isActive
                        ? "text-blue-600 bg-blue-100 font-semibold"
                        : "text-gray-700 hover:text-blue-500"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile CTA button */}
            <div className="my-3">
              <a
                href="/#order"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                Заказать
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
