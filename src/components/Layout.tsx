import { useEffect } from "react";
import { useSettings } from "../lib/useSettings";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const settings = useSettings();

  useEffect(() => {
    if (settings) {
      document.title = settings.seo_title || settings.site_name;

      const description = document.querySelector("meta[name='description']");
      if (description)
        description.setAttribute("content", settings.seo_description || "");

      const keywords = document.querySelector("meta[name='keywords']");
      if (keywords)
        keywords.setAttribute("content", settings.seo_keywords || "");

      const ogImage = document.querySelector("meta[property='og:image']");
      if (ogImage) ogImage.setAttribute("content", settings.seo_og_image || "");
    }
  }, [settings]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
