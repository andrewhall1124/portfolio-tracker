'use client'
import { Dialog, DropdownMenu, AlertDialog, IconButton, Flex, Button, TextField } from "@radix-ui/themes"
import { DotsVerticalIcon } from "@radix-ui/react-icons"

function EditDialog(){
  return(
    <Dialog.Content style={{ maxWidth: 450 }}>
      <Dialog.Title>Edit order</Dialog.Title>
      <Dialog.Description size="2" mb="4">
        Make changes to your order.
      </Dialog.Description>
      <Flex direction='column' gap='4'>
        <TextField.Input placeholder="Ticker" />
        <TextField.Input placeholder="Date" />
        <TextField.Input placeholder="Shares" />
        <TextField.Input placeholder="Price"/>
        <TextField.Input placeholder="Beta" />
      </Flex>
      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button>Save</Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  )
}

function DeleteDialog(){
  return(
    <AlertDialog.Content style={{ maxWidth: 450 }}>
      <AlertDialog.Title>Delete order</AlertDialog.Title>
      <AlertDialog.Description size="2">
        Are you sure? This order will no longer be accessible.
      </AlertDialog.Description>
      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button variant="solid" color="red">
            Delete order
          </Button>
        </AlertDialog.Action>
      </Flex>
    </AlertDialog.Content>
  )
}

export default function DotMenu(){
  return(
    <>
      <Dialog.Root>
        <AlertDialog.Root>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton size='1' variant="soft">
                <DotsVerticalIcon/>
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <Dialog.Trigger>
                <DropdownMenu.Item>
                  Edit
                </DropdownMenu.Item>
              </Dialog.Trigger>
              <AlertDialog.Trigger>
                <DropdownMenu.Item color='red'>
                  Delete
                </DropdownMenu.Item>
              </AlertDialog.Trigger>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <EditDialog/>
          <DeleteDialog/>
        </AlertDialog.Root>
      </Dialog.Root>
    </>
  )
}