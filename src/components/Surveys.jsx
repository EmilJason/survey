
import { useEffect, useState } from "react"



const Surveys = ({question, handleClick,ansSelected}) => {
    const [q, setQ] = useState(question);
    const [aselect, setAselect] = useState(false);
    const [bselect, setBselect] = useState(false);
    const [cselect, setCselect] = useState(false);

    
    const handleAnswer = (e) => {
        handleClick(question,e)
        console.log(q,ansSelected.ans)
        switch (ansSelected.ans) {
            case 'A':
                setAselect(true)
                setBselect(false)
                setCselect(false)
                break;
            case 'B':
                setAselect(false)
                setBselect(true)
                setCselect(false)
                break;
            case 'C':
                setAselect(false)
                setBselect(false)
                setCselect(true)
                break;
        
            default:
                setAselect(false)
                setBselect(false)
                setCselect(false)
                break;
        }
       
    }

    
   
    return ( 
        <div className='question'>
            <p>{q}</p>
            <button onClick={()=>handleAnswer('A')} style={{backgroundColor: aselect ? "green" : "transparent"}} >A. Not Effective</button>
            <button onClick={()=>handleAnswer('B')} style={{backgroundColor: bselect ? "green" : "transparent"}}>B. Neither Ineffective or Effective</button>
            <button onClick={()=>handleAnswer('C')} style={{backgroundColor: cselect ? "green" : "transparent"}}>C. Effective</button>
        <span>Answer: {ansSelected.ans}</span>
        </div>
     );
}
 
export default Surveys;