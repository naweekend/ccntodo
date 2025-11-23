"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TalkingEinstein } from "@/components/Einstein";
import { SpeechBubble } from "@/components/SpeechBubble";
import { questions } from "./questions";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function QuizPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const q = parseInt(searchParams?.get("q") || "0", 10);
  const question = questions[q];

  let alphabets = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
  }

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  useEffect(() => {
    const storedIQ = localStorage.getItem("iq");
  }, []);

  const handleNext = () => {
    if (selectedOptionIndex === null) {
      return;
    }

    const option = question.options[selectedOptionIndex];

    // Save answer in localStorage
    const prevAnswers = JSON.parse(localStorage.getItem("iqAnswers") || "[]");
    const newAnswers = [...prevAnswers];
    newAnswers[q] = option.iqValue;
    localStorage.setItem("iqAnswers", JSON.stringify(newAnswers));

    // Save total IQ
    const totalIQ = newAnswers.reduce((a, b) => a + b, 0);
    localStorage.setItem("iq", totalIQ);

    // Move to next question by updating query param
    if (q + 1 < questions.length) {
      router.push(`/iq/quiz?q=${q + 1}`);
    } else {
      // Quiz finished
      router.push(`/iq/quiz/result`); // or wherever your result page is
    }
  };

  return (
    <div className="py-20 px-5 mt-17 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Question {q + 1}</h1>
      <div className="flex sm:flex-row flex-col justify-center items-center gap-5">
        <TalkingEinstein stopAt={1000} className="lg:w-70 md:w-50 sm:w-30 w-1/2 mt-5  max-sm:hidden" />
        <div className="flex flex-col">
          <SpeechBubble
            className="max-w-md w-full sm:text-xl text-lg min-w-80 mt-5"
            text={`${question.text}`}
            speed={40}
          />

          <div className="flex flex-col mt-5 gap-2">
            {question.options.map((option, idx) => (
              <div
                key={option.text}
                className={`py-2 px-3 cursor-pointer flex justify-between transition-all items-center gap-2 rounded-md active:scale-95 duration-250 text-center`}
                onClick={() => setSelectedOptionIndex(idx)}
              >
                <div className="flex gap-1.5">
                  <h1>{alphabets[idx + 1]}.</h1>
                  {option.text}
                </div>
                {selectedOptionIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <button
            className={`mt-5 px-6 py-3 bg-primary rounded-md text-primary-foreground hover:bg-primary/80 cursor-pointer active:scale-95 transition-all duration-250 disabled:bg-gray-600 ${selectedOptionIndex === null ? "cursor-not-allowed" : ""}`}
            disabled={selectedOptionIndex === null}
            onClick={handleNext}
          >
            {q + 1 === questions.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div >
  );
}
