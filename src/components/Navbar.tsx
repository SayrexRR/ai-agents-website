import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const navItems = [
        { label: 'Головна', path: '/' },
        { label: 'Послуги', path: '/services' },
        { label: 'Портфоліо', path: '/portfolio' },
        { label: 'Блог', path: '/blog' },
        { label: 'Контакти', path: '/contact' },
        { label: 'Адмін', path: '/admin' },
        { label: 'Логін', path: '/login' },
    ];

    return (
      <header className="w-full fixed top-0 left-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <div className="text-2xl font-bold text-blue-600">AI Agents</div>
          <nav className="hidden md:flex space-x-6">
            {navItems.map((link) => (
              <a
                key={link.label}
                href={link.path}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#order"
            className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Order
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded hover:bg-gray-100"
        >
            {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        </div>

        {open && (
            <div className="md:hidden bg-white shadow-lg">
                {navItems.map((link) => (
                    <a
                        key={link.label}
                        href={link.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                    >
                        {link.label}
                    </a>
                ))}
                <a
                    href="#order"
                    className="block px-4 py-2 bg-blue-600 text-white text-center"
                    onClick={() => setOpen(false)}
                >
                    Order
                </a>
            </div>
        )}
      </header>
    );
};

export default Navbar;