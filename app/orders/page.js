import { Flex } from "@radix-ui/themes";
import AddOrderCard from "@/components/orders/AddOrderCard";
import OrdersTable from "@/components/orders/OrdersTable";

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