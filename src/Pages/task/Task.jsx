import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../assets/style/Task.css';
import axios from 'axios';
import { GlobalContext } from "../../context/Global";

const Task = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [task, setTask] = useState([]);
  const [number, setNumber] = useState(0);
  const [submittedQuestions, setSubmittedQuestions] = useState([]); 
  const global = useContext(GlobalContext)
  const userId = global.global.user._id;
  useEffect(() => {
    const getTask = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getQuestion');
        const result = response.data;
        setTask(result);
      } catch (err) {
        console.log(err);
      }
    };
    getTask();
  }, []);

  const handleSelect = (questionId, optionId) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = (questionId) => {
    const selectedOptionId = selectedAnswers[questionId];
    const selectedOption = task
      .find((q) => q._id === questionId)
      .options.find((option) => option._id === selectedOptionId);

    if (selectedOption) {
      if (selectedOption.isCorrect) {
        setNumber(number + 10);
        // console.log(10)
      }

      // Add the question to the list of submitted questions
      setSubmittedQuestions((prevSubmitted) => [...prevSubmitted, questionId]);

    } else {
      alert("Please select an option before submitting.");
    }
  };

  if(task.length <= 0){
    console.log("Wow")
  }
  else{
    console.log("Hello")
  }
  const point = {
    point: number
  }
  const handleAllSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/api/point/${userId}`, point, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.status === 200) {
        alert('Your Award Added');
      }
      console.log(response)
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="container mt-5">
      {/* <h1 className="text-center text-light">Your point is : {number}</h1> */}
      {task.map((question) => (
        <div key={question._id} className="question-box">
          <div className="question-header">{question.questionText}</div>

          <div className="row">
            {question.options.map((option) => (
              <div key={option._id} className="col-md-6 option-col">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={option._id}
                    checked={selectedAnswers[question._id] === option._id}
                    onChange={() => handleSelect(question._id, option._id)}
                    disabled={submittedQuestions.includes(question._id)} 
                  />
                  <label className="form-check-label" htmlFor={option._id}>
                    {option.optionText}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <button
            className="submit-btn"
            onClick={() => handleSubmit(question._id)}
            disabled={submittedQuestions.includes(question._id)} 
          >
            {submittedQuestions.includes(question._id) ? "Submitted" : "Submit"}
          </button>
        </div>
      ))}
      <div className="btn-submit-all" onClick={handleAllSubmit}>
        {task.length <= 0? '' : <button>Submit All</button>}
      </div>
    </div>
  );
};

export default Task;