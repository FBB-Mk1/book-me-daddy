import Head from "next/head";
import Header from "~/components/Header";

import Books from "~/components/Books";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Book-me</title>
        <meta name="description" content="Book me daddy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-red-50 h-screen">
        {sessionData?.user ? (
          <div>
            <Header />
            <Books />
          </div>
        ) : (
          <div className="flex h-full w-full content-center justify-center">
            <button
              className="h-40 w-40 self-center rounded-full bg-slate-200 text-3xl font-mono font-bold text-amber-600 hover:bg-slate-300"
              onClick={() => void signIn()}
            >
              SignIn
            </button>
          </div>
        )}
      </main>
    </>
  );
}
