const Answers = ({question, ans}) => {
    return ( 
        <div className="card-result">
            <div className="result">
                <p style={{flexGrow: 1}}>{question}</p> 
                <h5>{ans}</h5>
                
            </div>
        </div>
     );
}
 
export default Answers;