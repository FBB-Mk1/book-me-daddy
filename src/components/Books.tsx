import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const Books: React.FC = () => {
    const { data: sessionData } = useSession();
  
    const { data: books, refetch: refetchBooks } = api.book.getAll.useQuery(
      undefined,
      {
        enabled: sessionData?.user !== undefined,
      }
    );

    return (
      <div className="h-full w-5/6">
        <div id="input">

        </div>
        <div id="output" className="">
          <div>
            <div className="flex flex-wrap bg-red-200">
              {books?.map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  
function BookCard (book: {
    title: string,
    author: string,
    resumo: string,
    id: string,
    userId: string,
  }) {
  
    return(
      <div className="bg-red-600 w-40 h-60 text-white flex-col flex m-2">
        <span className="text-xl self-center h-[20%]">{book.title}</span>
        <span className="text-sm self-end px-2">{book.author}</span>
        <span className="h-[55%]">{book.resumo}</span>
        <button className="self-end mx-2 px-2 border">Delete</button>
      </div>
    )
}

export default Books