/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import { supabase } from "../../lib/supabaseClient";
import { Editor } from "@tinymce/tinymce-react";
import type { BlogPost } from "../../interfaces/Blog";
import { toast } from "sonner";

interface BlogFormProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => Promise<void>;
}

const BlogForm = ({ post, onSave }: BlogFormProps) => {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [author, setAuthor] = useState(post?.author || "");
  const [content, setContent] = useState(post?.content || "");
  const [coverImage, setCoverImage] = useState(post?.cover_image || "");
  const [uploading, setUploading] = useState(false);

  const editorRef = useRef<any>(null);

  // --- Завантаження обкладинки ---
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const ext = file.name.split(".").pop();
      const fileName = `cover-${Date.now()}.${ext}`;
      const filePath = `covers/${fileName}`;

      const { error } = await supabase.storage
        .from("blog")
        .upload(filePath, file);
      if (error) throw error;

      const { data } = supabase.storage.from("blog").getPublicUrl(filePath);
      setCoverImage(data.publicUrl);

      toast.success("Обложка загружена!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Ошибка при загрузки изображения");
    } finally {
      setUploading(false);
    }
  }

  // --- Завантаження зображень у TinyMCE ---
  async function handleEditorImageUpload(blobInfo: any) {
    try {
      const file = blobInfo.blob();
      const ext = file.name?.split(".").pop() || "jpg";
      const fileName = `content-${Date.now()}.${ext}`;
      const filePath = `content/${fileName}`;

      const { error } = await supabase.storage
        .from("blog")
        .upload(filePath, file);
      if (error) throw error;

      const { data } = supabase.storage.from("blog").getPublicUrl(filePath);
      return data.publicUrl;
    } catch (err) {
      console.error("TinyMCE image upload error:", err);
      toast.error("Не получилось загрузить изображение");
      throw err;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newPost: BlogPost = {
      title,
      slug,
      author,
      content,
      cover_image: coverImage,
    };
    await onSave(newPost);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-200"
    >
      {/* Заголовок + Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-gray-700 font-medium">Название</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите заголовок блога"
            className="mt-1 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <Label className="text-gray-700 font-medium">Slug</Label>
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="my-blog-post"
            className="mt-1 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Автор */}
      <div>
        <Label className="text-gray-700 font-medium">Автор</Label>
        <Input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Імя автора"
          className="mt-1 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Обкладинка */}
      <div>
        <Label className="text-gray-700 font-medium">Обложка</Label>
        <div className="flex items-center gap-3 mt-1">
          <input type="file" onChange={handleUpload} disabled={uploading} />
          {uploading && (
            <span className="text-gray-500 text-sm">Загрузка...</span>
          )}
        </div>
        {coverImage && (
          <img
            src={coverImage}
            alt="Cover"
            className="mt-4 w-full max-h-72 object-cover rounded-md shadow"
          />
        )}
      </div>

      {/* TinyMCE */}
      <div>
        <Label className="text-gray-700 font-medium">Контент</Label>
        <div className="mt-2 border rounded-md overflow-hidden shadow-sm">
          <Editor
            apiKey="jb9ojt9iaqebw95wfigxi8ph7lcpbxm8a52nh2y0jw13pyvi"
            value={content}
            onInit={(_, editor) => (editorRef.current = editor)}
            onEditorChange={(newValue) => setContent(newValue)}
            init={{
              height: 600,
              menubar: true,
              automatic_uploads: true,
              file_picker_types: "image",
              images_upload_handler: handleEditorImageUpload,
              plugins:
                "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount help emoticons",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | image media link | code fullscreen preview | help",
              font_family_formats:
                "Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; Georgia=georgia,palatino; Tahoma=tahoma,arial,helvetica,sans-serif; Times New Roman=times new roman,times; Verdana=verdana,geneva;",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:16px; line-height:1.6; }",
            }}
          />
        </div>
      </div>

      {/* Кнопка */}
      <Button
        type="submit"
        className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition"
      >
        Сохранить статью
      </Button>
    </form>
  );
};

export default BlogForm;
