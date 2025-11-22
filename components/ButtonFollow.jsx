"use client"

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { Spinner } from "./ui/spinner";

export default function ButtonFollow({ userId }) {
  const addFollower = useMutation(api.user.addFollower);
  const removeFollower = useMutation(api.user.removeFollower);

  const followers = useQuery(api.user.getFollowers, { userId: userId });
  const { user: currentUser } = useUser();

  if (!followers || !currentUser) return <Spinner />;

  let isFollowing = false;
  if (Array.isArray(followers)) {
    isFollowing = followers?.some((follower) => follower.userId === currentUser.id);
  }

  let currentFollower = null;
  if (Array.isArray(followers)) {
    currentFollower = followers?.find((follower) => follower.userId === currentUser.id);
  }

  return (
    <>
      {!isFollowing ? (
        <button onClick={() => {
          addFollower({ followerId: currentUser.id, userId: userId })
        }} className="py-2 hover:opacity-90 cursor-pointer transition-all duration-250 active:scale-95 px-6 bg-foreground text-background rounded-full">Follow</button>
      )
        : (
          <button onClick={() => {
            removeFollower({ followerId: currentFollower?._id })
          }} className="py-2 hover:opacity-90 cursor-pointer transition-all duration-250 active:scale-95 px-6 bg-foreground text-background rounded-full">Unfollow</button>
        )}
    </>
  )
}