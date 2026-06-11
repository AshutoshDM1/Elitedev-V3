import { useCallback, useRef } from "react";

/**
 * A reusable hook to pre-load and play audio files on demand.
 * Useful for click feedback, hover sounds, etc.
 * 
 * @param src Path to the audio file (e.g. "/sound/mixkit-mouse-click.wav")
 */
export function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (typeof window === "undefined") return;

    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      // Preload the audio file
      audioRef.current.preload = "auto";
    }

    // Reset to start to allow rapid consecutive plays
    audioRef.current.currentTime = 0;
    
    // Play with error handling (catches browser block errors)
    audioRef.current.play().catch((err) => {
      console.warn("Audio play failed or was blocked by browser:", err);
    });
  }, [src]);

  return { play };
}
