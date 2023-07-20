import { type Book } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import BookModal from "~/components/BookModal";
import { api } from "~/utils/api";

export default function Books() {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [modalToggle, setModalToggle] = useState<boolean>(false);

  const { data: sessionData } = useSession();

  const {} = api.book.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
    onSuccess: (data) => {
      setBookList(data);
    },
  });

  const deleteBook = api.book.delete.useMutation({
    onSuccess: (data) => {
      setBookList((prev) => prev.filter((item) => item.id !== data.id));
    },
  });

  return (
    <>
      
      <div>
        {modalToggle && (
          <BookModal
            setModalToggle={setModalToggle}
            setBookList={setBookList}
          />
        )}
      </div>
      <div className="m-auto h-full w-full flex-col">
        <div className="my-3 grid">
          <button
            className="mx-auto place-self-center rounded-sm bg-slate-200 px-2"
            onClick={() => setModalToggle(true)}
          >
            Inserir Livro
          </button>
        </div>
        {deleteBook.isLoading && <div className="absolute inset-0 flex items-center justify-center bg-black/50"></div>}
        <div className="flex flex-wrap">
          {bookList.map((book) => (
            <div
              key={book.id}
              className="mx-2 my-2 flex h-60 w-40 w-40 flex-col bg-red-600 text-white"
            >
              <span className="h-[20%] self-center text-xl">{book.title}</span>
              <span className="self-end px-2 text-sm">{book.author}</span>
              <span className="h-[55%]">{book.resumo}</span>
              <button
                key={book.id}
                className="mx-2 self-end border px-2"
                onClick={() => deleteBook.mutate({ id: book.id })}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
