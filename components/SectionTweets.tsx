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
    <section className="flex flex-col gap-4 p-4 max-w-xl mx-auto">
      {tweets.map((tweet) => (
        <div
          key={tweet._id}
          className="flex items-start gap-3 p-4 border rounded-xl shadow-sm hover:bg-gray-50 transition"
        >
          {/* Profile Picture */}
          <img
            src={tweet.userPicture}
            alt={tweet.userFullName}
            className="w-12 h-12 rounded-full object-cover"
          />

          {/* Tweet Content */}
          <div className="flex-1">
            {/* User info */}
            <div className="flex items-center gap-2">
              <span className="font-bold">{tweet.userFullName}</span>
              <span className="text-gray-500">@{tweet.userName}</span>
            </div>

            {/* Retweet info */}
            {tweet.retweet && (
              <div className="text-sm text-gray-400 mt-1">
                Retweeted from <a className="underline">{tweet.retweet}</a>
              </div>
            )}

            {/* Tweet text */}
            <p className="mt-1 text-gray-800">{tweet.text}</p>

            {/* Likes */}
            <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              <span>{tweet.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}