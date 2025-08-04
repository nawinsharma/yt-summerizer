import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import GlobalBackground from '@/components/GlobalBackground';

export default async function DashboardLayout({
   children,
}: {
   children: React.ReactNode
}) {
   try {
      const session = await auth.api.getSession({
         headers: await headers()
      })

      if (!session) {
         return redirect("/sign-in")
      }

      const user = session?.user;
      
      // Additional safety check
      if (!user) {
         return redirect("/sign-in")
      }
      
      return (
         <>
            <GlobalBackground />
            <div className="flex min-h-screen w-full">
               <div className="w-full flex flex-1 flex-col">
                  <main className="flex-1 p-6">{children}</main>
               </div>
            </div>
         </>
      )
   } catch (error) {
      console.error('Dashboard layout error:', error);
      return redirect("/sign-in")
   }
}

