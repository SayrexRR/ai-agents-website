import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const useSettings = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("settings").select("*").single();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  return settings;
};
