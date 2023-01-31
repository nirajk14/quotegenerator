import { useEffect, useState } from "react";
import  {Button,Form } from 'react-bootstrap';
import { db } from "../firebase";
import { collection, getDocs, limit, orderBy, query, setDoc, where, doc, addDoc } from "firebase/firestore"; 


const dbadd=() =>{
    const[data,setData]=useState({
        initial: '',
        iteration: -1,
        quote: '',
    })

    let DBentry= async (e:any) =>{
        e.preventDefault()
        
        try {
            let max_iteration=-1;
            let q=query(collection(db,'quotes'),where("initial","==",data.initial),orderBy("iteration","desc"),limit(1))
            let snapshot = await getDocs(q)
            snapshot.docs.forEach((docs)=>console.log(docs.data().iteration))
            if (snapshot){
                console.log('Its working')
                let max_iteration_array= snapshot.docs.map(doc=>doc.data().iteration)
                if (max_iteration_array.length!=0){
                console.log(max_iteration_array)
                max_iteration=max_iteration_array[0]
                console.log(max_iteration)

                }
                
            }
            max_iteration+=1;
            console.log(max_iteration)
            setData({
                ...data,
                iteration: max_iteration,
            })

            await addDoc(collection(db,'quotes'),{
                initial: data.initial.toUpperCase(),
                iteration: max_iteration,
                quote: data.quote
            })
        
            //Add to database function here
            //Things to do, before we add a new data we need to check if the existing initial is ady in database
            //If it is we need to increase the iteration I think it's done
            
        } catch (error) {
            console.log(error)
            
        }
    }

    return(<>
    <div style ={
        {
            width: '40%',
            margin: 'auto'
        }
    }>
        <h1 className="text-center-my-3">Add Quote</h1>
        <Form onSubmit = {DBentry}>
        <Form.Group className='mb-3'
                controlId='formBasicText'>
                    <Form.Label>Initial</Form.Label>
                    <Form.Control
                    onChange={ (e:any) =>
                    setData({
                        ...data,
                        initial: e.target.value,
                    })}
                    value={data.initial.toUpperCase()}
                    required
                    minLength={2}
                    maxLength={3}
                    type='text'
                    placeholder='Enter your Initials'/>
                </Form.Group>
                <Form.Group className='mb-3'
                controlId='formBasicText'>
                    <Form.Label>Quote</Form.Label>
                    <Form.Control
                    onChange={ (e:any) =>
                    setData({
                        ...data,
                        quote: e.target.value,
                    })}
                    value={data.quote}
                    required
                    type='text'
                    placeholder='Enter your Special Quote'/>
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Add to Database
                </Button>

            
        </Form>


    </div>
    </>)
    

}

export default dbadd;