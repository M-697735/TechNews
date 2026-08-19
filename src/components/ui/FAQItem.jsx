import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function FAQItem({
  item,
  open,
  onClick,
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900">

      <button
        onClick={onClick}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <h3 className="text-lg font-semibold">
          {item.question}
        </h3>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
        >
          <ChevronDown />
        </motion.div>

      </button>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
          >

            <p className="px-6 pb-6 leading-7 text-zinc-400">
              {item.answer}
            </p>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}

export default FAQItem;