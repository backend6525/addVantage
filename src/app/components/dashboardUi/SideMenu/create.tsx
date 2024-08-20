import React, { useState } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/DialogPopup/dialog"
import Button from '../../ui/Button'
import Input from '../../ui/Input'

function CreateAdd({onCreateAdd}:any) {
    const comparisonData = {
        imageSrc: 'https://via.placeholder.com/50',
        title: 'Get Detailed Comparison Insights',
        description: "Its now possible, you can advertise on a daily charge of 1000ugx",
        buttonText: 'Create Add',
      };
      const [fileInput,  setFileInput] = useState('')
  return (
    <div>
     
<Dialog>
       
       <div className=" w-full flex items-center px-4 py-2 bg-black text-white justify-start mt-3 ">
         <DialogTrigger>
         {/* Button to create Add */} 
         {comparisonData.buttonText}
         </DialogTrigger>
         </div>
         <DialogContent>
             <DialogHeader>
             <DialogTitle>Create Add?</DialogTitle>
             <DialogDescription>
                <Input placeholder='Add Title'
                onChange={(e:any)=>setFileInput(e.target.value)}
                />
             </DialogDescription>
             </DialogHeader>
             <DialogFooter className='sm:justify-end'>
               <DialogClose asChild>
                 <div className=' bg-violet-600'>
                 <Button type="button" 
                 disabled={!(fileInput && fileInput.length > 4)} 
                 onClick = {()=>onCreateAdd(fileInput)}
                 > Create</Button>
                 </div>
                 
               </DialogClose>
             </DialogFooter>
         </DialogContent>
         </Dialog>
 
    </div>
  )
}

export default CreateAdd