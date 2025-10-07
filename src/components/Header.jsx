import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Button} from './ui/button'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LinkIcon, LogOut } from 'lucide-react';
import { UrlState } from '@/Context';
import { useFetch } from '@/hooks/use-fetch';
import { Logout } from '@/db/apiAuth';
import { BarLoader } from 'react-spinners';

const Header = () => {

    const navigate = useNavigate(); // for navigation from react-router-dom
    const darkmode = true;

    const {user, fetchUser } = UrlState();

    const {loading, fn:fnLogout } = useFetch(Logout);

  return (
    <>
    <nav className='py-4 flex justify-between items-center'>
        <Link to="/">
            <img src={darkmode ? "../public/darkmode_logo.png" : "../public/logo.png"} className='h-30' alt="Cut-it-Logo" />
        </Link>
        {!user ? (
                 <Button onClick={()=>navigate('/auth')} className={'border border-blue-500 p-4 hover:bg-white hover:text-black'}>Login</Button>     
                ): (
                    <DropdownMenu >
                     <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                        <Avatar>
                        <AvatarImage src={user?.user_metadata?.profile_pic} className='object-contain' />
                        <AvatarFallback>AG</AvatarFallback>
                        </Avatar>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent>
                       <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                       <DropdownMenuSeparator />
                       <DropdownMenuItem className={'hover:bg-white hover:text-black'}>
                        <Link to={`/dashboard`} className='flex'>
                        <LinkIcon className='mr-2 h-4 w-4' />
                        My Links
                        </Link>
                        </DropdownMenuItem>
                       <DropdownMenuItem className={"text-red-600 hover:bg-red-500 hover:text-white"}> 
                        <LogOut className="mr-2 h-4 w-4"/>
                              <span onClick={()=>{
                                  fnLogout().then(()=>{ fetchUser(); navigate('/')});
                                 }}>
                                Logout
                              </span>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                    </DropdownMenu>
                )}

               
    </nav>

       {loading && <BarLoader className='mb-4' width={"100%"} color='#36d7b7'></BarLoader> }

    </>
  )
}

export default Header