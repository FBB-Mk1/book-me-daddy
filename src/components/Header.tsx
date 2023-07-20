import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="w-full bg-slate-200">
      <div className="mx-4 my-2 flex items-center justify-between">
        <div className="text-2xl font-mono font-bold text-amber-600">Book.me.daddy</div>
        <div className="">
          <h1 className="text-3xl">
            {sessionData?.user?.name
              ? `Livros de ${sessionData.user.name}`
              : ""}
          </h1>
        </div>
        <div className="flex flex-row px-1">
          <button className="bg-slate-100 px-2 rounded-md hover:bg-slate-300"  onClick={() => void signOut()}>SignOut</button>
          {sessionData ? (<img
          className="mx-1 rounded-full h-8 w-8"
          src={sessionData.user.image ? sessionData.user.image : "noimage"} alt={sessionData.user.name ? sessionData.user.name : "NoName"} />) : ( <div></div> )} 
          
        </div>
      </div>
    </div>
  );
};

export default Header;
