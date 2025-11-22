"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Heart } from "lucide-react";

export default function TweetControls({ tweet }) {
  const { user } = useUser();
  const addLike = useMutation(api.tweets.addLike);
  const removeLike = useMutation(api.tweets.removeLike);

  if (!user) return null;

  // Check if current user has liked this tweet
  const userLike = tweet.likes.find(like => like.userId === user.id);

  return (
    <div className="mt-5">
      {!userLike ? (
        <button
          onClick={() => addLike({ tweetId: tweet._id, userId: user.id })}
          className="flex gap-1 justify-center items-center"
        >
          <Heart fill="transparent" stroke="white" size={18} />{" "}
          <span>{tweet.likes.length}</span>
        </button>
      ) : (
        <button
          onClick={() => removeLike({ likeId: userLike._id })}
          className="flex gap-1 justify-center items-center"
        >
          <Heart fill="red" stroke="red" size={18} /> <span>{tweet.likes.length}</span>
        </button>
      )}
    </div>
  );
}
