'use client'
import { signUp } from "@/lib/actions";
import { Button, Card, Flex, Heading, TextField, Text} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const submit = async () =>{
    const response = await signUp(email, password)
    if(response){
      router.push('/')
    }
  }

  return(
    <Flex justify='center' align='center' p='4'>
      <Card style={{width: '100%'}} size='2'>
        <Flex direction='column' gap='5'>
          <Heading>Sign Up</Heading>
          <Flex direction='column' gap='2'>
            <Heading size='4'>Email Address</Heading>
            <TextField.Input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Flex>
          <Flex direction='column' gap='2'>
            <Heading size='4'>Password</Heading>
            <TextField.Input placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </Flex>
          <Flex align='center' gap='2'>
            <Text>Already have an account?</Text>
            <Button variant="ghost" onClick={()=>router.push('login')}>Log in</Button>
          </Flex>
          <Flex gap='4' justify='end'>
            <Button onClick={submit}>Sign up</Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  )
}