import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  project_url?: string;
  created_at: string;
}

const PortfolioPage = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setItems(data || []);
      setLoading(false);
    };
    fetchItems();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Загрузка...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">Моё портфолио</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">Пока что нет работ</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition rounded-lg"
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform"
                />
              )}
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-600">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {item.description}
                </p>
                {item.project_url && (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <a
                      href={item.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Посмотреть проект
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
