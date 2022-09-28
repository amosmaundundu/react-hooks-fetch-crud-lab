import React, {useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";
function QuestionList({data}) {
  const [questions,setQuestions]= useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/questions')
    .then(data=>data.json())
    .then((res)=>{
      setQuestions(res);
    })
  },[]);
  const onDelete=(id)=>{
    fetch(`http://localhost:3000/questions/${id}`,{
    method: 'DELETE',

  })
  .then(data=>data.json())
  .then(()=>{
    const upDate= questions.filter(q=>q.id!=id)
    setQuestions(upDate)
  })
  }
  const handleAnswers=({id, correctIndex})=>{
    fetch(`http://localhost:3000/questions/${id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
   body:JSON.stringfy({correctIndex}),
  })
  .then(data=>data.json())
  .then(data=>{
    const upDated= questions.map(item=>{
      if(item.id===data.id){
        return data
      }
      return item
    })
    // console.log(updated,"after update");


  })
  // setQuestions(update)
}
  return (
    <section>
      <h1>Quiz Questions</h1>
      {questions?questions.map((item,i)=><QuestionItem key={i}onSelectChange={handleAnswers} question={item} onDelete={()=>onDelete(item.id)}/> ):[]}
    </section>
  );
}

export default QuestionList;
