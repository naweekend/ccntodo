import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function RightSide({ className }: { className: string }) {
  const client = await clerkClient();

  const users = await client.users.getUserList({
    limit: 7,
    orderBy: "-last_active_at",
  });

  return (
    <div className={`flex flex-col gap-5 w-100 py-6 px-5 ${className}`}>
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-xl font-semibold">Suggested Accounts</h1>

        {users.data.map((u) => (
          <Link key={u.id} href={`/profile/${u.id}`}>
            <div className="flex items-center gap-3">
              <img
                src={u.imageUrl}
                className="w-10 h-10 rounded-full"
                alt={u.firstName || u.username || "User"}
              />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">
                  {u.firstName} {u.lastName}
                </span>
                <span className="opacity-70 text-xs">@{u.username}</span>
              </div>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}
