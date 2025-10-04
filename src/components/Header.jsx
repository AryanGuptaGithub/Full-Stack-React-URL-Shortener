import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Button} from './ui/button'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LinkIcon, LogOut } from 'lucide-react';

const Header = () => {

    const navigate = useNavigate(); // for navigation from react-router-dom
    const user = false; // dummy user created for testing
    const darkmode = true;

  return (
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
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>AG</AvatarFallback>
                        </Avatar>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent>
                       <DropdownMenuLabel> Aryan Gupta</DropdownMenuLabel>
                       <DropdownMenuSeparator />
                       <DropdownMenuItem className={'hover:bg-white hover:text-black'}>
                        <LinkIcon className='mr-2 h-4 w-4' />
                        My Links</DropdownMenuItem>
                       <DropdownMenuItem className={"text-red-600 hover:bg-red-500 hover:text-white"}> 
                        <LogOut className="mr-2 h-4 w-4"/>
                        <span>Logout</span></DropdownMenuItem>
                     </DropdownMenuContent>
                    </DropdownMenu>
                )
        }
       
    </nav>
  )
}

export default Header