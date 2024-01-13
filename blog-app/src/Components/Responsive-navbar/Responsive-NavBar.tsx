"use client";
import './Responsive-Navbar.scss';
import { Divide as Hamburger } from "hamburger-react";
import { useState } from "react";
import ThemeButton from "../Theme-Button/ThemeButton";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import ProfileButton from "../ProfileButton/Profile-Button";
import { animate, delay, motion } from 'framer-motion';
const ResponsiveNavBar=()=>{
    const [isOpen, setOpen] = useState(false);



    return (
      <>
        <Hamburger
          toggle={setOpen}
          toggled={isOpen}
          color="#5a0da6"
          rounded
          size={25}
        />
        {isOpen && (
          <motion.div  
          animate={{ opacity: 1,
            scale: [0, 1]}} transition={{delay:0.25,type:"spring"}}
            className="res-navlinks">
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
          </motion.div>
        )}
      </>
    );
}

export default ResponsiveNavBar;