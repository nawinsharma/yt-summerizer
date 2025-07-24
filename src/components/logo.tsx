import { IconBrandYoutube } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
   return (
      <Link href="/" className="flex items-center gap-2 self-center font-medium">
         <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <IconBrandYoutube className="size-4" />
         </div>
         <span className="text-xl font-bold">SumTube</span>
      </Link>
   )
}
