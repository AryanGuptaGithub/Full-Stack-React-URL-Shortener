import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import Login from '../components/Login';
import Signup from '../components/Signup';

const AuthPage = () => {

  const [searchParams] = useSearchParams();
  return (
    <div className='mt-36 flex flex-col items-center gap-10'>
      <h1 className='text-5xl font-extrabold'>
        { searchParams.get("createNew") ? "Hold up! Let's login first.." : "Login /Signup" }
      </h1>

          <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="Login">
        <TabsList>
          <TabsTrigger value="Login" className={" focus:bg-blue-50 focus:text-black "}>Login</TabsTrigger>
          <TabsTrigger value="Signup" className={"focus:bg-blue-50 focus:text-black "}>Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
        <Login />
        </TabsContent>
      
        <TabsContent value="Signup">
        <Signup />
        </TabsContent>
        
      </Tabs>
    </div>

    </div>
  )
}

export default AuthPage