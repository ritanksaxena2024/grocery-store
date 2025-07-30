'use client';
import LoginAnimation from "../view/animations/login";
import Image from "next/image";
import basket from "@/app/assets/images/basket.jpg";
import SelectComponent from "../view/Select";
import { useUserRoles } from "@/hooks/user-authentication/use-getRoles";
import { useEffect, useState } from "react";
import { useCheckuser } from "@/hooks/user-authentication/use-checkUser";
import { useAuthStore } from "@/zustand/store";
import { authenticateUser, userCreation } from "../controller/authentiocation/action";
import { useRouter } from "next/navigation";
type FormData = {
  email: string;
  password: string;
  confirmPassword?: string;
  roleId?: number;
};

const Authentication = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    roleId: undefined,
  });

  const {setFormData: setFormDataPersist} = useAuthStore()
  const roles = useUserRoles();
  const userIsThere = useCheckuser(formData.email);
  
  const router = useRouter()



 const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
 
  setFormDataPersist({
    email: formData.email,
    roleId: formData.roleId,
  });

  if(userIsThere){
   await userCreation(formData?.email , formData?.password , Number(formData?.roleId))
   router.push('/profile')
  }else{
  const data = await authenticateUser(formData?.email , formData?.password , String(formData?.roleId) )
  if ('user' in data) {
  const profileCompleted = data.user.profilecompleted;
  if(profileCompleted){
router.push('/home')
  }else{
    router.push('/profile')
  }
}
}
};



  return (
    <div className="flex min-h-screen">
      <div className="hidden sm:flex sm:w-1/2 bg-blue-100 items-center justify-center">
        <LoginAnimation />
      </div>

      <div className="w-full sm:w-1/2 flex items-center justify-center bg-white p-4">
        <div className="relative bg-white border border-gray-300 rounded-3xl p-8 pt-20 w-full max-w-md shadow-lg flex flex-col items-center">
          <div className="absolute -top-16">
            <Image
              src={basket}
              height={120}
              width={120}
              alt="Basket"
              className="rounded-full object-contain shadow-md"
            />
          </div>

          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="Email" className="text-sm font-medium italic mb-1">
                Email
              </label>
              <input
                id="Email"
                name="Email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="Password" className="text-sm font-medium italic mb-1">
                Password
              </label>
              <input
                id="Password"
                name="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Password"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {userIsThere && (
              <div className="flex flex-col">
                <label htmlFor="ConfirmPassword" className="text-sm font-medium italic mb-1">
                  Confirm Password
                </label>
                <input
                  id="ConfirmPassword"
                  name="ConfirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="flex flex-col">
              <label htmlFor="state" className="mb-1 font-medium italic text-sm">
                Your Identity
              </label>
              <SelectComponent
                placeHolder="Role"
                items={(roles ?? []).map((role) => ({
                  id: role.id,
                  name: role.role_name,
                }))}
                className="w-full rounded-lg"
                onChange={(selectedId: string) => {
                  setFormData((prev) => ({
                    ...prev,
                    roleId: Number(selectedId),
                  }));
                }}
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white rounded-2xl h-10 mt-4 hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
