'use client'
import { DropdownMenu, IconButton } from "@radix-ui/themes"
import { DotsVerticalIcon } from "@radix-ui/react-icons"

export default function DotMenu(){
  return(
    <>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size='1' variant="soft">
          <DotsVerticalIcon/>
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item>Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
    </>
  )
}