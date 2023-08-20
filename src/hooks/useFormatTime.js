import { useEffect, useState } from "react";

export function useFormatTime(secondsRemaining) {
  const [formattedTime, setFormattedTime] = useState("");
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const formatedMins = mins.toString().padStart(2, "0");
    const formatedSeconds = seconds.toString().padStart(2, "0");

    setFormattedTime(`${formatedMins}:${formatedSeconds}`);
  }, [secondsRemaining]);

  return { formattedTime }
}
