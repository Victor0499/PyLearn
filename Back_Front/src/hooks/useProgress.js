"use client";

export function useProgress() {
  const saveProgress = async (lessonId, exerciseId, codeSnapshot) => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lesson_id: lessonId,
          exercise: exerciseId,
          code_snapshot: codeSnapshot,
        }),
      });
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  };

  return { saveProgress };
}
