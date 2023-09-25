import Link from "next/link";
import "./Navigation.scss";
import ThemeButton from "@/Components/Theme-Button/ThemeButton";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
const NavigationBar = () => {
  return (
    <>
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
           <Link href={"/write"}>
            <>media</>
          </Link>
           <Link href={"/write"}>
            <>your blogs</>
          </Link>


          <UserButton afterSignOutUrl="/sign-in"/>
          </SignedIn>
          
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
