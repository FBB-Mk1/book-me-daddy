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
    <div className="absolute inset-0 flex items-center justify-center bg-black/75">
      <div className="rounded-md bg-white p-3">
        <div className="flex flex-col w-56">
          <div className="flex flex-col gap-2">
            <button
              className="self-end rounded-full bg-red-900 px-2 text-center font-bold text-white"
              onClick={() => setModalToggle(false)}
            >
              X
            </button>
            <Logo />
            <label className="text-red-900 font-bold text-xs">Título:</label>
            <input
              className="border-red-900 border rounded-sm"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={disabled}
            />
            <label  className="text-red-900 font-bold text-xs">Autor:</label>
            <input
              className="border-red-900 border rounded-sm"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={disabled}
            />
            <label  className="text-red-900 font-bold text-xs">Resumo:</label>
            <textarea
              className="border-red-900 border rounded-sm"
              rows={5}
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
              disabled={disabled}
            />
            <button
              id="title"
              className="border-red-900 bg-red-900 border rounded-sm text-white"
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
