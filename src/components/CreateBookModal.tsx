import { type Book } from "@prisma/client";
import { type Dispatch, type FC, type SetStateAction, useState } from "react";
import { api } from "~/utils/api";
import Logo from "./Logo";

interface BookModalProps {
  setModalToggle: Dispatch<SetStateAction<boolean>>;
  setBookList: Dispatch<SetStateAction<Book[]>>;
}

const BookModal: FC<BookModalProps> = ({ setModalToggle, setBookList }) => {
  const createBook = api.book.create.useMutation({
    onSuccess(book) {
      setBookList((prev) => [...prev, book]);
      setTitle("");
      setAuthor("");
      setResumo("");
    },
  });
  const [disabled, setDisabled] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [resumo, setResumo] = useState("");
  

  const create = () => {
    createBook.mutate({
      title,
      author,
      resumo,
    });
    while (createBook.isLoading) {
      setDisabled(true);
    }

    setDisabled(false);
  };

  return (
    <div className="modal-base">
      <div className="rounded-md bg-white p-3">
        <div className="flex flex-col w-56">
          <div className="flex flex-col gap-2">
            <button
              className="self-end rounded-full px-2 text-center font-bold red-button"
              onClick={() => setModalToggle(false)}
            >
              X
            </button>
            <div className="border-y border-red-900 items-center justify-center flex py-9">
            <Logo />

            </div>
            <label className="text-red-900 font-bold text-xs ">Título:</label>
            <input
              className="border-red-900 border rounded-sm px-1"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={disabled}
            />
            <label  className="text-red-900 font-bold text-xs">Autor:</label>
            <input
              className="border-red-900 border rounded-sm px-1"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={disabled}
            />
            <label  className="text-red-900 font-bold text-xs ">Resumo:</label>
            <textarea
              className="border-red-900 border rounded-sm px-1"
              rows={5}
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
              disabled={disabled}
            />
            <button
              id="title"
              className="red-button"
              onClick={create}
              disabled={disabled}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;


export const useFilters = () => {
  const [search, setSearch] = useState('');
  
  return {
    search, setSearch
  }
}