import { Suspense } from "react";
import LandingContent from "./LandingContent";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LandingContent />
    </Suspense>
  );
}
