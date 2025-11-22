"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Spinner } from "./ui/spinner";

export default function SectionTweets() {
  const tweets = useQuery(api.tweets.getTweets);
  console.log("TWEETS", tweets)

  if (!tweets) return <Spinner />;

  // Check if it's an error object
  if (!Array.isArray(tweets)) {
    console.log("ERROR", tweets.error);
    return <Spinner />;
  }

  return (
    <section>
      {tweets.map(tweet => (
        <div key={tweet._id}>{tweet.text}</div>
      ))}
    </section>
  );
}