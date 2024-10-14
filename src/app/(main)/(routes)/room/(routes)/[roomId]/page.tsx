"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { useParams } from "next/navigation";
import { sendMove } from "@/actions/move.action";
import type {
  IncomingMoveEventData,
  MemberAddedEventData,
  MemberRemovedEventData,
  SubscriptionSuccededEventData,
} from "@/types/pusherEvents";
import { useToast } from "@/hooks/use-toast";

export default function GameRoomPage() {
  const { roomId } = useParams() as { roomId: string };
  const { toast } = useToast();
  const [players, setPlayers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState<string[]>(
    Array.from({ length: 9 }, () => "")
  );
  const mark =
    gameState.filter((mark) => mark !== "").length % 2 === 0 ? "X" : "O";

  useEffect(() => {
    if (!roomId) return;

    const room = pusherClient.subscribe("presence-" + roomId);

    room.bind(
      "pusher:subscription_succeeded",
      (data: SubscriptionSuccededEventData) => {
        setPlayers(Object.keys(data.members));
        setLoading(false);
      }
    );

    room.bind("pusher:member_added", (data: MemberAddedEventData) => {
      setPlayers((prev) => [...prev, data.id]);
      toast({ title: "Player joined" });
    });

    room.bind("pusher:member_removed", (data: MemberRemovedEventData) => {
      setPlayers((prev) => prev.filter((id) => id !== data.id));
      toast({ title: "Player left" });
    });

    room.bind("incoming-move", (data: IncomingMoveEventData) => {
      setGameState((prev) => {
        const newState = [...prev];
        newState[data.pos] = data.mark;
        return newState;
      });
    });

    return () => {
      pusherClient.unsubscribe(roomId);
      room.unbind_all();
    };
  }, [roomId, toast]);

  function makeMove(pos: number) {
    sendMove(roomId, { mark, pos });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href="/">Go back</Link>
      <h1>Room: {roomId}</h1>
      {players.length === 2 ? (
        <div className="flex items-center gap-1">
          <div className="size-4 rounded-full bg-green-600" />
          <span>All players connected</span>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <div className="size-4 rounded-full bg-red-600" />
          <span>Missing oponent</span>
        </div>
      )}
      <div className="size-40 grid grid-cols-3">
        {gameState.map((mark, index) => (
          <div
            className="flex items-center justify-center border"
            onClick={() => makeMove(index)}
            key={index}
          >
            {mark}
          </div>
        ))}
      </div>
    </div>
  );
}
