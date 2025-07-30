import { ChevronDown, ChevronUp } from "lucide-react";
import { generateRandomColor, getInitials } from "../model/application_functions";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  const [color, setColor] = useState<string>("");
  const [downClicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    const colorGenerated = generateRandomColor();
    setColor(colorGenerated);
  }, []);

  return (
    <header className="w-full h-16 shadow-lg flex justify-end items-center px-4">
      <div className="flex gap-5 items-center justify-center">
        <Popover open={downClicked} onOpenChange={setClicked}>
          <PopoverTrigger asChild>
            <div
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => setClicked(!downClicked)}
            >
              <span>Ritank Saxena</span>
              {downClicked ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-40 p-2 mt-2">
            <div className="space-y-1">
              <div className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
                Settings
              </div>
              <div className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
                Themes
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div
          className="rounded-full w-14 h-14 hidden md:flex items-center justify-center text-white font-semibold cursor-pointer"
          style={{ background: color }}
        >
          {getInitials("Ritank Saxena")}
        </div>
      </div>
    </header>
  );
};

export default Header;
