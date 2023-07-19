import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { api } from "~/utils/api";
import { type RouterOutputs } from "~/utils/api";

type Book = RouterOutputs["book"]["getAll"][0];

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
  return <div className="border-left h-full w-1/6 border-solid">Opções</div>;
};

const Books: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: books, refetch: refetchBooks } = api.book.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const createBook = api.book.create.useMutation({});

  return (
    <div className="h-full w-5/6">
      <div id="input">
        <button
          id="title"
          onClick={() =>
            createBook.mutate({
              title: "placeholder",
              author: "placholder",
              resumo: "resumo placeholder",
            })
          }
          
        >
          Criar
        </button>
      </div>
      <div id="output" className="">
        Books:
        <div>
          <div className="flex flex-wrap bg-red-200">
            {books?.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


function BookCard (book: {
  title: string,
  author: string,
  resumo: string,
  id: string,
  userId: string,
}) {

  return(
    <div className="bg-red-600 w-40 h-60 text-white flex-col flex m-2">
      <span className="text-xl self-center h-[20%]">{book.title}</span>
      <span className="text-sm self-end px-2">{book.author}</span>
      <span className="h-[55%]">{book.resumo}</span>
      <button className="self-end mx-2 px-2 border">Delete</button>
    </div>
  )
}

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
              <button onClick={() => void signOut()}>SignOut</button>
            </div>
          ) : (
            <button onClick={() => void signIn()}>SignIn</button>
          )}
        </div>
      </div>
    </div>
  );
};
