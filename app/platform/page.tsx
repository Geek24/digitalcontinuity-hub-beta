import { Suspense } from "react";
import PlatformContent from "./PlatformContent";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PlatformContent />
    </Suspense>
  );
}
