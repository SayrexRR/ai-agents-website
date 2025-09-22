import ServiceForm from "../../components/admin/ServiceForm";


const AdminServiceCreate = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Нова послуга</h2>
      <ServiceForm onAdded={function (): void {
              throw new Error("Function not implemented.");
          } } />
    </div>
  );
};

export default AdminServiceCreate;