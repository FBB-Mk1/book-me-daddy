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
        <div className="mx-2 my-2 flex h-80 w-52 flex-col overflow-hidden rounded-md bg-red-900 text-white">
          <div className="flex h-[50%] flex-col justify-between">
            <span className="my-5 text-center text-xl">{book.title}</span>
            <span className="text-md my-5 px-2 text-end">{book.author}</span>
          </div>
          <div className="flex h-[50%] flex-col justify-between bg-amber-100/50 ">
            <div className="m-2 h-[60%] overflow-hidden border-y border-red-900 px-2">
              <p className="h-full text-ellipsis text-sm">{book.resumo}</p>
            </div>
            <div className="flex justify-between">
              <button className="red-button m-2 self-end">Emprestar</button>
              <button
                key={book.id}
                className="red-button m-2 self-end"
                onClick={() => deleteBook.mutate({ id: book.id })}
              >
                Apagar
              </button>
            </div>
          </div>
        </div>
        <div>{deleteBook.isLoading && <div className="modal-base"></div>}</div>
      </div>
    </>
  );
};

export default BookCard;
