import { useEffect, useState } from "react";
import { supabase } from "@/app/controller/supabase/connection";

export interface StateRow {
  id: number;
  name: string;
}

export function useGetStatesList() {
  const [states, setStates] = useState<StateRow[]>();

  useEffect(() => {
    const getListofStates = async () => {
      const { data, error } = await supabase
        .from<'states', StateRow>('states')
        .select('id, name');

      if (error) {
        console.error("Error fetching states:", error);
        return;              
      }

      if (data) {
        setStates(data);
      }
    };

    getListofStates();
  }, []);

  return states;
}
