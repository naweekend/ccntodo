"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Spinner } from "./ui/spinner";
import timeAgo from "@/lib/timeAgo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import TweetControls from "./TweetControls";

export default function SectionTweets() {
  const tweets = useQuery(api.tweets.getTweets);
  console.log(tweets);

  if (!tweets) return <div className="p-10">
    <Spinner />
  </div>;

  // Check if it's an error object
  if (!Array.isArray(tweets)) {
    console.log("ERROR", tweets.error);
    return <div className="p-10">
      <Spinner />
    </div>;;
  }

  return (
    <section className="flex flex-col max-w-xl mx-auto w-full border-r border-l border-foreground/20">
      {tweets.map((tweet) => (
        <div
          key={tweet._id}
          className="flex items-start w-full gap-3 p-4 hover:bg-foreground/5 transition border-b border-foreground/20"
        >
          {/* Profile Picture */}
          <Avatar className="size-12">
            <AvatarImage src={tweet.userPicture} />
            <AvatarFallback>K</AvatarFallback>
          </Avatar>

          {/* Tweet Content */}
          <div className="flex-1">
            {/* tweet info */}
            <div className="flex items-center gap-2">
              <span className="font-bold">{tweet.userFullName}</span>
              <span className="opacity-70">@{tweet.userName}</span>
              <span className="opacity-50">{timeAgo(tweet._creationTime)}</span>
            </div>

            {/* Tweet text */}
            <p className="mt-1 whitespace-pre-wrap">{tweet.text}</p>

            <TweetControls tweet={tweet} />
          </div>
        </div>
      ))}
    </section>
  );
}