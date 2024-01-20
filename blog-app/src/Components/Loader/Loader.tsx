import Image from "next/image";
import loadingGif from '../../../public/loading.gif';
import './Loader.scss';
const Loader=()=>{
    return (
      <div className="loader-main">

          <Image src={loadingGif} width={200} height={200} alt="loader-gif" />
        
      </div>
    );
}

export default Loader;  

