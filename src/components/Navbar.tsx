import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useSettings } from "../lib/useSettings";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const settings = useSettings();

  const navItems = [
    { label: "Главная", path: "/" },
    { label: "Услуги", path: "/services" },
    { label: "Портфолио", path: "/portfolio" },
    { label: "Блог", path: "/blog" },
    { label: "Контакты", path: "/contact" },
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
              {settings?.site_name || "AI Agents"}
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

        {/* CTA */}
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
            <a
              href="/#order"
              onClick={() => setMenuOpen(false)}
              className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Заказать
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
