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
      <div className="mx-2 my-2 flex h-72 w-52 flex-col bg-slate-700 text-white ">
        <span className="h-[20%] text-center text-xl">{book.title}</span>
        <span className="self-end px-2 text-sm">por: {book.author}</span>
        <span className="mx-2 h-[55%]">{book.resumo}</span>
        <button
          key={book.id}
          className="mx-2 self-end rounded-sm border px-2 hover:bg-slate-500"
          onClick={() => deleteBook.mutate({ id: book.id })}
        >
          Delete
        </button>
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
