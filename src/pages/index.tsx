import Head from "next/head";
import Books from "~/components/Books";
import Header from "~/components/Header";
import SideBar from "~/components/SideBar";


export default function Home() {
  return (
    <>
      <Head>
        <title>Book-me</title>
        <meta name="description" content="Book me daddy" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <main className="flex h-screen w-screen flex-col">
        <Header />
        <div className="flex h-full w-full bg-slate-100">
          <SideBar />
          <Books />
        </div>
      </main>
    </>
  );
}




