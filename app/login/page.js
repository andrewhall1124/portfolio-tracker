'use client'
import { Button, Card, Flex, Heading, TextField, Text} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import supabase from "@/lib/supabase";

export default function Page(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const submit = async () =>{
    try{
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if(data){
        router.push('/')
      }
      if(error){
        console.error(error)
      }
    }
    catch(error){
      console.error(error)
    }
  }
  return(
    <Flex justify='center' align='center' p='4'>
      <Card style={{width: '100%'}} size='2'>
        <Flex direction='column' gap='5'>
          <Heading>Log In</Heading>
          <Flex direction='column' gap='2'>
            <Heading size='4'>Email Address</Heading>
            <TextField.Input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Flex>
          <Flex direction='column' gap='2'>
            <Heading size='4'>Password</Heading>
            <TextField.Input placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </Flex>
          <Flex align='center' gap='2'>
            <Text>Don&apos;t have an account?</Text>
            <Button variant="ghost" onClick={()=>router.push('signup')}>Sign up</Button>
          </Flex>
          <Flex gap='4' justify='end'>
            <Button onClick={submit}>Log in</Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  )
}