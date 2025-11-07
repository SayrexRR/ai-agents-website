import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Label } from "../../components/ui/Label";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import { toast } from "sonner";

const AdminSettingsPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("settings").select("*").single();
      if (data) setSettings(data);
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    const { error } = await supabase
      .from("settings")
      .update(settings)
      .eq("id", settings.id);
    if (error) toast.error("Ошибка при сохранении");
    else toast.success("Настройки сохранены");
  };

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Настройки сайта</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Загальні */}
        <Card>
          <CardHeader>
            <CardTitle>Обшие</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Название сайта</Label>
              <Input
                value={settings.site_name || ""}
                onChange={(e) =>
                  setSettings({ ...settings, site_name: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Слоган</Label>
              <Input
                value={settings.site_tagline || ""}
                onChange={(e) =>
                  setSettings({ ...settings, site_tagline: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Контакти */}
        <Card>
          <CardHeader>
            <CardTitle>Контакты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                value={settings.contact_email || ""}
                onChange={(e) =>
                  setSettings({ ...settings, contact_email: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Телефон</Label>
              <Input
                value={settings.contact_phone || ""}
                onChange={(e) =>
                  setSettings({ ...settings, contact_phone: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Адресс</Label>
              <Input
                value={settings.contact_address || ""}
                onChange={(e) =>
                  setSettings({ ...settings, contact_address: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Соцмережі */}
        <Card>
          <CardHeader>
            <CardTitle>Соцсети</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Facebook</Label>
              <Input
                value={settings.facebook_url || ""}
                onChange={(e) =>
                  setSettings({ ...settings, facebook_url: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Instagram</Label>
              <Input
                value={settings.instagram_url || ""}
                onChange={(e) =>
                  setSettings({ ...settings, instagram_url: e.target.value })
                }
              />
            </div>
            <div>
              <Label>LinkedIn</Label>
              <Input
                value={settings.linkedin_url || ""}
                onChange={(e) =>
                  setSettings({ ...settings, linkedin_url: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO */}
        <Card>
          <CardHeader>
            <CardTitle>SEO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>SEO Title</Label>
              <Input
                value={settings.seo_title || ""}
                onChange={(e) =>
                  setSettings({ ...settings, seo_title: e.target.value })
                }
              />
            </div>
            <div>
              <Label>SEO Description</Label>
              <Textarea
                value={settings.seo_description || ""}
                onChange={(e) =>
                  setSettings({ ...settings, seo_description: e.target.value })
                }
              />
            </div>
            <div>
              <Label>SEO Keywords</Label>
              <Textarea
                value={settings.seo_keywords || ""}
                onChange={(e) =>
                  setSettings({ ...settings, seo_keywords: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="px-8">
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
