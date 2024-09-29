"use client";
import EditContent from "@/components/edit_content";
import Nav from "@/components/nav";
import { Provider } from "@/context";
import dynamic from 'next/dynamic';

const IconFontLoader = dynamic(() => import('@/utils/icon_loader'), { ssr: false });

export default function Home() {
  return (
    <Provider>
      <main className="min-h-screen flex" data-bs-theme="light">
        <Nav />
        <EditContent />
        <IconFontLoader />
      </main>
    </Provider>
  );
}
