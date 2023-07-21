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
        <div className="flex h-[50%] flex-col justify-between bg-amber-100/50 ">
          <div className="m-2 border-y h-[60%] border-red-900 px-2 overflow-hidden">
            <p className="h-full text-ellipsis text-sm">{book.resumo}</p>
          </div>
          <div className="flex justify-between">
            <button
              className="m-2 self-end red-button"
            >
              Emprestar
            </button>
            <button
              key={book.id}
              className="m-2 self-end red-button"
              onClick={() => deleteBook.mutate({ id: book.id })}
            >
              Apagar
            </button>
          </div>
        </div>
      </div>
      <div>
        {deleteBook.isLoading && (
          <div className="modal-base"></div>
        )}
      </div>
    </>
  );
};

export default BookCard;
