import { useFormatTime } from "../hooks/useFormatTime";
import { useTick } from "../hooks/useTick";

export const Timer = ({ dispatch, secondsRemaining }) => {
  const { formattedTime } = useFormatTime(secondsRemaining);
  useTick(dispatch);

  return <div className="timer">{formattedTime}</div>;
};
