import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionsData, setQuestionsData] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(r=>r.json())
    .then((data)=>setQuestionsData(data));
  },[])

  function addQuestion(formData){
    // console.log(questionsData, formData);
    setQuestionsData([...questionsData, formData]);
  }

  function onDeleteQuestion(question){
   const remQuestions = questionsData.filter((questionData)=>questionData.id !== question.id)
    setQuestionsData(remQuestions);
  }

  function onUpdateQuestion(question){
    const updateQuestions = questionsData.map((item)=>{
      if (item.id === question.id ){
        return question
      } else {
        return item
      }
    })

    setQuestionsData(updateQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm getFormData = {addQuestion} /> : <QuestionList qLists = {questionsData} onDeleteItem={onDeleteQuestion} onUpdateItem = {onUpdateQuestion}/>
      }
      <p></p>
    </main>
  );
}

export default App;
