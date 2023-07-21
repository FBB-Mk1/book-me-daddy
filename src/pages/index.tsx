import Head from "next/head";
import Header from "~/components/Header";

import Books from "~/components/Books";
import { signIn, useSession } from "next-auth/react";
import Logo from "~/components/Logo";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Book-me</title>
        <meta name="description" content="Book me daddy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen">
        {sessionData?.user ? (
          <div>
            <Header />
            <Books />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col  items-center justify-center">
            <div className="flex h-80 w-64 flex-col justify-around rounded-2xl bg-red-900">
              <Logo />
              <div className="text-white text-center mb-10 text-3xl" >BOOK.me</div>
              <button
                className="white-button mb-10 self-center rounded-md "
                onClick={() => void signIn()}
              >
                Entrar
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
