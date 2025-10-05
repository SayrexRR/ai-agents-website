/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ServiceForm from "../../components/admin/ServiceForm";
import { toast } from "sonner";

const AdminServiceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<any | null>(null);

  useEffect(() => {
    const loadService = async () => {
      const { data: serviceData, error: serviceError } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .single();
      if (serviceError || !serviceData) return;

      const { data: detailLinks } = await supabase
        .from("service_details")
        .select("detail_id, details(name, id)")
        .eq("service_id", id);

      const details = detailLinks?.map((d: any) => d.details) || [];
      setService({ ...serviceData, details });
    };
    loadService();
  }, [id]);

  const handleSave = async (updatedService: any) => {
    const { error } = await supabase
      .from("services")
      .update({
        title: updatedService.title,
        description: updatedService.description,
        price: updatedService.price,
        icon_url: updatedService.icon_url,
      })
      .eq("id", id);

    if (error) {
      toast.error("Ошибка при обновлении");
      return;
    }

    await supabase.from("service_details").delete().eq("service_id", id);
    const relations = updatedService.details.map((d: any) => ({
      service_id: id,
      detail_id: d.id,
    }));
    await supabase.from("service_details").insert(relations);

    toast.success("Сервис оновлен");
    navigate("/admin/services");
  };

  if (!service) return <p className="p-6">Загрузка...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6 font-semibold">Редактировать сервис</h1>
      <ServiceForm existingService={service} onSave={handleSave} />
    </div>
  );
};

export default AdminServiceEdit;
