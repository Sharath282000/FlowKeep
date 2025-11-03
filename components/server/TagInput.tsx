import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import React from "react"

interface TagInputProps {
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
}

export const TagInput : React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [input, setInput] = React.useState<string>("")

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault()
      const trimmed = input.trim()
      if (!tags.includes(trimmed)) setTags([...tags, trimmed])
      setInput("")
    }
  }

   const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="grid gap-2">
      <Label className="text-sm md:text-base">Tags</Label>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-secondary shadow rounded-full"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="text-muted-foreground hover:text-red-500 cursor-pointer"
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
      <Input
        placeholder="Press Enter to add tag"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleAddTag}
        className="text-xs md:text-sm"
      />
    </div>
  )
}
