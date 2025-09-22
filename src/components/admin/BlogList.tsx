import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import type { BlogPost } from "../../interfaces/Blog"; 
import { Link } from "react-router-dom";

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p>Завантаження...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Заголовок</th>
            <th className="px-4 py-2 text-left">Slug</th>
            <th className="px-4 py-2 text-left">Дата</th>
            <th className="px-4 py-2 text-left">Дії</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-t">
              <td className="px-4 py-2">{post.title}</td>
              <td className="px-4 py-2">{post.slug}</td>
              <td className="px-4 py-2">
                {new Date(post.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 space-x-2">
                <Link
                  to={`/admin/blog/edit/${post.id}`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  ✏️
                </Link>
                <button
                  onClick={async () => {
                    if (confirm("Видалити статтю?")) {
                      await supabase
                        .from("blog_posts")
                        .delete()
                        .eq("id", post.id);
                      fetchPosts();
                    }
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
