import Image from "next/image";

export default function Home() {
  return (
    <div
      className="bg-primary-foreground min-h-screen flex flex-col"

    >
      <nav className="flex items-center justify-between w-full max-w-4xl px-4 py-2">
        <div>
          <Image src="/logo.png" width={100} height={100} alt="Logo" />
        </div>
        <div>
          <button className="text-primary-background bg-primary-foreground px-4 py-2 rounded-lg">
            Sign In
          </button>
        </div>
      </nav>
    </div>
  );
}
