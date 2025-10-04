import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
    const [longUrl, setLongUrl] = React.useState();
    
    const navigate = useNavigate();

    const handleShorten = (e) => {
      e.preventDefault();
      if(longUrl) navigate(`/auth?createNew=${longUrl}`);
    }

  return (
    <div className='flex flex-col items-center'>
      <h2 className='
       my-10 text-3x1 md:text-4x1 sm:text-7xl text-white text-center font-extrabold'>
        The only URL Shortener <br /> you&rsquo;ll ever need! 👇
      </h2>
       <form action="" className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-3' onSubmit={handleShorten}>
          <Input type='url' placeholder='Enter your long URL' className={'h-full flex-1 py-4 px-4 border-amber-500'} value={longUrl} onChange={(e) => setLongUrl(e.target.value)} />
          <Button className={'h-full border-2 bg-amber-600'} type='submit' variant={'destructive'}> Shorten </Button>
       </form>
       <img src="../public/banner.png" alt="banner" className='w-full my-11 md:px-11'/>

         <Accordion type="multiple" collapsible className='w-full md:px-11 border-b'>
          <AccordionItem value="item-1">
            <AccordionTrigger>How does the Cutit URl shortner works?</AccordionTrigger>
            <AccordionContent>
              When you enter a long URL, our system generates a shorter version of the URL. This shorten URL redirects to the original long URL when accessed.
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="item-2">
            <AccordionTrigger>Do i need an Account to use the app?</AccordionTrigger>
            <AccordionContent>
              Yes. Creating an account allows you to manange your URLs, view analytics, and customize your short URLs. 
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="item-3">
            <AccordionTrigger>What analytics are available for my shortend URLs? </AccordionTrigger>
            <AccordionContent>
              You can view the number of clicks, geolocation data of the clicks and device types (mobile/desktop) for each of your shortened URLs. 
            </AccordionContent>
          </AccordionItem>
        </Accordion>

    </div>
  )
}

export default LandingPage