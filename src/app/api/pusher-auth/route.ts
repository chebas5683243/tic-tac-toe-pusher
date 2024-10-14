import { pusherServer } from "@/lib/pusher";
import type { PusherChannelUsersResponse } from "@/types/pusherServer";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  const data = await req.text();

  const [socketId, channelName] = data
    .split("&")
    .map((str) => str.split("=")[1]);

  const response = await pusherServer.get({
    path: "/channels/" + channelName + "/users",
  });

  console.log("asd");

  const { users }: PusherChannelUsersResponse = await response.json();

  if (users.length >= 2) {
    return new Response("Room is full", { status: 400 });
  }

  const userId = nanoid();

  const auth = pusherServer.authorizeChannel(socketId, channelName, {
    user_id: userId,
    user_info: { user_id: userId },
  });

  return new Response(JSON.stringify(auth));
}
