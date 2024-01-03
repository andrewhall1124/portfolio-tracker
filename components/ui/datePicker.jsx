"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button, Flex, TextField } from "@radix-ui/themes"
import dayjs from "dayjs"

export function DatePicker({value, setValue}) {
  const handleSelect = () =>{
    setValue()
  }

  return (
    <Flex style={{width: "100%"}}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" style={{width: "100%", display: 'flex', justifyContent: 'flex-start'}} color="gray">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value && dayjs(value).format("YYYY-MM-DD")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={setValue}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </Flex>
  )
}
