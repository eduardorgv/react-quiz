import { useQuiz } from "../contexts/QuizContext";

export const Options = ({ options, correctOption }) => {
  const { answer, dispatch } = useQuiz();
  const hasAnswer = answer !== null;

  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswer ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          disabled={hasAnswer}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
