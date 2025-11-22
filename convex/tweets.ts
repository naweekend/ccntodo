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
      .order("desc")
      .collect();

    return tweets;
  },
})

export const createTweet = mutation({
  args: { text: v.string(), retweet: v.optional(v.string()) },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log("IDENTITY", identity)

    if (!identity || !identity.subject || !identity.name || !identity.nickname || !identity.pictureUrl) {
      console.warn("No identity!");
      return { error: "UNAUTHORIZED" };
    }

    if (args?.retweet) {
      await ctx.db.insert("tweets", {
        text: args.text,
        userId: identity.subject,
        userFullName: identity.name,
        userName: identity.nickname,
        userPicture: identity.pictureUrl,
        likes: 0,
        retweet: args.retweet,
      })

      return;
    }

    await ctx.db.insert("tweets", {
      text: args.text,
      userId: identity?.subject,
      userFullName: identity?.name,
      userName: identity?.nickname,
      userPicture: identity?.pictureUrl,
      likes: 0,
    })

    return;
  },
})