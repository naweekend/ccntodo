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

    const tweetsWithoutLikes = await ctx.db
      .query("tweets")
      .order("desc")
      .collect()

    const tweetIds = tweetsWithoutLikes.map((tweet) => tweet._id);

    // each like for an id
    const likesByTweet = {};

    console.log("TWEET IDS", tweetIds)

    await Promise.all(tweetIds.map(async (tweetId) => {
      const likes = await ctx.db
        .query("likes")
        .withIndex("by_tweetId", (q) => q.eq("tweetId", tweetId))
        .collect();

      // @ts-ignore
      likesByTweet[tweetId.toString()] = likes;
    }));

    const tweets = tweetsWithoutLikes.map((tweet) => {
      // @ts-ignore
      const likes = likesByTweet[tweet._id.toString()];

      return {
        ...tweet,
        likes: likes,
      }
    });

    return tweets;
  },
})

export const createTweet = mutation({
  args: { text: v.string(), retweet: v.optional(v.string()) },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();


    if (!identity || !identity.subject || !identity.name || !identity.nickname || !identity.pictureUrl) {
      console.warn("No identity!", identity);
      return { error: "UNAUTHORIZED" };
    }

    const iq = await ctx.db
      .query("iqs")
      .withIndex("by_userid", (q) => q.eq("userId", identity.subject))
      .first()

    if (args?.retweet) {
      await ctx.db.insert("tweets", {
        text: args.text,
        userId: identity.subject,
        userFullName: identity.name,
        userName: identity.nickname,
        userPicture: identity.pictureUrl,
        retweet: args.retweet,
        iq: iq?.iq || 0,
      })

      return;
    }

    await ctx.db.insert("tweets", {
      text: args.text,
      userId: identity?.subject,
      userFullName: identity?.name,
      userName: identity?.nickname,
      userPicture: identity?.pictureUrl,
      iq: iq?.iq || 0,
    })

    return;
  },
})

export const deleteTweet = mutation({
  args: { tweetId: v.id("tweets") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.tweetId);
  },
})

export const addLike = mutation({
  args: { tweetId: v.id("tweets"), userId: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("likes", {
      tweetId: args.tweetId,
      userId: args.userId,
    })
  },
})

export const removeLike = mutation({
  args: { likeId: v.id("likes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.likeId);
  },
})

export const getTweetsForUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    console.log(identity)

    if (!identity) {
      console.warn("No identity!");
      return { error: "UNAUTHORIZED" };
    }

    const tweetsWithoutLikes = await ctx.db
      .query("tweets")
      .withIndex("by_userid", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect()

    const tweetIds = tweetsWithoutLikes.map((tweet) => tweet._id);

    // each like for an id
    const likesByTweet = {};

    await Promise.all(tweetIds.map(async (tweetId) => {
      const likes = await ctx.db
        .query("likes")
        .withIndex("by_tweetId", (q) => q.eq("tweetId", tweetId))
        .collect();

      // @ts-ignore
      likesByTweet[tweetId.toString()] = likes;
    }));

    const tweets = tweetsWithoutLikes.map((tweet) => {
      // @ts-ignore
      const likes = likesByTweet[tweet._id.toString()];

      return {
        ...tweet,
        likes: likes,
      }
    });

    return tweets;
  },
})
