import { type Book } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import BookModal from "~/components/BookModal";
import { api } from "~/utils/api";
import BookCard from "./BookCard";

export default function Books() {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [modalToggle, setModalToggle] = useState<boolean>(false);

  const { data: sessionData } = useSession();

  const { isLoading } = api.book.getAll.useQuery(undefined, {
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
            className="mx-auto place-self-center rounded-sm bg-slate-200 px-2 py-1 hover:bg-slate-300"
            onClick={() => setModalToggle(true)}
          >
            Inserir Livro
          </button>
        </div>
        {deleteBook.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50"></div>
        )}
        <div className="flex flex-wrap">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/75 text-5xl">
              Loading...
            </div>
          )}
          {bookList.map((book) => (
            <BookCard key={book.id} book={book} setBookList={setBookList} />
          ))}
        </div>
      </div>
    </>
  );
}
