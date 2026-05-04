"use client";

import dynamic from "next/dynamic";

const SwissCursor = dynamic(() => import("@/components/SwissCursor").then(mod => mod.SwissCursor), { 
  ssr: false,
  loading: () => null
});

const SystemSidebar = dynamic(() => import("@/components/SystemSidebar").then(mod => mod.SystemSidebar), { 
  ssr: false,
  loading: () => null
});

export function ClientElements() {
  return (
    <>
      <SwissCursor />
      <SystemSidebar />
    </>
  );
}
