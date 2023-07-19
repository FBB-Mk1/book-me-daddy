import { api } from "~/utils/api";

export default function CreateBook (){

      
    const createBook = api.book.create.useMutation({});
    
    return (<button
        id="title"
        className="border"
        onClick={() =>
          createBook.mutate({
            title: "placeholder",
            author: "placholder",
            resumo: "resumo placeholder",
          })
        }
        
      >
        Criar
      </button>);
}