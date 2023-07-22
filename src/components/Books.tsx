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
      
      <div className="h-full w-full flex-col">
        <div className="flex h-20 border-red-900 border-b justify-between items-center px-20">
          <button
            className="red-button"
            onClick={() => setModalToggle(true)}
          >
            Adicionar Livro
          </button>
          <div>
            Filtrar Dropdown
          </div>
        </div>
        {deleteBook.isLoading && (
          <div className="modal-base"></div>
        )}
        {isLoading && <div className="modal-base"> Loading...</div>}
      
        <div className="flex flex-wrap gap-1 px-20 pt-4">
          {bookList.map((book) => (
            <BookCard key={book.id} book={book} setBookList={setBookList} />
          ))}
        </div>
      
        
      </div>
      <div>
        {modalToggle && (
          <BookModal
            setModalToggle={setModalToggle}
            setBookList={setBookList}
          />
        )}
      </div>
    </>
  );
}
