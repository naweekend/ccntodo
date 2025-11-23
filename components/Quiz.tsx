" flex items-center gap-1use client";
import { ArrowRight } from "lucide-react";
import { TalkingEinstein } from "./Einstein";
import { SpeechBubble } from "./SpeechBubble";

export default function Quiz() {
  return (
    <>
      <h1 className="sm:text-5xl text-3xl font-bold">The Real IQ Test</h1>
      <div className="flex justify-center items-center gap-5 mt-5">
        <TalkingEinstein stopAt={8200} className="lg:w-60 md:w-50 sm:w-30 w-20" />
        <SpeechBubble
          className="h-50 max-w-md w-full sm:text-lg text-sm"
          text={`Well. Well. Well… another fledgling attempting to measure his wits.${"|"}${"\n"}This IQ test isn't exactly kindergarten, kiddo.${"|"} Brace yourself;${"|"} genius isn't handed out like candy.`}
          speed={40}
        />
      </div>
      <button className="py-3 px-7 mt-5 text-lg bg-white hover:bg-white/90 transition-all duration-250 active:scale-90 rounded-md text-black cursor-pointer flex items-center gap-1">Start IQ Test <ArrowRight size={16} /></button>
    </>
  )
}