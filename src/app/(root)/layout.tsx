export default async function HomeLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main>
       {children}
      </main>
   );
}
