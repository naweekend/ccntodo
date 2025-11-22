"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";

export default function SectionCreateTweet() {
  const [tweetText, setTweetText] = useState("");
  const createTweet = useMutation(api.tweets.createTweet);

  return (
    <section>
      <input value={tweetText} onChange={(e) => setTweetText(e.target.value)} type="text" placeholder="enter tweet" />
      <button onClick={() => {
        createTweet({ text: tweetText })
      }} type="submit">Submit</button>
    </section>
  )
}