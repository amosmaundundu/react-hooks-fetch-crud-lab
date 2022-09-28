import React from "react";

function QuestionItem({ question ,onDelete,onSelectChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers?answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  )):[];

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}onChange={e=>onSelectChange(id,e.target.value)}>{options}</select>
      </label>
      <button onClick={onDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
