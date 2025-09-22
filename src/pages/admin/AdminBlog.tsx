import { Link } from "react-router-dom";
import BlogList from "../../components/admin/BlogList";

const AdminBlog = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Блог</h2>
        <Link
          to="/admin/blog/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Додати статтю
        </Link>
      </div>
      <BlogList />
    </div>
  );
};

export default AdminBlog;
