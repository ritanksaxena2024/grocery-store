import { create } from "zustand";
import { persist } from "zustand/middleware";

type FormData = {
  email: string;
  roleId?: number;
};

interface AuthStore {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  clearFormData: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      formData: {
        email: "",
        roleId: undefined,
      },
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      clearFormData: () =>
        set({
          formData: {
            email: "",
            roleId: undefined,
          },
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
