import { type Book } from "@prisma/client";
import type { Dispatch, FC, SetStateAction } from "react";
import { api } from "~/utils/api";

interface BookCardProps {
  book: Book;
  setBookList: Dispatch<SetStateAction<Book[]>>;
}

const BookCard: FC<BookCardProps> = ({ book, setBookList }) => {
  const deleteBook = api.book.delete.useMutation({
    onSuccess: (data) => {
      setBookList((prev) => prev.filter((item) => item.id !== data.id));
    },
  });

  return (
    <>
      <div className="mx-2 my-2 flex h-80 w-52 flex-col overflow-hidden rounded-md bg-red-900 text-white">
        <div className="flex h-[50%] flex-col justify-between">
          <span className="my-5 text-center text-xl">{book.title}</span>
          <span className="my-5 text-md text-end px-2">{book.author}</span>
        </div>
        <div className="flex h-[50%] flex-col justify-between bg-orange-200/50">
          <span className="m-2 h-[80%] border-y border-red-900 px-2">
            {book.resumo}
          </span>
          <div className="flex justify-between">
            <button
              key={book.id}
              className="m-2 self-end rounded-sm bg-red-900 border border-red-900 text-white px-2 hover:bg-white hover:border hover:border-red-900 hover:text-red-900"
              onClick={() => deleteBook.mutate({ id: book.id })}
            >
              Emprestar
            </button>
            <button
              key={book.id}
              className="m-2 self-end rounded-sm bg-red-900 border border-red-900 text-white px-2 hover:bg-white hover:border hover:border-red-900 hover:text-red-900"
              onClick={() => deleteBook.mutate({ id: book.id })}
            >
              Apagar
            </button>
          </div>
        </div>
      </div>
      <div>
        {deleteBook.isLoading && (
          <div className="border-box absolute inset-0 flex items-center justify-center bg-black/50 "></div>
        )}
      </div>
    </>
  );
};

export default BookCard;
