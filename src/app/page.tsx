"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import EditContent from "@/components/edit_content";
import Nav from "@/components/nav";
import { Provider } from "@/context";
import dynamic from "next/dynamic";

const IconFontLoader = dynamic(() => import("@/utils/icon_loader"), {
  ssr: false,
});

export default function Home() {
  return (
    <Provider>
      <DndProvider backend={HTML5Backend}>
        <main className="h-screen overflow-hidden flex" data-bs-theme="light">
          <Nav />
          <EditContent />
          <IconFontLoader />
        </main>
      </DndProvider>
    </Provider>
  );
}
