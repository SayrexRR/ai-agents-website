import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import type { BlogPost } from "../interfaces/Blog";
import { ArrowLeft } from "lucide-react";
import Layout from "../components/Layout";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error && data) setPost(data);
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Завантаження...</p>;
  if (!post)
    return <p className="text-center mt-10 text-gray-500">Блог не знайдено.</p>;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Link
          to="/blog"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5" /> Назад до блогу
        </Link>

        {post.cover_image && (
          <div className="w-full h-80 mb-8 overflow-hidden">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-3 text-blue-600">{post.title}</h1>
        <div className="text-sm mb-8 text-blue-600 flex gap-2">
          {post.author && <span className="font-medium">{post.author}</span>}
          <span>•</span>
          <span>{new Date(post.created_at!).toLocaleDateString()}</span>
        </div>

        {/* Контент з TinyMCE */}
        <article
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </Layout>
  );
};

export default BlogPostPage;
