"use client";
import './Main.scss';
import {useContext} from 'react';
import { ThemeContext } from "@/Components/Theme-Provider/ThemeContextProvider";
import '@/Styles/constants.scss';

const Main=({children}:any)=>{
const {theme}=useContext(ThemeContext);

return<div className={((theme==="light")?"light-mode ":"dark-mode ")+"centered-layout"}>
{
    children
}
</div>
}
export default Main;