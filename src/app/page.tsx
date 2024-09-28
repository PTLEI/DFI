"use client";
import EditContent from "@/components/edit_content";
import Nav from "@/components/nav";
import { Provider } from "@/context";

export default function Home() {
  return (
    <Provider>
      <main className="min-h-screen flex" data-bs-theme="light">
        <Nav />
        <EditContent />
      </main>
    </Provider>
  );
}
