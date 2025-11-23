"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function QuestionsForm({ questions, startAt = 0 }) {
  const [step, setStep] = useState(startAt);
  const [selectedValue, setSelectedValue] = useState(""); // index of selected option as string
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = questions[step];

  const handleNext = () => {
    if (selectedValue === "") return; // require a selection

    const selectedOption = currentQuestion.options[Number(selectedValue)];
    if (selectedOption) {
      setScore((prev) => prev + selectedOption.iqValue);
    }

    setSelectedValue(""); // reset for next question

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleRetake = () => {
    setStep(0);
    setSelectedValue("");
    setScore(0);
    setCompleted(false);
  };

  if (!questions || questions.length === 0) {
    return <p>No questions found.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 rounded-xl shadow-lg flex flex-col gap-6">
      {!completed ? (
        <>
          {/* Question */}
          <h2 className="text-3xl font-bold">{currentQuestion.text}</h2>

          {/* Options */}
          <RadioGroup
            value={selectedValue}
            onValueChange={(val) => setSelectedValue(val)}
            className="flex flex-col gap-3"
          >
            {currentQuestion.options.map((opt, idx) => {
              const id = `q-${step}-opt-${idx}`;
              return (
                <div key={id} className="flex items-center space-x-2">
                  <RadioGroupItem value={String(idx)} id={id} />
                  <Label htmlFor={id}>{opt.text}</Label>
                </div>
              );
            })}
          </RadioGroup>

          {/* Next / Finish Button */}
          <Button
            onClick={handleNext}
            disabled={selectedValue === ""}
            className="self-end mt-4"
          >
            {step + 1 === questions.length ? "Finish" : "Next"}
          </Button>

          <p className="mt-2 text-sm">
            Question {step + 1} of {questions.length}
          </p>
        </>
      ) : (
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Your IQ Score</h2>
          <p className="text-xl">{score}</p>
          <Button onClick={handleRetake}>Retake Quiz</Button>
        </div>
      )}
    </div>
  );
}
