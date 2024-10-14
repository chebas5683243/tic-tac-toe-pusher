"use client";

import { useAtom } from "jotai";
import { Input } from "../ui/input";
import { usernameAtom } from "@/store/atoms";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function UsernameForm() {
  const router = useRouter();

  const [username, setUsername] = useAtom(usernameAtom);
  const [gameId, setGameId] = useState("");

  function onUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function onGameIdChange(event: React.ChangeEvent<HTMLInputElement>) {
    setGameId(event.target.value);
  }

  function createGame() {
    const id = uuidv4();
    router.push(`/room/${id}`);
  }

  function joinGame() {
    router.push(`/room/${gameId}`);
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        placeholder="Username"
        value={username}
        onChange={onUsernameChange}
      />
      <Separator />
      <Button className="w-full" onClick={createGame}>
        Create new game
      </Button>
      <div className="flex items-center gap-2">
        <Separator className="flex-1" />
        <span>or</span>
        <Separator className="flex-1" />
      </div>
      <div className="flex">
        <Input placeholder="Game ID" value={gameId} onChange={onGameIdChange} />
        <Button className="ml-2" onClick={joinGame}>
          Join game
        </Button>
      </div>
    </div>
  );
}
