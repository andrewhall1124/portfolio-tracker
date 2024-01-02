import { Flex } from "@radix-ui/themes";
import AddOrderCard from "@/ui/orders/AddOrderCard";
import OrdersTable from "@/ui/orders/OrdersTable";



export default async function Page(){
  return(
    <>
      <Flex direction='row' p='4' gap='4' align='start'>
        <AddOrderCard/>
        <OrdersTable/>
      </Flex>
    </>
  )
}