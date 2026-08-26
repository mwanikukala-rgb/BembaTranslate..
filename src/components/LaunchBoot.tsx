import React, { useEffect, useState } from "react";

type BootStep = {
  label: string;
  detail: string;
};

const BOOT_STEPS: BootStep[] = [
  { label: "Starting BembaTranslate", detail: "Preparing your language workspace" },
  { label: "Loading dictionary", detail: "Preparing words and meanings" },
  { label: "Loading lessons", detail: "Preparing vocabulary and practice" },
  { label: "Loading quiz", detail: "Preparing your learning activities" },
  { label: "Almost ready", detail: "Finishing the app setup" },
];

type Props = {
  children: React.ReactNode;
};

export default function LaunchBoot({ children }: Props) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Deliberately polished rather than instant:
    // ~2.4 seconds minimum, while still feeling like real initialization.
    const timers = BOOT_STEPS.map((_, index) =>
      window.setTimeout(() => {
        if (!cancelled) setStep(index);
      }, index * 480)
    );

    const finish = window.setTimeout(() => {
      if (cancelled) return;
      setLeaving(true);

      window.setTimeout(() => {
        if (!cancelled) setStep(BOOT_STEPS.length);
      }, 380);
    }, 2400);

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
      window.clearTimeout(finish);
    };
  }, []);

  const ready = step >= BOOT_STEPS.length;

  return (
    <>
      {!ready && (
        <div
          className={`launch-boot-screen${leaving ? " is-exiting" : ""}`}
          role="status"
          aria-live="polite"
          aria-label="Loading BembaTranslate"
        >
          <div className="launch-boot-inner">
            <div className="launch-boot-mark" aria-hidden="true">
              <span style={{ fontSize: 22, fontWeight: 900 }}>文</span>
            </div>

            <h1 className="launch-boot-brand">BembaTranslate</h1>
            <p className="launch-boot-subtitle">
              African languages, learning and discovery
            </p>

            <div className="launch-boot-status">
              <span className="launch-boot-spinner" aria-hidden="true" />
              <div className="launch-boot-status-copy">
                <strong>
                  {BOOT_STEPS[Math.min(step, BOOT_STEPS.length - 1)].label}
                </strong>
                <span>
                  {BOOT_STEPS[Math.min(step, BOOT_STEPS.length - 1)].detail}
                </span>
              </div>
            </div>

            <div className="launch-boot-dots" aria-hidden="true">
              {BOOT_STEPS.map((_, index) => (
                <i
                  key={index}
                  className={index <= step ? "active" : ""}
                />
              ))}
            </div>

            <div className="launch-boot-progress" aria-hidden="true">
              <span
                style={{
                  width: `${Math.min(
                    100,
                    ((step + 1) / BOOT_STEPS.length) * 100
                  )}%`,
                }}
              />
            </div>

            <p className="launch-boot-note">
              Your language tools are being prepared
            </p>
          </div>
        </div>
      )}

      {children}
    </>
  );
}
