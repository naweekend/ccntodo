"use client";

import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SectionCreateTweet() {
  const [tweetText, setTweetText] = useState("");
  const createTweet = useMutation(api.tweets.createTweet);
  const { user } = useUser();

  return (
    <section className="max-w-2xl flex flex-col gap-5 items-center w-full p-5 border-r border-l border-b border-foreground/20">
      <div className="flex sm:gap-2 gap-1 w-full">
        <Avatar className="sm:size-12 size-10">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>K</AvatarFallback>
        </Avatar>
        <Textarea maxLength={280} minLength={1} className="w-full border-0 focus:outline-0 focus:border-0 outline-0 sm:text-lg!" value={tweetText} onChange={(e) => setTweetText(e.target.value)} placeholder="What's happening?" />
      </div>

      <div className="flex justify-between items-center gap-5 w-full">
        <p className="text-destructive">{tweetText.length}/280</p>

        <Button className="w-fit rounded-full px-6" onClick={() => {
          if (tweetText.length < 1) {
            toast.error("Post cannot be empty");
            return;
          } else if (tweetText.length > 280) {
            toast.error("Post cannot be longer than 280 characters");
            return;
          }
          createTweet({ text: tweetText })
          setTweetText("");
        }} type="submit">Post</Button>
      </div>
    </section>
  )
}