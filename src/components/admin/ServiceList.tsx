/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';

const ServiceList = () => {
  const [services, setServices] = useState<any[]>([]);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('id, title, price');

    if (error) console.error(error);
    else setServices(data || []);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот сервис?')) {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) alert('❌ Ошибка удаления: ' + error.message);
      else fetchServices();
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="p-6">
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Сервисы</h1>
        <Link to='/admin/services/new'>
          <Button>+ Добавить сервис</Button>
        </Link>
      </div>
      <Card>
        <CardContent>
          <ul className='divide-y'>
            {services.map((s) => (
              <li key={s.id} className='flex justify-between items-center py-3'>
                <span>{s.title}-{s.price} €</span>
                <div className='flex gap-2'>
                  <Link to={`/admin/services/edit/${s.id}`}>
                    <Button variant='outline'>Редактировать</Button>
                  </Link>
                  <Button variant='destructive' onClick={() => handleDelete(s.id)}>
                    Удалить
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceList;