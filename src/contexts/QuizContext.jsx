import React, { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "../hooks/useFetchQuestions";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    fetchQuestions();
  }, [])
  

  const fetchQuestions = async () => {
    try {
      const resp = await fetch("http://localhost:3000/questions");
      const data = await resp.json();
      dispatch({ type: "dataRecived", payload: data });
    } catch (error) {
      console.error(error);
      dispatch({ type: "dataFail" });
    }
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Error ❌: QuizContext was used outside the QuizProvider");
  return context;
};
