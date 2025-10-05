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
import { icons } from "lucide-react";
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
  const [icon, setIcon] = useState<IconKey | null>(existingService?.icon_url || "Package");

  const [availableDetails, setAvailableDetails] = useState<Detail[]>([]);
  const [selectedDetails, setSelectedDetails] = useState<Detail[]>(
    existingService?.details || []
  );

  // native select state
  const [selectedDetailId, setSelectedDetailId] = useState<string>("");

  // modal for creating new detail
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [newDetailName, setNewDetailName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // icons
  // const iconList = Object.keys(LucideIcons).slice(0, 200);

  useEffect(() => {
    const fetchDetails = async () => {
      const { data, error } = await supabase.from("details").select("*");
      if (error) {
        console.error(error);
        return;
      }
      // merge with any existingService.details to ensure no missing items
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingService?.id]);

  const handleAddDetail = () => {
    if (!selectedDetailId) {
      toast("Выберете деталь из списка");
      return;
    }
    const found = availableDetails.find(
      (d) => String(d.id) === String(selectedDetailId)
    );
    if (!found) {
      toast.error("Выбирите деталь из списка");
      return;
    }
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
        console.error(error);
        toast.error("Ошибка при создании детали");
        return;
      }
      // add to available and selected (UX: new detail becomes selected right away)
      setAvailableDetails((prev) => [...prev, data]);
      setSelectedDetails((prev) => [...prev, data]);
      setNewDetailName("");
      setDetailModalOpen(false);
      toast.success("Деталь создано");
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
      details: selectedDetails, // array of {id, name}
    };

    try {
      await onSave(payload); // parent (AdminServiceCreate / AdminServiceEdit) must handle insert/update + relations
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при сохранении");
    } finally {
      setIsSaving(false);
    }
  };

  // const IconPreview = (LucideIcons as any)[icon] || LucideIcons.Package;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* LEFT */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Название</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Описание</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <Label>Цена (€)</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Иконка</Label>
              {/* <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto border p-2 rounded">
                {iconList.map((iconName) => {
                  const IconComp = (LucideIcons as any)[iconName];
                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => setIcon(iconName)}
                      className={`p-2 rounded border ${
                        icon === iconName
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      } hover:border-blue-300`}
                    >
                      <IconComp className="w-5 h-5 mx-auto text-gray-700" />
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center mt-3">
                <IconPreview className="w-6 h-6 text-blue-600 mr-2" />
                <span className="text-sm text-gray-700">{icon}</span>
              </div> */}
              <IconPicker
                value={icon ?? undefined}
                onChange={setIcon}
              />
            </div>
          </CardContent>
        </Card>

        {/* RIGHT */}
        <Card className="p-6">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Детали услуги</CardTitle>
              <Button
                className="bg-green-500 hover:bg-green-600"
                type="button"
                onClick={() => setDetailModalOpen(true)}
              >
                Добавить новую деталь
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* select + add button: select займатиме всю доступну ширину правої колонки */}
            <div className="grid grid-cols-[1fr_auto] gap-2 mb-4">
              <select
                value={selectedDetailId}
                onChange={(e) => setSelectedDetailId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="">-- Выбирите деталь --</option>
                {availableDetails.map((d) => (
                  <option key={String(d.id)} value={String(d.id)}>
                    {d.name}
                  </option>
                ))}
              </select>

              <Button type="button" onClick={handleAddDetail}>
                Выбрать
              </Button>
            </div>

            {/* selected details */}
            <ul className="space-y-2">
              {selectedDetails.map((d) => (
                <li
                  key={String(d.id)}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-200"
                >
                  <span>{d.name}</span>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleRemoveDetail(d.id)}
                  >
                    Удалить
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="md:col-span-2 flex justify-end">
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
