/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Layout from '../components/Layout';
import type { Service } from '../interfaces/Service';
import * as LucideIcons from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select(`
          id,
          title,
          description,
          price,
          icon_url,
          service_details (
            details ( name )
          )
        `);
        
      if (error) {
        console.error(error);
      } else {
        const formatted = data.map((s: any) => ({
          ...s,
          details: s.service_details.map((d: any) => d.details),
        }));
        setServices(formatted);
      }
    };

    fetchServices();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Наши услуги</h1>

        <div className="max-w-7xl mx-auto py-12 px-4 grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon =
              (LucideIcons as any)[service.icon_url] || LucideIcons["Package"];

            return (
              <Card
                key={service.id}
                className="max-w-sm mx-auto flex flex-col justify-between hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <CardHeader className="flex items-center justify-center space-x-4">
                  <Icon className="w-10 h-10 text-blue-500" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>

                <CardContent className='flex flex-col grow'>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="list-disc text-left list-inside mb-4 text-sm text-gray-700">
                    {service.details.map((d, i) => (
                      <li key={i}>{d.name}</li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-centr justify-between">
                    <span className="text-xl font-semibold text-green-600">
                      {service.price}€
                    </span>
                    <Button>Заказать</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Services;