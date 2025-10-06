/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/Dialog";
import { icons, Plus, X } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { toast } from "sonner";
import IconPicker from "../IconPicker";

interface Detail {
  id: string | number;
  name: string;
}

interface ServiceFormProps {
  existingService?: any;
  onSave: (serviceData: any) => Promise<void>;
}

type IconKey = keyof typeof icons;

const ServiceForm = ({ existingService, onSave }: ServiceFormProps) => {
  const [title, setTitle] = useState(existingService?.title || "");
  const [description, setDescription] = useState(
    existingService?.description || ""
  );
  const [price, setPrice] = useState(existingService?.price || "");
  const [icon, setIcon] = useState<IconKey | null>(
    existingService?.icon_url || "Package"
  );

  const [availableDetails, setAvailableDetails] = useState<Detail[]>([]);
  const [selectedDetails, setSelectedDetails] = useState<Detail[]>(
    existingService?.details || []
  );

  const [selectedDetailId, setSelectedDetailId] = useState<string>("");
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [newDetailName, setNewDetailName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const { data, error } = await supabase.from("details").select("*");
      if (error) {
        console.error(error);
        return;
      }
      const merged = [...(data || [])];
      if (existingService?.details) {
        for (const d of existingService.details) {
          if (!merged.find((m) => String(m.id) === String(d.id)))
            merged.push(d);
        }
      }
      setAvailableDetails(merged);
    };
    fetchDetails();
  }, [existingService?.id]);

  const handleAddDetail = () => {
    if (!selectedDetailId) {
      toast("Выберите деталь из списка");
      return;
    }
    const found = availableDetails.find(
      (d) => String(d.id) === String(selectedDetailId)
    );
    if (!found) return;
    if (selectedDetails.find((d) => String(d.id) === String(found.id))) {
      toast("Деталь уже добавлена");
      setSelectedDetailId("");
      return;
    }
    setSelectedDetails((prev) => [...prev, found]);
    setSelectedDetailId("");
  };

  const handleRemoveDetail = (id: string | number) => {
    setSelectedDetails((prev) =>
      prev.filter((d) => String(d.id) !== String(id))
    );
  };

  const handleCreateDetail = async () => {
    const name = newDetailName.trim();
    if (!name) return;
    try {
      const { data, error } = await supabase
        .from("details")
        .insert([{ name }])
        .select()
        .single();
      if (error || !data) {
        toast.error("Ошибка при создании детали");
        return;
      }
      setAvailableDetails((prev) => [...prev, data]);
      setSelectedDetails((prev) => [...prev, data]);
      setNewDetailName("");
      setDetailModalOpen(false);
      toast.success("Деталь создана");
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при создании детали");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);

    const payload = {
      id: existingService?.id,
      title,
      description,
      price,
      icon_url: icon,
      details: selectedDetails,
    };

    try {
      await onSave(payload);
    } catch (err) {
      toast.error("Ошибка при сохранении");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              {existingService ? "Редактировать услугу" : "Создать услугу"}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT */}
            <div className="space-y-4">
              <div>
                <Label>Название</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <Label>Описание</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <Label>Цена (€)</Label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="mt-1 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <Label>Иконка</Label>
                <IconPicker value={icon ?? undefined} onChange={setIcon} />
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="font-medium">Детали услуги</Label>
                <Button
                  type="button"
                  className="flex items-center gap-1 bg-green-500 hover:bg-green-600"
                  onClick={() => setDetailModalOpen(true)}
                >
                  <Plus className="w-4 h-4" /> Новая деталь
                </Button>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-2">
                <select
                  value={selectedDetailId}
                  onChange={(e) => setSelectedDetailId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">-- Выберите деталь --</option>
                  {availableDetails.map((d) => (
                    <option key={String(d.id)} value={String(d.id)}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <Button type="button" onClick={handleAddDetail}>
                  Добавить
                </Button>
              </div>

              {/* Selected details as tags */}
              <div className="flex flex-wrap gap-2">
                {selectedDetails.map((d) => (
                  <span
                    key={String(d.id)}
                    className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200"
                  >
                    {d.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveDetail(d.id)}
                      className="hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="px-8" disabled={isSaving}>
            {isSaving ? "Сохраняю..." : "Сохранить"}
          </Button>
        </div>
      </form>

      {/* Modal to create new detail */}
      <Dialog open={isDetailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Новая деталь</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Label>Название детали</Label>
            <Input
              value={newDetailName}
              onChange={(e) => setNewDetailName(e.target.value)}
              placeholder="Например: Круглосуточная поддержка"
            />
          </div>

          <DialogFooter className="mt-4">
            <Button
              variant="secondary"
              onClick={() => setDetailModalOpen(false)}
            >
              Отменить
            </Button>
            <Button onClick={handleCreateDetail}>Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceForm;