import React,{useState} from "react";

function QuestionItem({ question, onDeleteItem, onUpdateItem }) {
  
  const { id, prompt, answers, correctIndex } = question;
  const [qCorrectIndex, setQCorrectIndex] = useState(correctIndex)
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => onDeleteItem(question));
  }

  function handleUpdate(event){
    setQCorrectIndex(event.target.value);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: parseInt(qCorrectIndex) ,
      }),
    })
      .then((r) => r.json())
      .then((updatedData)=>onUpdateItem(updatedData))

  }


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleUpdate} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
