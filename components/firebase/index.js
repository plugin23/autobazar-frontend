import firebase from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyC3bvlOlY1gGFWUiSDMg9YA94E8hwGSwuo",
    authDomain: "mtaa-autobazar-storage.firebaseapp.com",
    projectId: "mtaa-autobazar-storage",
    storageBucket: "mtaa-autobazar-storage.appspot.com",
    messagingSenderId: "276629828442",
    appId: "1:276629828442:web:876afc5961294466e47963",
    measurementId: "G-XL77BC1PLX"
  };
  

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage, firebase as default};

  