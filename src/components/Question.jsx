import { useQuiz } from "../contexts/QuizContext";
import { Options } from "./Options";

export const Question = () => {
  const { questions, index } = useQuiz();
  const questionObj = questions[index];
  const { question, options, correctOption } = questionObj;

  return (
    <div>
      <h4>{question}</h4>
      <Options
        options={options}
        correctOption={correctOption}
      />
    </div>
  );
};
