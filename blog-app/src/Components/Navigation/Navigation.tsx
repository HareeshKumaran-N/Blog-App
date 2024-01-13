
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
  SignOutButton,
} from "@clerk/nextjs";
import ResponsiveNavBar from "../Responsive-navbar/Responsive-NavBar";
const NavigationBar = () => {
  return (
    <div className="navbar-wrapper">
      <Link href={"/"} className="logo">
        Blogo.
      </Link>
      <div className="links-wrapper">
        <ThemeButton />

        <SignedOut>
          <Link href={"/sign-in"}>
            <>Sign-in</>
          </Link>
        </SignedOut>

        <SignedIn>
          <Link href={"/write"}>
            <>write</>
          </Link>

          <ProfileButton />
        </SignedIn>
      </div>
      <div className="mobile-nav-bar">
          <ResponsiveNavBar/>
      </div>
    </div>
  );
};

export default NavigationBar;
