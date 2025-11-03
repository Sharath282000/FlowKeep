import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export type Priority = "Low" | "Medium" | "High"

interface PrioritySelectProps {
  priority: Priority
  setPriority: React.Dispatch<React.SetStateAction<Priority>>
}

export const PrioritySelect : React.FC<PrioritySelectProps> = ({ priority, setPriority }) => {
  return (
    <div className="grid gap-2">
      <Label className="text-sm md:text-base">Priority</Label>
      <RadioGroup
        value={priority}
        onValueChange={(value: Priority) => setPriority(value)}
        className="flex items-center gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Low" id="low" />
          <Label htmlFor="low" className="text-xs md:text-sm text-green-600">Low</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Medium" id="medium" />
          <Label htmlFor="medium" className="text-xs md:text-sm text-yellow-600">Medium</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="High" id="high" />
          <Label htmlFor="high" className="text-xs md:text-sm text-red-600">High</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
