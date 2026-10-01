import type { ReactNode } from "react";

export default function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-black sm:py-6">
      <div className="relative h-dvh w-full overflow-hidden bg-bg sm:h-[calc(100dvh-48px)] sm:max-h-[900px] sm:w-[430px] sm:rounded-[32px] sm:shadow-2xl">
        {children}
      </div>
    </div>
  );
}
