import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { BlogPost } from "../interfaces/Blog"; 
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, content, slug, created_at, cover_image")
        .order("created_at", { ascending: false });
      setPosts(data || []);
    };
    fetchPosts();
  }, []);

  return (
    <Layout>
      <div className="w-full py-8 px-6">
        <h1 className="text-3xl font-bold mb-6">Блог</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="bg-white rounded shadow hover:shadow-lg transition p-4"
            >
              {post.cover_image && (
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;