import { supabase } from "@/app/controller/supabase/connection";
import { useEffect, useState } from "react";

export function useCheckuser(email: string) {
  const [isThere, setIsThere] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      if (!email) return;

      const { data } = await supabase
        .from("users")
        .select("email, password")
        .eq("email", email)
        .maybeSingle();
      if (!data || !data.email) {
        setIsThere(true);
      } else if (!data.password || data.password.trim() === "") {
        setIsThere(true);
      } else {
        setIsThere(false); 
      }
    };

    getData();
  }, [email]);
  return isThere;
}
