import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminServices from "./pages/admin/AdminServices";
import AdminServiceCreate from "./pages/admin/AdminServiceCreate";
import AdminServiceEdit from "./pages/admin/AdminServiceEdit";
import AdminPortfolioEdit from "./pages/admin/AdminPortfolioEdit";
import AdminPortfolio from "./pages/admin/AdminPortfolio";
import AdminPortfolioCreate from "./pages/admin/AdminPortfolioCreate";
import BlogPostPage from "./pages/BlogPost";
import AdminBlogEdit from "./pages/admin/AdminBlogEdit";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminBlogCreate from "./pages/admin/AdminBlogCreate";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminDashboard from "./pages/admin/Admin";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

// 🔹 наш глобальний контекст налаштувань
import { SettingsProvider } from "./context/SettingsContext";
import Layout from "./components/Layout";

const App = () => (
  <SettingsProvider>
    <BrowserRouter>
      <Routes>
        {/* Публічні сторінки з Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout>
              <Services />
            </Layout>
          }
        />
        <Route
          path="/portfolio"
          element={
            <Layout>
              <Portfolio />
            </Layout>
          }
        />
        <Route
          path="/blog"
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Layout>
              <BlogPostPage />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />

        {/* Адмінка без Layout (свій AdminLayout) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<AdminDashboard />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="services/new" element={<AdminServiceCreate />} />
          <Route path="services/edit/:id" element={<AdminServiceEdit />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="portfolio/new" element={<AdminPortfolioCreate />} />
          <Route path="portfolio/edit/:id" element={<AdminPortfolioEdit />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="blog/new" element={<AdminBlogCreate />} />
          <Route path="blog/edit/:id" element={<AdminBlogEdit />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Сторінка логіну */}
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  </SettingsProvider>
);

export default App;
