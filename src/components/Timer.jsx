import { useQuiz } from "../contexts/QuizContext";
import { useFormatTime } from "../hooks/useFormatTime";
import { useTick } from "../hooks/useTick";

export const Timer = () => {
  const { dispatch, secondsRemaining } = useQuiz();
  const { formattedTime } = useFormatTime(secondsRemaining);
  useTick(dispatch);

  return <div className="timer">{formattedTime}</div>;
};
