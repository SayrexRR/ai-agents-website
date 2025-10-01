import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
      <Footer />
    </div>
  );
};

export default Layout;