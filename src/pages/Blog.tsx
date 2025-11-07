import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import type { BlogPost } from "../interfaces/Blog";

const BlogListPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Завантаження...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Блог</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group block border border-gray-200 hover:shadow-lg transition bg-white"
          >
            {/* Фото зверху */}
            {post.cover_image && (
              <div className="h-56 overflow-hidden">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            {/* Текст під фото */}
            <div className="p-6 flex flex-col justify-between">
              <h2 className="text-2xl font-semibold text-blue-600 group-hover:underline transition">
                {post.title}
              </h2>
              <p
                className="text-gray-700 mt-3 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: post.content.slice(0, 200) + "...",
                }}
              />
              <div className="mt-4 text-sm flex items-center justify-between">
                <span className="text-blue-600 font-medium">
                  {post.author || "Адміністратор"}
                </span>
                <span className="text-blue-600">
                  {new Date(post.created_at!).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogListPage;
