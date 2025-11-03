import AuthButton from "@/components/client/AuthButton";
import Navbar from "@/components/client/Navbar";
import { Button } from "@/components/ui/button";
import { ChartSpline, CheckCircle, CloudUploadIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center p-15 md:p-5">
        <h1 className="font-bold text-2xl md:text-4xl text-zinc-800 mb-4">
          Organize Your Chaos.<br />Amplify Your Focus
        </h1>

        <div className="mt-5 mb-7 grid w-full max-w-3xl gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-transparent p-5 shadow-sm border flex flex-col items-center">
            <CheckCircle className="h-8 w-8 md:h-10 md:w-10 text-sky-400" />
            <p className="mt-5 text-sm md:text-base text-slate-800">Create & Manage Projects</p>
          </div>
          <div className="rounded-2xl bg-transparent p-5 shadow-sm border flex flex-col items-center">
            <ChartSpline className="h-8 w-8 md:h-10 md:w-10 text-sky-400" />
            <p className="mt-5 text-sm md:text-base text-slate-800">Track Projects Visually</p>
          </div>
          <div className="rounded-2xl bg-transparent p-5 shadow-sm border flex flex-col items-center">
            <CloudUploadIcon className="h-8 w-8 md:h-10 md:w-10 text-sky-400" />
            <p className="mt-5 text-sm md:text-base text-slate-800">Secure & Sync Data</p>
          </div>
        </div>
        <AuthButton />
      </main>

    </div>

  )
}