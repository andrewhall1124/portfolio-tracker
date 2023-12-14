import { ChakraProvider } from "@chakra-ui/react"
import Link from "next/link"

export default function Layout({children}){

  function Header(){
    return(
      <div className="flex gap-4 bg-slate-400 p-4">
        <Link href='/' replace>Portfolio</Link>
        <Link href='/orders' replace>Orders</Link>
      </div>
    )
  }

  function Footer(){
    return(
      <div>
      </div>
    )
  }

  return(
    <ChakraProvider>
      <div className="flex-1 flex flex-col bg-slate-200">
        <Header/>
        <div className="flex-1">
          {children}
        </div>
        <Footer/>
      </div>
    </ChakraProvider>
  )
}