import Link from "next/link";
import "./Navigation.scss";
import ThemeButton from "@/Components/Theme-Button/ThemeButton";
import ProfileButton from "../ProfileButton/Profile-Button";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
  SignOutButton
} from "@clerk/nextjs";
const NavigationBar = () => {
  return (

      <div className="navbar-wrapper">
        <Link href={"/"} className="logo">
          Blogo.
        </Link>
        <div className="links-wrapper">
          <ThemeButton />

          <SignedOut>
          <Link href={"sign-in"}>
            <>Sign-in</>
          </Link>
          </SignedOut>
          
          <SignedIn>
          <Link href={"/write"}>
            <>write</>
          </Link>
         
           {/* <Link href={"/"}>
            <>your blogs</>
          </Link> */}

              {/* <SignOutButton>
            
              </SignOutButton> */}
              
          {/* <UserButton afterSignOutUrl="/sign-in"/> */}

              <ProfileButton/>
          </SignedIn>
          
        </div>
      </div>

  );
};

export default NavigationBar;
