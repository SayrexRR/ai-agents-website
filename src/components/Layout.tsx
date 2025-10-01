import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-sans">
      <Navbar />
        <main className="pt-20">
          {children}
        </main>
      <Footer />
    </div>
  );
};

export default Layout;