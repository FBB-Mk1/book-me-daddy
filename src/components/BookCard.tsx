import { type Book } from "@prisma/client";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import BookDetailsModal from "./BookDetailsModal";

interface BookCardProps {
  book: Book;
  setBookList: Dispatch<SetStateAction<Book[]>>;
}

const BookCard: FC<BookCardProps> = ({ book, setBookList }) => {
  const [detailsModalToggle, setDetailsModalToggle] = useState(false);

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
            <div className="mb-2 self-center">
              <button
                className="red-button"
                onClick={() => {
                  setDetailsModalToggle((prev) => !prev);
                }}
              >
                Detalhes
              </button>
            </div>
          </div>
          {detailsModalToggle && (
            <BookDetailsModal
              book={book}
              setBookList={setBookList}
              setDetailsModalToggle={setDetailsModalToggle}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BookCard;
