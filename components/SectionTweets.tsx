"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Spinner } from "./ui/spinner";
import timeAgo from "@/lib/timeAgo";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import TweetControls from "./TweetControls";
import Link from "next/link";
import { Brain } from "lucide-react";

export default function SectionTweets() {
  const tweets = useQuery(api.tweets.getTweets);

  if (!tweets) return <div className="p-10 flex justify-center items-center">
    <Spinner />
  </div>;

  // Check if it's an error object
  if (!Array.isArray(tweets)) {
    console.log("ERROR", tweets.error);
    return <div className="p-10 flex justify-center items-center">
      <Spinner />
    </div>;;
  }

  return (
    <section className="flex flex-col sm:max-w-3xl mx-auto w-full scrollbar-none mb-16.5">
      {tweets.map((tweet) => (
        <div
          key={tweet._id}
          className="flex items-start w-full gap-3 p-4 hover:bg-foreground/5 transition border-t border-foreground/20"
        >
          {/* Profile Picture */}
          <Link scroll={true} href={`/profile/${tweet.userId}`}>
            <Avatar className="sm:size-12 size-10">
              <AvatarImage src={tweet.userPicture} />
              <AvatarFallback>K</AvatarFallback>
            </Avatar>
          </Link>

          {/* Tweet Content */}
          <div className="flex-1">
            {/* tweet info */}
            <div className="flex items-center gap-2 max-sm:justify-between">
              <div className="flex gap-2">
                <Link scroll={true} href={`/profile/${tweet.userId}`} className="font-bold hover:underline">{tweet.userFullName}</Link>

                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/iq" className="bg-primary text-primary-foreground flex items-center gap-1 w-fit px-2 rounded-md"><Brain size={16} /> {tweet.iq}</Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    @{tweet.userName} has 102 IQ
                  </TooltipContent>
                </Tooltip>

                <span className="opacity-70 max-sm:hidden">@{tweet.userName}</span>
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