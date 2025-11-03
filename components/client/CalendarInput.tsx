'use client'

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

import React, { useState } from 'react'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface CalendarInputProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}

const CalendarInput: React.FC<CalendarInputProps> = ({ date, setDate }) => {
    const [calendaropen, setcalendaropen] = useState(false)


    const [month, setMonth] = React.useState<Date | undefined>(date)
    const [datevalue, setdateValue] = React.useState(formatDate(date))

    function formatDate(date: Date | undefined) {
        if (!date) {
            return ""
        }
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
    }
    function isValidDate(date: Date | undefined) {
        if (!date) {
            return false
        }
        return !isNaN(date.getTime())
    }
    return (
        <div className='grid gap-3'>
            <Label htmlFor="date" className="px-1 text-sm md:text-base">
                Due Date
            </Label>
            <div className="relative flex gap-2">
                <Input
                    id="date"
                    value={datevalue}
                    placeholder="June 01, 2025"
                    className="bg-background pr-10 text-xs md:text-sm"
                    onChange={(e) => {
                        const date = new Date(e.target.value)
                        setdateValue(e.target.value)
                        if (isValidDate(date)) {
                            setDate(date)
                            setMonth(date)
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault()
                            setcalendaropen(true)
                        }
                    }}
                />
                <Popover open={calendaropen} onOpenChange={setcalendaropen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date-picker"
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                    >
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(date) => {
                                setDate(date)
                                setdateValue(formatDate(date))
                                setcalendaropen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default CalendarInput