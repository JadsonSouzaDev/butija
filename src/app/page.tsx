import Link from "next/link";
import BTJPage from "~/components/btj/page";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <BTJPage>
      <main className="flex flex-col items-center justify-center bg-gradient-to-b pt-8">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Diga olá para a <span className="text-yellow-500">Butija!</span>
          </h1>
          <p className="text-center text-xl">
            Uma forma simples e fácil de gerenciar o seu dinheiro.
          </p>

          <div className="flex flex-col items-center gap-2">
            <Link href={session ? "/meu-espaco" : "/api/auth/signin"}>
              <Button
                variant="outline"
                size="lg"
                className="h-14 rounded-full border-black text-xl dark:border-white"
              >
                {session ? "Comece a usar" : "Entre para começar"}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </BTJPage>
  );
}
