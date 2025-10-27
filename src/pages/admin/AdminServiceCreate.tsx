/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import ServiceForm from "../../components/admin/ServiceForm";
import { toast } from "sonner";

const AdminServiceCreate = () => {
  const navigate = useNavigate();

  const handleSave = async (service: any) => {
    const { data, error } = await supabase
      .from("services")
      .insert([
        {
          title: service.title,
          description: service.description,
          price: service.price,
          icon_url: service.icon_url,
        },
      ])
      .select()
      .single();

    if (error || !data) {
      toast.error("Ошибка при создании сервиса");
      return;
    }

    if (service.details?.length) {
      const relations = service.details.map((d: any) => ({
        service_id: data.id,
        detail_id: d.id,
      }));
      await supabase.from("service_details").insert(relations);
    }

    toast.success("Сервис создано");
    navigate("/admin/services");
  };

  return (
    <div className="p-6">
      <ServiceForm onSave={handleSave} />
    </div>
  );
};

export default AdminServiceCreate;
