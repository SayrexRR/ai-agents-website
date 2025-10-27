/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { toast } from "sonner";
import PortfolioForm from "../../components/admin/PortfolioForm";
import type { PortfolioItem } from "../../interfaces/Portfolio";

const AdminPortfolioEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Завантаження елемента портфоліо
  useEffect(() => {
    const fetchItem = async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select(
          "id, title, description, image_url, project_url, created_at"
        )
        .eq("id", id)
        .single();

      if (error) {
        toast.error("Не получилось загрузить работу");
      } else {
        setItem(data);
      }
      setLoading(false);
    };

    if (id) fetchItem();
  }, [id]);

  // Збереження змін
  const handleSave = async (formData: any) => {
    const { error } = await supabase
      .from("portfolio_items")
      .update({
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url,
        project_url: formData.project_url,
      })
      .eq("id", id);

    if (error) {
      toast.error("Ошибка при обновлении работы");
    } else {
      toast.success("Работу оновлено");
      navigate("/admin/portfolio");
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Загрузка...</p>;
  if (!item) return <p className="p-6 text-gray-500">Работу не найдено</p>;

  return (
    <div className="p-6">
      <PortfolioForm existingItem={item} onSave={handleSave} />
    </div>
  );
};

export default AdminPortfolioEdit;
