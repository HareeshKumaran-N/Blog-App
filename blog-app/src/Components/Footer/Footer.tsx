"use client";
import { useRef } from "react";
import "./Footer.scss";
import Image from "next/image";
import Link from "next/link";
async function Footer() {
  //  const [play] = useSound('../../../public/hoverMusic.mp3');

  const audioRef = useRef();
  const PlayMusic = () => {

      audioRef.current?.play();
    
  };
  return (
    <div className="footer-main-wrapper">
      <Link
        target="_blank"
        href="https://www.linkedin.com/in/hareesh-kumaran-160578230"
        onMouseEnter={PlayMusic}
      >
        {/* <Image src={LinkedLogo} alt="Linked in" width={25} height={25} /> */}
        <audio ref={audioRef} src="/hoverMusic.mp3"/>
        <p>Developed by Hareesh</p>
      </Link>
    </div>
  );
}

export default Footer;
