import { type Book } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import BookModal from "~/components/BookModal";
import { api } from "~/utils/api";

export default function Books(){
    const [ bookList, setBookList ] = useState<Book[]>([])
    const [ modalToggle, setModalToggle] = useState<boolean>(false)
    
    const { data: sessionData } = useSession();
    
    const { } = api.book.getAll.useQuery(
      undefined,
      {
        enabled: sessionData?.user !== undefined,
        onSuccess: (data) => {
            setBookList(data)
        }
      }
    );
    
    return (
    <>
    <div>
        {modalToggle && <BookModal setModalToggle={setModalToggle} setBookList={setBookList}/>}
    </div>
        <div className="mx-auto my-12 max-w-3xl">
            <button className="border px-2 rounded-sm" onClick={() => (setModalToggle(true))}>Inserir Livro</button>
            <div className="flex">
                {bookList.map((book) => (
                        <BookCard key={book.id} {...book}/>
                ))}
            </div>
        </div>
    </>
        )
}

function BookCard (book: {
    title: string,
    author: string,
    resumo: string,
    id: string,
    userId: string,
  }) {
    
    const deleteBook = api.book.delete.useMutation({});
    const remover = () => {
        deleteBook.mutate({
            id: book.id
        })
    }

    return(
      <div className="bg-red-600 w-40 h-60 text-white flex-col flex m-2">
        <span className="text-xl self-center h-[20%]">{book.title}</span>
        <span className="text-sm self-end px-2">{book.author}</span>
        <span className="h-[55%]">{book.resumo}</span>
        <button className="self-end mx-2 px-2 border" onClick={remover}>Delete</button>
      </div>
    )
}