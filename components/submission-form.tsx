"use client";

import { useState } from "react";

export default function SubmissionForm() {
  const [playerName, setPlayerName] = useState("");
  const [demonName, setDemonName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerName,
          demonName,
          videoUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessage("Submission sent successfully!");

      setPlayerName("");
      setDemonName("");
      setVideoUrl("");
    } catch (err) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-md flex-col gap-4 rounded-lg border p-6 shadow"
    >
      <h2 className="text-2xl font-bold">Submit a Record</h2>

      <input
        type="text"
        placeholder="Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="rounded border p-2"
        required
      />

      <input
        type="text"
        placeholder="Demon Name"
        value={demonName}
        onChange={(e) => setDemonName(e.target.value)}
        className="rounded border p-2"
        required
      />

      <input
        type="url"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="rounded border p-2"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Record"}
      </button>

      {message && (
        <p className="text-center text-sm">
          {message}
        </p>
      )}
    </form>
  );
}