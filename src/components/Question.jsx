import { Options } from "./Options";

export const Question = ({ questionObj, answer, dispatch }) => {
  const { question, options, correctOption } = questionObj;

  return (
    <div>
      <h4>{question}</h4>
      <Options
        options={options}
        dispatch={dispatch}
        answer={answer}
        correctOption={correctOption}
      />
    </div>
  );
};
