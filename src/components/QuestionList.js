import React from "react";
import QuestionItem from './QuestionItem'

function QuestionList({qLists, onDeleteItem, onUpdateItem}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */
      // console.log(lists);
      qLists.map((qList) => <QuestionItem key={qList.id} question={qList} onDeleteItem = {onDeleteItem} onUpdateItem={onUpdateItem}/>)
      }</ul>
    </section>
  );
}

export default QuestionList;
