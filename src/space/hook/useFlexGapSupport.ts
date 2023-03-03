import { useEffect, useState } from "react";
import detectFlexGapSupported from "../styleChecker";

export default function useFlexGapSupport() {
  const [flexible, setFlexible] = useState(false);
  useEffect(() => {
    setFlexible(detectFlexGapSupported());
  }, []);

  return flexible;
}
