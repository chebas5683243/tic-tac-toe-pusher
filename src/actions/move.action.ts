"use server";

import { pusherServer } from "@/lib/pusher";
import type { IncomingMoveEventData } from "@/types/pusherEvents";

export async function sendMove(room: string, move: IncomingMoveEventData) {
  try {
    pusherServer.trigger("presence-" + room, "incoming-move", move);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
