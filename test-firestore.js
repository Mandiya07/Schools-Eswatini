import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import fs from "fs";

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const test = async () => {
    try {
        console.log("Trying to write to firestore...");
        await setDoc(doc(db, "institutions", "test-inst"), { id: "test-inst", name: "test", region: "Hhohho", status: "published", slug: "test" });
        console.log("Success!");
    } catch (e) {
        console.error("Firestore Error:", e);
    }
    process.exit();
};
test();
