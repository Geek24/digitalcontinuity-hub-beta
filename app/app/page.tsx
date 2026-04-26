import { Suspense } from "react";
import HubContent from "./HubContent";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <HubContent />
    </Suspense>
  );
}
