//TODO : Add Loading state colors

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

type MessageFunction = (msg: {
  msg: string;
  title: string;
  type: string;
}) => void;
import { Poppins, Montserrat } from "next/font/google";
const poppins = Poppins({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});
interface MessageHubProps {
  config?: {
    tension: number;
    friction: number;
    precision: number;
  };
  timeout?: number;
  children: (add: MessageFunction) => void;
}

interface NotificationProps {
  item: { key: number; msg: string; title: string; type: string };
  timeout: number;
  onCancel: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  item,
  timeout,
  onCancel,
}) => {
  const [progress, setProgress] = useState(100);
  const refMap = useMemo(() => new WeakMap(), []);
  useEffect(() => {
    const timerId = setInterval(() => {
      setProgress(
        (prevProgress) => prevProgress - ((100 / timeout) * 1000) / 60
      ); // Adjust the divisor to control the speed of the progress bar

      return () => {
        clearInterval(timerId);
      };
    }, 1000 / 60); // Adjust the interval to control the speed of the progress bar
    // console.log(progress);
    if (progress <= 0) {
      // console.log("PROGRESS COMPLETED");
      clearInterval(timerId);

      onCancel();
    }

    return () => {
      clearInterval(timerId);
    };
  }, [item, onCancel, timeout, progress]);
  const borderColor =
    item.type == "info"
      ? "border-themeBlue"
      : item.type == "error"
      ? "border-themeRed"
      : item.type == "warn"
      ? "border-themeYellow"
      : "border-themeGreen";
  const Icon =
    item.type == "info"
      ? FaInfoCircle
      : item.type == "error"
      ? FaTimes
      : item.type == "warn"
      ? FaInfoCircle
      : FaCheck;
  const color =
    item.type == "info"
      ? "text-themeBlue"
      : item.type == "error"
      ? "text-themeRed"
      : item.type == "warn"
      ? "text-themeYellow"
      : "text-themeGreen";
  return (
    <motion.div
      key={item.key}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className={`w-[90vw] xl:w-[40vw] box-border overflow-hidden hidden relative ${poppins.className}`}
    >
      <div
        className={`text-white bg-theme_toast_dark_background opacity-90 p-[12px 22px] text-[1rem] grid grid-cols-[1fr auto] gap-[10px] overflow-hidden rounded-md mt-[10px] p-5 border-l-[10px] ${borderColor}`}
        ref={(ref: HTMLDivElement) => ref && refMap.set(item, ref)}
      >
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: timeout / 1000 }}
          className="absolute top-[95%] w-[98%] bg-gradient-to-r from-[#c0392b] to-[#8e44ad] h-[6px] left-[10px] rounded-lg"
        />

        <div className="flex gap-4 items-center">
          <span className={`text-[24px] ${color}`}>
            <Icon />
          </span>
          <p className={`text-[20px] ${color}`}>
            {item.title
              ? item.title
              : item.type == "info"
              ? "Information"
              : item.type == "error"
              ? "Error"
              : item.type == "warn"
              ? "Warning"
              : "Success"}
          </p>
        </div>

        <p className="ml-[5%] text-white/70 text-[16px]">{item.msg}</p>
        <button
          className="cursor-pointer text-[20px] top-[30%] absolute right-[5%]"
          onClick={onCancel}
        >
          X
        </button>
      </div>
    </motion.div>
  );
};

export default function NotificationGenerator({
  config = { tension: 125, friction: 20, precision: 0.1 },
  timeout = 5000,
  children,
}: MessageHubProps) {
  const refMap = useMemo(() => new WeakMap(), []);
  const [items, setItems] = useState<
    { key: number; msg: string; title: string; type: string }[]
  >([]);

  useEffect(() => {
    children((msg: { msg: string; title: string; type: string }) => {
      console.log(msg);
      setItems((state) => [
        ...state,
        { key: Math.random(), msg: msg.msg, title: msg.title, type: msg.type },
      ]);
    });
  }, []);

  const removeItem = (item: { key: number; msg: string }) => {
    setItems((state) => state.filter((i) => i.key !== item.key));
  };

  return (
    <div className="fixed z-[1000] w-[0 auto] top-[30px] m-[0 auto] left-[30px] right-[30px] flex flex-col items-center md:items-end">
      <AnimatePresence>
        {items.map((item) => (
          <Notification
            key={item.key}
            item={item}
            timeout={timeout}
            onCancel={() => removeItem(item)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
