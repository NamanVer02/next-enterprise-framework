import React, { useEffect, useState } from "react";

interface ProgressStep {
  step: number;
  total: number;
  label: string;
  collection: string;
  type: string;
}

export default function LinkToDbProgress() {
  const [progress, setProgress] = useState<ProgressStep | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource("/api/link-to-db");
    eventSource.onmessage = (event) => {
      if (!event.data) return;
      setProgress(JSON.parse(event.data));
    };
    eventSource.onerror = () => {
      setDone(true);
      eventSource.close();
    };
    return () => eventSource.close();
  }, []);

  if (!progress) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="mb-4 text-lg font-semibold">
          Preparing to link database...
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-500 rounded-full animate-pulse"
            style={{ width: `10%` }}
          />
        </div>
      </div>
    );
  }

  const percent = Math.round((progress.step / progress.total) * 100);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="mb-2 text-lg font-semibold">Linking to database...</div>
      <div className="mb-2 text-base">{progress.label}</div>
      <div className="mb-2 text-sm text-gray-500">
        Step {progress.step} of {progress.total} ({progress.collection} -{" "}
        {progress.type})
      </div>
      <div
        className="w-full h-2 bg-gray-200 rounded-full mb-2"
        style={{ maxWidth: 400 }}
      >
        <div
          className="h-2 bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      {done && <div className="mt-2 text-green-600">Done!</div>}
    </div>
  );
}
