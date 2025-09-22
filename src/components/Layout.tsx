import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
      <Footer />
    </div>
  );
};

export default Layout;