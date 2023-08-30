import { useQuiz } from "../contexts/QuizContext";

export const NextButton = () => {
  const { dispatch, answer, index, numQuestions } = useQuiz();

  if (answer === null) return null;

  let dispatchType = "";
  if (index < numQuestions - 1) {
    dispatchType = "nextQuestion";
  } else if (index === numQuestions - 1) {
    dispatchType = "finish";
  }

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: dispatchType })}
    >
      Next
    </button>
  );
};
