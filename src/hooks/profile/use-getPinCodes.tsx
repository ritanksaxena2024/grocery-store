import { useEffect, useState } from "react";
import { supabase } from "@/app/controller/supabase/connection";

interface PincodeRow {
  id: number;
  pinCode: string;
}

export function useGetPin(cityId: number) {
  const [pinCode, setPinCode] = useState<PincodeRow | null>(null); 

  useEffect(() => {
    const getPinCodes = async () => {
      const { data, error } = await supabase
        .from("pincodes")
        .select("id, pincode")
        .eq("city_id", cityId)
        .single(); 
      if (error) {
        console.error("Error fetching pincode:", error);
        return;
      }

      if (data) {
        setPinCode({
          id: data.id,
          pinCode: data.pincode,
        });
      }
    };

    if (cityId) getPinCodes();
  }, [cityId]);

  return pinCode;
}
