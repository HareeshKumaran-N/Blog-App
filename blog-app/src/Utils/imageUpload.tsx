import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase_app from "./firebase-config";
export default function fileUplod(file:File)
{
const storage = getStorage(firebase_app);
const uniquename=new Date().getTime+file.name;
const storageRef = ref(storage, uniquename);
const uploadTask = uploadBytesResumable(storageRef, file);
let uploadedURL="oombu";

uploadTask.on('state_changed',
  (snapshot) => {

    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {

    switch (error.code) {
      case 'storage/unauthorized':

        break;
      case 'storage/canceled':
    
        break;

      // ...

      case 'storage/unknown':
       
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      uploadedURL=downloadURL;
      console.log(uploadedURL);
    });
  
  }
)

}