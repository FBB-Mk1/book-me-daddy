import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

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

const SideBar = () => {
  return <div className="h-full w-1/6 bg-red-200">Opções</div>;
};

const Books = () => {
  return <div className="h-full w-5/6 bg-red-500">Book list</div>;
};

const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="w-full bg-slate-200">
      <div className="mx-4 my-2 flex justify-between">
        <div>Book-me</div>
        <div className="">
          <h1>
            {sessionData?.user?.name
              ? `Livros de ${sessionData.user.name}`
              : ""}
          </h1>
        </div>
        <div className="">
          {sessionData?.user ? (
            <div>
              <button onClick={() => void signOut()}>SingOut</button>
            </div>
          ) : (
            <button onClick={() => void signIn()}>SingIn</button>
          )}
        </div>
      </div>
    </div>
  );
};
