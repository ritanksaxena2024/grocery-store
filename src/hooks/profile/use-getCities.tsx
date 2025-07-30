import { useEffect, useState } from "react";
import { supabase } from "@/app/controller/supabase/connection";

interface cityRow {
  id: number;
  name: string;
}

export function useGetCities(districtId: number) {
  const [cities, setCities] = useState<cityRow[]>([]);

  useEffect(() => {
    const getListOfCities = async () => {
      const { data, error } = await supabase
        .from("cities")
        .select("id, name")
        .eq("district_id", districtId);

      if (error) {
        console.error("Error fetching districts:", error);
        return;
      }

      if (data) {
        setCities(data as cityRow[]);
      }
    };

    if (districtId) getListOfCities();
  }, [districtId]);

  return cities;
}
