import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
    const { data: sessionData } = useSession();
  
    return (
      <div className="w-full bg-slate-200">
        <div className="mx-4 my-2 flex justify-between">
          <div>Book-me</div>
          <div className="">
            <h1>
              {sessionData?.user?.name
                ? `Livros de ${sessionData.user.name}`
                : ""}
            </h1>
          </div>
          <div className="">
            {sessionData?.user ? (
              <div>
                <button onClick={() => void signOut()}>SignOut</button>
              </div>
            ) : (
              <button onClick={() => void signIn()}>SignIn</button>
            )}
          </div>
        </div>
      </div>
    );
  };

export default Header