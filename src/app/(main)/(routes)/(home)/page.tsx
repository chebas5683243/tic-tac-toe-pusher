import "server-only";

import { Metadata } from "next";
import { UsernameForm } from "@/components/forms/username-form";

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Tic Tac Toe game",
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col w-72">
          <h1 className="font-bold text-primary">Tic Tac Toe</h1>
          <UsernameForm />
        </div>
      </main>
    </div>
  );
}
