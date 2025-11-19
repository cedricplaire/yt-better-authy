import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { PostCategory } from "@/lib/generated/prisma/enums";

export const PostCategSelect = () => {
    const [selected, setSelected] = React.useState(" ");
  return (
    <div className="flex justify-center self-start pt-2 w-full">
      <Select
        name="category"
        defaultValue={PostCategory.ALL}
        value={selected}
        onValueChange={setSelected}
      >
        <SelectTrigger className="w-full min-w-[180px]">
          <SelectValue placeholder="Select a category">
            {selected && (
              <div className="flex items-center gap-2">
                <span>{selected.charAt(0) + selected.slice(1).toLowerCase()}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories :</SelectLabel>
            {Object.values(PostCategory).map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0) + cat.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
