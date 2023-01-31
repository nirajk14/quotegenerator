import { collection, getDocs, query, where } from "firebase/firestore"; 
import {db} from '../firebase'

const getQuotes= async () => {
    const q=query(collection(db,'quotes'),where("initial","==","D"))
    const snapshot = await getDocs(q)
    snapshot.docs.forEach((docs)=>console.log(docs.data().quote))
    return snapshot
}

export {getQuotes}