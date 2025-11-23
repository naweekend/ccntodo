"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Heart, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";

export default function TweetControls({ tweet }) {
  const { user } = useUser();
  const addLike = useMutation(api.tweets.addLike);
  const removeLike = useMutation(api.tweets.removeLike);
  const deleteTweet = useMutation(api.tweets.deleteTweet);

  if (!user) return null;

  // Check if current user has liked this tweet
  const userLike = tweet.likes.find(like => like.userId === user.id);
  const canDelete = tweet.userId === user.id;

  return (
    <div className="flex gap-5">
      <button
        onClick={() => !userLike
          ? addLike({ tweetId: tweet._id, userId: user.id })
          : removeLike({ likeId: userLike._id })
        }
        className="relative flex gap-1.5 justify-center items-center cursor-pointer"
      >
        <motion.div
          key={!!userLike}
          initial={{ scale: 0.7 }}
          animate={{ scale: 1.3 }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
        >
          {userLike ? (
            <Heart fill="red" stroke="red" size={16} />
          ) : (
            <Heart fill="transparent" stroke="white" size={16} />
          )}
        </motion.div>
        <span>{tweet.likes.length}</span>
      </button>

      {canDelete && (
        <>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="flex gap-1 hover:text-destructive transition-all duration-200 active:scale-90 justify-center items-center cursor-pointer"
              >
                <Trash2 stroke="currentColor" size={18} />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the post
                  and remove its data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteTweet({ tweetId: tweet._id })} className="flex gap-1 bg-destructive text-destructive-foreground hover:bg-destructive/80 cursor-pointer"><Trash2 />Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
}
