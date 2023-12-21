import '@/styles/globals.css'
import '@radix-ui/themes/styles.css';
import Link from 'next/link'
import { Button, Flex, Separator, Theme, ThemePanel } from '@radix-ui/themes';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

function Header(){
  return(
    <>
      <Flex p="4" gap='4'>
        <Link href="/" replace>       
          <Button variant='ghost'>Portfolio</Button>
        </Link>
        <Link href="orders" replace>       
          <Button variant='ghost'>Orders</Button>
        </Link>
      </Flex>
      <Separator size='4'/>
    </>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='min-h-screen flex flex-col'>
      <Theme appearance="dark" accentColor="jade" grayColor="sand" radius='large' scaling='110%'>  
        <Header/>
          {children}
        </Theme>
      </body>
    </html>
  )
}
