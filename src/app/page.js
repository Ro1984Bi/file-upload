"use client";

import Image from "next/image";
import { useState } from "react";

function Home() {
  const [file, setFile] = useState();
  return (
    <div className="flex h-screen justify-center items-center">
      <form
        className="bg-zinc-950 p-5"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!file) return;
          try {
            const form = new FormData();
            form.set("file", file);

            //sending file
            const res = await fetch("/api/upload", {
              method: "POST",
              body: form,
            });

            if (res.ok) {
              console.log("uploaded file");
            }
            const data = await res.json();
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <h1 className="text-4xl text-center my-4">Upload a file</h1>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="bg-zinc-900 text-zinc-100 p-2 rounded block mb-2"
        />

        <button
          className="bg-blue-700 text-zinc-100 p-2 rounded block w-full disabled:opacity-50"
          disabled={!file}
        >
          Upload
        </button>
      </form>
      {file && (
        <Image
          src={URL.createObjectURL(file)}
          alt="file"
          className="w-64 h-64 object-cover mx-auto"
          width={256}
          height={256}
        />
      )}
    </div>
  );
}

export default Home;
