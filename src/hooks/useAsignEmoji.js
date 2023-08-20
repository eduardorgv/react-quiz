import { useEffect, useState } from "react";

export function useAsignEmoji(percentage) {
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    function asignEmoji() {
      if (percentage === 100) {
        setEmoji("🥇");
      } else if (percentage >= 80 && percentage < 100) {
        setEmoji("🎉");
      } else if (percentage >= 50 && percentage < 80) {
        setEmoji("🙃");
      } else if (percentage > 0 && percentage < 50) {
        setEmoji("🤨");
      } else if (percentage === 0) {
        setEmoji("🤦🏻");
      }
    }
    asignEmoji();
  }, []);
  
  return { emoji };
}
