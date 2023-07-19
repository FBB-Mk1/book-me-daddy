import { useState } from "react";
import { api } from "~/utils/api";

export default function CreateBook() {
  const createBook = api.book.create.useMutation({});

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [resumo, setResumo] = useState("");
  
  const create = () => {
     
    createBook.mutate({
        title: title,
        author: author,
        resumo: resumo,
    })
    setTitle('');
    setAuthor('');
    setResumo('');
  }

  return (
    <div className="flex">
      <div className="flex flex-col">
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
        >
          Criar
        </button>
      </div>
    </div>
  );

  // return (
}
