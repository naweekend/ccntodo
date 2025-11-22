import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const getTweets = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    console.log(identity)

    if (!identity) {
      console.warn("No identity!");
      return { error: "UNAUTHORIZED" };
    }

    const tweets = await ctx.db
      .query("tweets")
      // .withIndex("by_userid", (q) => q.eq("userId", identity.subject))
      .collect();

    return tweets;
  },
})

export const createTweet = mutation({
  args: { text: v.string(), retweet: v.optional(v.string()) },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      console.warn("No identity!");
      return { error: "UNAUTHORIZED" };
    }

    if (args?.retweet) {
      await ctx.db.insert("tweets", {
        text: args.text,
        userId: identity?.subject,
        likes: 0,
      })

      return;
    }

    await ctx.db.insert("tweets", {
      text: args.text,
      userId: identity?.subject,
      likes: 0,
    })

    return;
  },
})