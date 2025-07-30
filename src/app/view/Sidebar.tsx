"use client";

import { Home, List,  PackageCheck, Ellipsis, Settings, User } from "lucide-react";
import { ReactElement } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

interface SidebarItem {
  itemName: string;
  redirection: string;
  itemIcon: ReactElement | null;
}

const Sidebar = () => {
    const router = useRouter()
  const sidebarItems: SidebarItem[] = [
    {
      itemName: "Home",
      redirection: "/home",
      itemIcon: <Home width={25} height={25} className="text-green-400" />,
    },
    {
      itemName: "Profile",
      redirection: "/profile",
      itemIcon: <User width={25} height={25} className="text-green-400" />,
    },
    {
      itemName: "Menu Items",
      redirection: "",
      itemIcon: < PackageCheck width={25} height={25} className="text-green-400" />,
    },
    {
      itemName: "Orders",
      redirection: "",
      itemIcon: <List width={25} height={25} className="text-green-400" />,
    },
    {
      itemName: "Settings",
      redirection: "/settings",
      itemIcon: <Settings width={25} height={25} className="text-green-400" />,
    },
  ];

  const renderPopoverContent = (itemName: string) => {
    if (itemName === "Menu Items") {
      return (
        <PopoverContent className="w-40 p-2">
          <div className="mt-2 space-y-1">
            <div className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
              Fruits
            </div>
            <div className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
              Green vegetables
            </div>
            <div className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
              Exotics
            </div>
            <div className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
              Seasonal
            </div>
          </div>
        </PopoverContent>
      );
    }

    if (itemName === "Orders") {
      return (
        <PopoverContent className="w-40 p-2">
          <div className="mt-2 space-y-1">
            <div className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
              Past Orders
            </div>
            <div className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
              Cart
            </div>
          </div>
        </PopoverContent>
      );
    }

    return null;
  };

  return (
    <aside className="w-[100px] md:w-[200px] h-screen shadow-amber-50 flex flex-col items-center px-4 py-6 bg-white">
      <div className="space-y-8 pt-[150px]">
        {sidebarItems.map((item, index) => {
          const hasPopover =
            item.itemName === "Menu Items" || item.itemName === "Orders";

          const content = (
            <div className="flex items-center gap-3 cursor-pointer" onClick={()=>router.push(item.redirection)}>
              {item.itemIcon}
              <div className="hidden md:flex items-center gap-2 relative">
                <span className="text-[15px] font-medium">{item.itemName}</span>
                {hasPopover && (
                  <Ellipsis className="w-4 h-4 cursor-pointer" />
                )}
              </div>
            </div>
          );

          return (
            <div key={index}>
              {hasPopover ? (
                <Popover>
                  <PopoverTrigger asChild>
                   
                    {content}
                  </PopoverTrigger>
                  {renderPopoverContent(item.itemName)}
                </Popover>
              ) : (
                <div>{content}</div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
