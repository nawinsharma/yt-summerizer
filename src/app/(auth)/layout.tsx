import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import GlobalBackground from '@/components/GlobalBackground';

export default async function AuthLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const session = await auth.api.getSession({
      headers: await headers()
   })

   if (session) {
      return redirect("/")
   }
   return (
      <main>
        <GlobalBackground />
         <div className="h-screen flex flex-col items-center justify-center">
            {children}
         </div>
      </main>
   );
}
