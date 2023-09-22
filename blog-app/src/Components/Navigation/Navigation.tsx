import Link from "next/link";
import "./Navigation.scss";
import ThemeButton from "@/Components/Theme-Button/ThemeButton";

const NavigationBar = () => {
  return (
    <>
      <div className="navbar-wrapper">
        <Link href={"/"} className="logo">
          Blogo.
        </Link>
        <div className="links-wrapper">
          <ThemeButton />

          <Link href={"sign-in"}>
            <>Sign-in</>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
