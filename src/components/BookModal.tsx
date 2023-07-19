import { type Book } from "@prisma/client";
import { type Dispatch, type FC, type SetStateAction, useState } from "react";
import { api } from "~/utils/api";

interface BookModalProps {
  setModalToggle: Dispatch<SetStateAction<boolean>>;
  setBookList: Dispatch<SetStateAction<Book[ ]>>
}

const BookModal: FC<BookModalProps> = ({ setModalToggle, setBookList }) => {
  const createBook = api.book.create.useMutation({
    onSuccess(book) {
        setBookList((prev) => [...prev, book]);
        }
  });
  const [disabled, setDisabled] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [resumo, setResumo] = useState("");

  const create =() => {
    createBook.mutate({
      title,
      author,
      resumo,
    });
    while(createBook.isLoading){
        setDisabled(true);
    }
    setDisabled(false);
    setModalToggle(false);
    setTitle("");
    setAuthor("");
    setResumo("");
  };

  
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/75">
      <div className="rounded-md bg-white p-3">
        <div className="flex">
          <div className="flex flex-col">
            <button
              className="mb-2 mr-2 self-end font-bold text-red-500"
              onClick={() => setModalToggle(false)}
            >
              x
            </button>
            <label>
              Título:
              <input
                className="border"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              Autor:
              <input
                className="border"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </label>
            <label>
              Resumo:
              <input
                className="border"
                type="text"
                value={resumo}
                onChange={(e) => setResumo(e.target.value)}
              />
            </label>
            <button
              id="title"
              className="border"
              onClick={create}
              disabled={disabled}
            >
              Criar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
