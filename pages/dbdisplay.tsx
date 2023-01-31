import {db} from '../firebase'
import { getQuotes } from '../components/quoteslist'
import { useEffect, useState } from 'react';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';

const Quotes = () => {
    const [snapshot, setSnapshot] = useState<QuerySnapshot<DocumentData>|null>(null);

    useEffect(() => {
        getQuotes().then(data => {
            setSnapshot(data)
        });
    }, []);
    console.log(snapshot)
    const iteration= snapshot?.docs.map(doc=>doc.data().iteration)
    const default_string="Iteration cannot be displayed"

    return (
        <div>
            {snapshot && snapshot.docs.map(doc => (
                <div key={doc.id}>{doc.data().quote}</div>
            ))}
            {iteration?iteration[1]?iteration[1]:default_string:default_string}
        </div>
    );
};

export default Quotes;