let speaking = false;

export function isBembaSpeaking(): boolean {
  return speaking;
}

/**
 * Temporary local Bemba speech interface.
 *
 * The real ONNX model will be connected here after
 * we verify its exact input/output configuration.
 *
 * No internet or cloud service is used.
 */
export async function speakBemba(text: string): Promise<void> {
  const value = text.trim();

  if (!value || speaking) return;

  speaking = true;

  try {
    // Model inference will be connected here.
    // For now this function safely prepares the
    // integration point without changing the UI.
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 100);
    });
  } finally {
    speaking = false;
  }
}

export function stopBembaSpeech(): void {
  speaking = false;
}
