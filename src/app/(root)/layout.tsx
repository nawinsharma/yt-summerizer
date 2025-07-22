import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export default async function HomeLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const session = await auth.api.getSession({
      headers: await headers()
  })

  if(!session) {
      redirect("/sign-in")
  }
//   if(session) {
//       redirect("/dashboard")
//   }
   return (
      <main>
         {/* <Navbar /> */}
         <div>
            {children}
         </div>
         {/* <Footer /> */}
      </main>
   );
}
