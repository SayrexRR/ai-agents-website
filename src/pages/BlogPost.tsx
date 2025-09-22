import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import type { BlogPost } from "../interfaces/Blog"; 
import Layout from "../components/Layout";
import ReactMarkdown from 'react-markdown';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) console.error(error);
      else setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading)
    return (
      <Layout>
        <p className="p-6">Завантаження...</p>
      </Layout>
    );
  if (!post)
    return (
      <Layout>
        <p className="p-6">Статтю не знайдено</p>
      </Layout>
    );

  return (
    <Layout>
      <div className="w-full py-8 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-64 object-cover rounded mb-6"
          />
        )}
        <article className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </div>
    </Layout>
  );
};

export default BlogPostPage;
