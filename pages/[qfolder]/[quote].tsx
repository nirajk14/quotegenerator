import {useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { DocumentData, QuerySnapshot, collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from '../../firebase';

const DynamicPage = () => {
    const router= useRouter();
    //console.log(router);
    const {query: myquery} = useRouter();
    //console.log(query.quote)
    //const snapshot = await getDocs(collection(db,"quotes"))
    console.log(myquery.qfolder)
    console.log(myquery.quote)
    const getQuotes= async () => {
        var num="0"
        var initial="Default";
        var iteration=999;

        (initial?myquery.qfolder:"Default")
        
        const q= query(
            collection(db,'quotes'),
            where("initial","==",myquery.qfolder||"Default"),
            where("iteration","==",Number(myquery.quote)))
        const snapshot = await getDocs(q)
        snapshot.docs.forEach((docs)=>console.log(docs.data().quote))
        return snapshot
    }
    const [snapshot, setSnapshot] = useState<QuerySnapshot<DocumentData>|null>(null);

    useEffect(() => {
        //console.log('useEffect is called')
        getQuotes().then(data => {
            setSnapshot(data);
        });
    }, [myquery.qfolder,myquery.quote]);

    return (<>
        <div>
        This is a {myquery.quote}th iteration of the quote by someone with initials {myquery.qfolder} stored in our database.
        {snapshot && snapshot.docs.map(doc => (
            <div key={doc.id}>{doc.data().quote}</div>
        ))}
    </div>
        </>
    )
}

export default DynamicPage