import { type Book } from "@prisma/client";
import { type Dispatch, type FC, type SetStateAction} from "react";
import { api } from "~/utils/api";


interface BookDetailsModalProps {
  setDetailsModalToggle: Dispatch<SetStateAction<boolean>>;
  setBookList: Dispatch<SetStateAction<Book[]>>;
  book: Book;
}

const BookDetailsModal: FC<BookDetailsModalProps> = ({setDetailsModalToggle, setBookList, book}) => {
  const deleteBook = api.book.delete.useMutation({
    onSuccess: (data) => {
      setBookList((prev) => prev.filter((item) => item.id !== data.id));
    },
  });

  return (
    <div className="modal-base">
      <div className="flex h-48 w-64 flex-col items-center justify-center bg-white text-black">
        <p className="m-5">EMPRESTAR o livro: {book.title}</p>
        <button
          className="red-button"
          onClick={() => {
            setDetailsModalToggle((prev) => !prev);
          }}
        >         
          Sair
        </button>
        <button
          key={book.id}
          className="red-button m-2 self-end"
          onClick={() => deleteBook.mutate({ id: book.id })}
        >
          Apagar
        </button>
        <div>{deleteBook.isLoading && <div className="modal-base"></div>}</div>
      </div>
    </div>
  );
};

export default BookDetailsModal;
