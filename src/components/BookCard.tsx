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
      <div>
        {deleteBook.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50"></div>
        )}
      </div>
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
    </>
  );
};

export default BookCard;
