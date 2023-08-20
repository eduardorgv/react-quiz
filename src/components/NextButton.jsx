export const NextButton = ({ dispatch, answer, index, numQuestions }) => {
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
