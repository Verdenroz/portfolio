import { useMotionValue } from "framer-motion";
import { useRef } from "react";

export function useTilt(max = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    rotateY.set(((x - width / 2) / (width / 2)) * max);
    rotateX.set(-((y - height / 2) / (height / 2)) * max);
  }
  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }
  return { ref, rotateX, rotateY, onMove, onLeave };
}