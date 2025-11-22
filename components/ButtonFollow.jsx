"use client"

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { Spinner } from "./ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MatrixRain from "@/components/MatrixRain";
import { formatUTCFromMS } from "@/lib/timeAgo";

export default function UserDetails({ userId, userImage, userName, userFullname, userCreatedAt }) {
  const addFollower = useMutation(api.user.addFollower);
  const removeFollower = useMutation(api.user.removeFollower);

  const followers = useQuery(api.user.getFollowers, { userId: userId });
  const { user: currentUser } = useUser();

  if (!followers || !currentUser) return <div className="p-10">
    <Spinner />
  </div>;

  let isFollowing = false;
  if (Array.isArray(followers)) {
    isFollowing = followers?.some((follower) => follower.followerId === currentUser.id);
  }

  let currentFollower = null;
  if (Array.isArray(followers)) {
    currentFollower = followers?.find((follower) => follower.followerId === currentUser.id);
  }

  const canAppear = userId !== currentUser.id;

  return (
    <section className="w-full border-b border-foreground/20">
      <div className="w-full flex flex-col justify-between items-center gap-2">
        <div className="w-full h-30">
          <MatrixRain />
        </div>

        <div className="flex flex-col w-full px-5 pb-5">
          <div className="flex w-full items-center justify-between">
            <Avatar className="size-30 -mt-6">
              <AvatarImage src={userImage} />
              <AvatarFallback>K</AvatarFallback>
            </Avatar>

            {canAppear && (
              !isFollowing ? (
                <button onClick={() => {
                  addFollower({ followerId: currentUser.id, userId: userId })
                }} className="py-2 hover:opacity-90 cursor-pointer transition-all duration-250 active:scale-95 px-6 bg-foreground text-background rounded-full">Follow</button>
              )
                : (
                  <button onClick={() => {
                    removeFollower({ followerId: currentFollower?._id })
                  }} className="py-2 hover:opacity-90 cursor-pointer transition-all duration-250 active:scale-95 px-6 bg-foreground text-background rounded-full">Unfollow</button>
                )
            )}
          </div>

          <div className="flex justify-between items-baseline w-full">
            <div className="flex flex-col mt-5">
              <h1 className="text-2xl font-bold">{userFullname}</h1>
              <h2 className="opacity-80">@{userName}</h2>
            </div>
            <div className="flex flex-col text-right">
              <p className="text-sm opacity-80">Joined {formatUTCFromMS(userCreatedAt)}</p>
              <p>{followers.length == 1 ? `${followers.length ?? 0} Follower` : `${followers.length ?? 0} Followers`}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}