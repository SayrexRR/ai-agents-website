import { Bot } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { label: 'Головна', path: '/' },
        { label: 'Послуги', path: '/services' },
        { label: 'Портфоліо', path: '/portfolio' },
        { label: 'Блог', path: '/blog' },
        { label: 'Контакти', path: '/contact' },
        { label: 'Адмін', path: '/admin' },
        { label: 'Логін', path: '/login' },
    ];

    const isActive = (href: string) => location.pathname === href;

    return (
        <nav className="w-full sticky top-0 z-50 bg-white backdrop-blur-md border-b">
            <div className="w-full mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
                        <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <span className="bg-blue-400 bg-clip-text text-transparent">
                            AI Agents
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center space-x-7">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-blue-400 pb-1",
                                    isActive(item.path)
                                        ? "text-blue-500 border-b-2 pb-1"
                                        : "text-gray-400"
                                )}
                                >
                                    {item.label}
                                </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;