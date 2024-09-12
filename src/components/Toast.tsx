import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

export const Toast = ({
  message,
  success,
  isLoading,
}: {
  message: string;
  success: boolean;
  isLoading?: boolean;
}) => {
  return (
    isLoading && (
      <AnimatePresence>
        {success ? (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-0 left-0 mb-12 h-36 w-64 z-20 flex flex-col items-center justify-center gap-2 bg-green-700 bg-opacity-95 card-shadow"
          >
            <FontAwesomeIcon icon={faCheckCircle} size="2x" />
            <p>{message}</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-24 left-0 h-36 w-64 z-20 flex flex-col items-center justify-center gap-2 bg-red-700 bg-opacity-95 card-shadow"
          >
            <FontAwesomeIcon icon={faXmarkCircle} size="2x" />
            <p>{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    )
  );
};
