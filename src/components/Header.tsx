/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from "next-auth/react";
import Logo from "./Logo";

const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <div>
      <div className="bg-red-900 flex justify-between h-14 px-20 inset-0 absolute">
        <Logo />
        
        <div className="flex flex-row px-1 h-full">
          <button className="m-auto white-button"  onClick={() => void signOut()}>SignOut</button>
          {sessionData ? (<img
          className="mx-1 rounded-full h-8 w-8 self-center"
          src={sessionData.user.image ? sessionData.user.image : "noimage"} alt={sessionData.user.name ? sessionData.user.name : "NoName"} />) : ( <div></div> )} 
          
        </div>
      </div>
    </div>
  );
};

export default Header;
