import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addFollower = mutation({
  args: { followerId: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("followers", {
      followerId: args.followerId,
      userId: args.userId,
    })
  },
})

export const getFollowers = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      console.warn("No identity!");
      return { error: "UNAUTHORIZED" };
    }

    const followers = await ctx.db
      .query("followers")
      .withIndex("by_userid", (q) => q.eq("userId", args.userId))
      .collect()

    console.log({ followers })

    return followers;
  },
})

export const removeFollower = mutation({
  args: { followerId: v.id("followers") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.followerId);
  },
})


export const getIQForUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    console.log(identity)

    if (!identity) {
      console.warn("No identity!");
      return { error: "UNAUTHORIZED" };
    }

    const iq = await ctx.db
      .query("iqs")
      .withIndex("by_userid", (q) => q.eq("userId", args.userId))
      .first()

    return iq;
  },
})

export const createIQ = mutation({
  args: { userId: v.string(), iq: v.number() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      console.warn("No identity!");
      return { error: "UNAUTHORIZED" };
    }

    await ctx.db.insert("iqs", {
      userId: args.userId,
      iq: args.iq,
    })

    return;
  },
})