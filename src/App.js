import logo from './logo.svg';
import './App.css';
import Surveys from './components/Surveys';
import { useEffect, useState } from 'react';
import Answers from './components/Answers';
import {collection, addDoc, getFirestore} from 'firebase/firestore'
import {getDatabase, ref, set, onValue} from 'firebase/database'
import { initializeApp } from 'firebase/app';

 const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

let db = getDatabase(app)

function App() {
  let sur = [
    {quest: "Q1. DELIVER THROUGH OTHERS", ans: ''},
    {quest: "Q2. UNDERSTAND OTHERS PERSPECTIVE", ans: ''},
    {quest: "Q3. SOLVE COMPLEX PROBLEMS", ans: ''},
  ]
  const [answers, setAnswers] = useState(sur);
  const [enableSubmit, setEnableSubmit] = useState(false);

  const handleClick = (q,a) =>{
    let surArray = answers
    let res = surArray.findIndex((obj => obj.quest == q))
    surArray[res].ans = a
    setAnswers(surArray)
    renderSubmit()
  }

  useEffect(()=>{
    console.log('useEffect:',answers)
  },[answers])

  

 const handleSubmit =  ()=>{
    let checkans = []
    let result;
    answers.map(item=>{
        let result = item.ans != ''
        checkans.push(result)
    })
    result = checkans.includes(false)
    if (!result) {
      // console.log(answers);
      set(ref(db,'/surveys/'),answers)
    } else {
      alert("Please answer all questions")
    }
    getData()
 }

 const renderSubmit = () =>{
    let checkans = []
      let result;
      answers.map(item=>{
          let result = item.ans != ''
          checkans.push(result)
      })
      result = checkans.includes(false)
      if (!result) {
       return setEnableSubmit(true)
      } else {
       return setEnableSubmit(false)
      }
 }

 const getData = () =>{
  let contentRef= ref(db,'/surveys/')
  onValue(contentRef,snapshot=>{
    let data = snapshot.val()
    setAnswers(data)
  })
 }


  return (
    <>
      <div className='card'>
        <h3>Survey</h3>
        {
          answers.map(item=>{
            return <Surveys key={item.quest} question={item.quest} ansSelected={item} handleClick={handleClick}  />
          })
        }
        {
          enableSubmit ? <button className='submit' onClick={handleSubmit} >Submit</button> : null
        }
        <hr />
        <h5>Answers:</h5>
        {
          answers.map(item=>{
            return <Answers key={item.quest} question={item.quest} ans={item.ans} />
          })
        }
        
      </div>
    </>
  );
}

export default App;
