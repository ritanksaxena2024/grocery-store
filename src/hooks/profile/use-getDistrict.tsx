import { useEffect, useState } from "react";
import { supabase } from "@/app/controller/supabase/connection";

interface DisttRow {
  id: number;
  name: string;
}

export function useGetDistricts(stateId: number) {
  const [districts, setDistricts] = useState<DisttRow[]>([]);

  useEffect(() => {
    const getListOfDistricts = async () => {
      const { data, error } = await supabase
        .from("districts")
        .select("id, name")
        .eq("state_id", stateId);

      if (error) {
        console.error("Error fetching districts:", error);
        return;
      }

      if (data) {
        setDistricts(data as DisttRow[]);
      }
    };

    if (stateId) getListOfDistricts();
  }, [stateId]);

  return districts;
}
