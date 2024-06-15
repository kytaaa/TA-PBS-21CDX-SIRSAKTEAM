import React from "react";
import type { Metadata } from "next";
import EditPage from "./page";

export const metadata: Metadata = {
  title: "Ubah Data Karya",
};

export default function EditLayout({ params }: { params: { id: string } }) {
  return (
    <div>
      {/* panggil file "page" (folder "edit/[id]") */}
      <EditPage
        params={{
          id: params.id,
        }}
      />
    </div>
  );
}
