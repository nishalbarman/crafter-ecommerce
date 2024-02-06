// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getRemoteConfig } from "firebase/remote-config";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI2kOf4xpIZMIjA4Zg_XkCCsz45PA2848",
  authDomain: "***REMOVED***.firebaseapp.com",
  projectId: "***REMOVED***",
  storageBucket: "***REMOVED***.appspot.com",
  messagingSenderId: "494472006485",
  appId: "1:494472006485:web:54225d0f8a73fb3f70fddc",
  measurementId: "G-GLN2YDK63G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Remote Config and get a reference to the service
const remoteConfig = getRemoteConfig(app);
remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
remoteConfig.defaultConfig = {
  isFlashSaleEnable: true,
  saleEndTime: "123133",
};

export { remoteConfig };
