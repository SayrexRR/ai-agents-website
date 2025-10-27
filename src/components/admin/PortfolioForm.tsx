/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { toast } from "sonner";

interface PortfolioFormProps {
  existingItem?: any;
  onSave: (data: any) => Promise<void>;
}

const PortfolioForm = ({ existingItem, onSave }: PortfolioFormProps) => {
  const [title, setTitle] = useState(existingItem?.title || "");
  const [description, setDescription] = useState(
    existingItem?.description || ""
  );
  const [projectUrl, setProjectUrl] = useState(existingItem?.project_url || "");
  const [imageUrl, setImageUrl] = useState(existingItem?.image_url || "");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("portfolio")
        .upload(fileName, file);
      if (error) throw error;

      const { data } = supabase.storage
        .from("portfolio")
        .getPublicUrl(fileName);
      setImageUrl(data.publicUrl);
      toast.success("✅ Изображение успешно загружено");
    } catch (err) {
      console.error(err);
      toast.error("❌ Ошибка при загрузке изображения");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      project_url: projectUrl,
      image_url: imageUrl,
    };
    await onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="p-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            {existingItem ? "Редактировать работу" : "Добавить работу"}
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Левая часть */}
          <div className="space-y-4">
            <div>
              <Label>Название</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите название проекта"
                required
                className="mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label>Описание</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Краткое описание проекта"
                className="mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label>Ссылка на проект</Label>
              <Input
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="https://example.com"
                className="mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Правая часть */}
          <div className="space-y-4">
            <Label>Изображение</Label>
            <input type="file" onChange={handleUpload} disabled={uploading} />
            {uploading && <p className="text-sm text-gray-500">Загрузка...</p>}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Превью"
                className="mt-3 w-full max-h-64 object-cover rounded-lg shadow"
              />
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" className="px-8">
          {existingItem ? "Сохранить изменения" : "Создать"}
        </Button>
      </div>
    </form>
  );
};

export default PortfolioForm;
