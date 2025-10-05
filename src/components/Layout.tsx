import Navbar from './Navbar';
import Footer from './Footer';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from "@vercel/analytics/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
        <SpeedInsights />
        <Analytics />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;