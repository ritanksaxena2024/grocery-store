'use client'
import { supabase } from "@/app/controller/supabase/connection";
import { useEffect, useState } from "react";

interface Role {
  id: number;
  role_name: string;
}

export function useUserRoles() {
  const [roles, setUserRoles] = useState<Role[]>([]);

  useEffect(() => {
    const getTheRoles = async () => {
      const { data } = await supabase
        .from("master_roles")
        .select("id, role_name");

      if (data) {
        setUserRoles(data as Role[]);
      }
    };

    getTheRoles();
  }, []);

  return roles;
}
