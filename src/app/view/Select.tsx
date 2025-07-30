import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectItemType {
  id: number;
  name: string;
}

interface SelectComponentProps {
  items: SelectItemType[];
  placeHolder: string;
  className?: string;
  onChange?: (value: string) => void;
}

const SelectComponent = ({ items, placeHolder, className , onChange }: SelectComponentProps) => {
  return (
    <Select onValueChange={(value) => onChange?.(value)}>
      <SelectTrigger className={`${className} || w-full`}>
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.id} value={item.id.toString()}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;