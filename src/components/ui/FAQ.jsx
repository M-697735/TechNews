import { useState } from "react";

import { faq } from "../../data/faq";

import FAQItem from "./FAQItem";

function FAQ() {
  const [openId, setOpenId] = useState(1);

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">

      <div className="mb-16 text-center">

        <span className="rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm text-teal-400">
          Frequently Asked Questions
        </span>

        <h2 className="mt-6 text-4xl font-bold">

          Got Questions?

          <span className="text-teal-400">
            {" "}We've got answers.
          </span>

        </h2>

      </div>

      <div className="space-y-5">

        {faq.map((item) => (

          <FAQItem
            key={item.id}
            item={item}
            open={openId === item.id}
            onClick={() =>
              setOpenId(
                openId === item.id ? null : item.id
              )
            }
          />

        ))}

      </div>

    </section>
  );
}

export default FAQ;