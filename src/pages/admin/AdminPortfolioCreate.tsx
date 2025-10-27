/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { toast } from "sonner";
import PortfolioForm from "../../components/admin/PortfolioForm";

const AdminPortfolioCreate = () => {
  const navigate = useNavigate();

  const handleSave = async (formData: any) => {
    const { error } = await supabase.from("portfolio_items").insert([
      {
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url,
        project_url: formData.project_url,
        category: formData.category,
      },
    ]);

    if (error) {
      toast.error("❌ ошибка при создании работи");
    } else {
      toast.success("✅ Работа успешно создана");
      navigate("/admin/portfolio");
    }
  };

  return (
    <div className="p-6">
      <PortfolioForm onSave={handleSave} />
    </div>
  );
};

export default AdminPortfolioCreate;
