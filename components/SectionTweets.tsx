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
    <section className="flex flex-col max-w-2xl mx-auto w-full scrollbar-none">
      {tweets.map((tweet) => (
        <div
          key={tweet._id}
          className="flex items-start w-full gap-3 p-4 hover:bg-foreground/5 transition border-b border-foreground/20"
        >
          {/* Profile Picture */}
          <Avatar className="sm:size-12 size-10">
            <AvatarImage src={tweet.userPicture} />
            <AvatarFallback>K</AvatarFallback>
          </Avatar>

          {/* Tweet Content */}
          <div className="flex-1">
            {/* tweet info */}
            <div className="flex items-center gap-2 max-sm:justify-between">
              <div className="flex sm:flex-row flex-col sm:gap-2">
                <span className="font-bold max-sm:text-sm">{tweet.userFullName}</span>
                <span className="opacity-70 max-sm:text-sm">@{tweet.userName}</span>
              </div>
              <span className="opacity-50">{timeAgo(tweet._creationTime)}</span>
            </div>

            {/* Tweet text */}
            <p className="sm:mt-1 mt-2 whitespace-pre-wrap text-lg">{tweet.text}</p>

            <div className="mt-3">
              <TweetControls tweet={tweet} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}