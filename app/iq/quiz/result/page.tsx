"use client";

import { TalkingEinstein } from "@/components/Einstein";
import { SpeechBubble } from "@/components/SpeechBubble";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizResultPage() {
  const { user } = useUser();
  const router = useRouter();
  const userId = user?.id;

  // Initialize IQ from localStorage safely
  const [iq, setIq] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const storedIq = localStorage.getItem("iq");
      return storedIq ? parseInt(storedIq, 10) : null;
    }
    return null;
  });

  const [einsteinText, setEinsteinText] = useState<string>("Analyzing your IQ...");
  const createIQ = useMutation(api.user.createIQ);

  // Update Einstein's text when IQ changes
  useEffect(() => {
    if (iq === null) return;

    const maxIq = 300;
    const percentile = (iq / maxIq) * 100;

    let lines: string[] = [];

    if (percentile <= 20) {
      lines = [
        "Hmm… we need to work on that brainpower, don’t we? Even my cat might score higher… maybe.",
        "C’mon, think harder! Genius isn’t automatic, you know.",
        "Better luck next time, young apprentice. The neurons are still warming up, I see.",
        "Patience is key. Your brain will catch on eventually.",
        "Focus a bit more. There’s potential hiding under all that confusion."
      ];
    } else if (percentile <= 40) {
      lines = [
        "Not bad, but you can do better! I see a spark, keep it alive.",
        "Hmm… there’s some potential here. Work on sharpening it.",
        "Keep going! Genius isn’t far away, just stay focused.",
        "Your brain is awake… mostly. Let’s push it further.",
        "Decent effort, but we aim higher. Try to think deeper."
      ];
    } else if (percentile <= 60) {
      lines = [
        "Ah, respectable IQ, keep it up! You’re on the clever side of average.",
        "I see potential… yes, potential. Keep those neurons firing.",
        "Not bad at all! Your reasoning is solid, but don’t stop here.",
        "Hmm… that’s a solid mind you have. There’s room to grow.",
        "Good work! A little more focus and you’ll do even better."
      ];
    } else if (percentile <= 80) {
      lines = [
        "Impressive! You’ve got some real brainpower. Keep it honed carefully.",
        "Ah, I’d like to see more like you in my lab. Truly remarkable!",
        "You might just be smarter than most humans. Keep testing yourself.",
        "Excellent! The neurons are cooperating nicely. Well done.",
        "You are thinking… very well, indeed. Genius is close behind."
      ];
    } else {
      lines = [
        "Brilliant! Genius level detected. You might rival me one day!",
        "I’m impressed… exceptional intellect! Keep it flowing smoothly.",
        "Your brain is operating at peak capacity. Phenomenal work!",
        "Exceptional intellect! Truly remarkable reasoning abilities.",
        "Phenomenal! Einstein would be proud. Keep pushing the limits."
      ];
    }

    // Pick one random line
    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    setEinsteinText(randomLine);
  }, [iq]);

  const handleContinue = async () => {
    if (!iq || !userId) return;

    try {
      await createIQ({ userId, iq });
      router.push(`/profile/${userId}`);
    } catch (err) {
      console.error("Failed to save IQ:", err);
    }
  };

  return (
    <div className="py-20 px-5 mt-17 flex flex-col justify-center items-center">
      <Link
        href="/"
        className="fixed top-22 active:scale-95 transition-all duration-250 left-5 max-sm:hidden flex items-center gap-1.5"
      >
        <ArrowLeft className="opacity-80" size={16} />Home
      </Link>

      <h1 className="sm:text-5xl text-3xl font-bold">You are IQ {iq}</h1>

      <div className="flex sm:flex-row flex-col justify-center items-center gap-5 mt-5">
        <TalkingEinstein stopAt={1200} className="lg:w-60 md:w-50 sm:w-30 w-1/2" />
        <SpeechBubble
          className="max-w-md w-full sm:text-lg text-xl"
          text={einsteinText}
          speed={40}
        />
      </div>

      <button
        onClick={handleContinue}
        className="py-3 px-7 mt-5 text-lg bg-primary hover:bg-primary/90 transition-all duration-250 active:scale-95 rounded-md text-primary-foreground cursor-pointer flex items-center gap-1"
      >
        Continue <ArrowRight size={16} />
      </button>
    </div>
  );
}
