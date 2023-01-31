import { useRouter } from 'next/router'
import { collection, getDocs, query, where } from "firebase/firestore"; 
//import {db} from '../firebase'

const DynamicPage = () => {
    const router= useRouter();
    console.log(router);
    //const q=query(collection(db,'quotes'),where("initial","==","A"))
    //const snapshot = getDocs(q)

    return (<>
        <h1> This is a {router.query.qfolder} page</h1>
        <h2>This data is from database. The database quote is </h2>
        </>
    )
}

export default DynamicPage