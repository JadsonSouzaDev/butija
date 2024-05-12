import Link from "next/link";
import BTJPage from "~/components/btj/page";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

export default async function MySpace() {
  const session = await getServerAuthSession();

  return (
    <BTJPage>
      <main className="flex flex-col items-center justify-center bg-gradient-to-b ">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 ">
          <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-[2rem]">
            Seja bem vindo,{" "}
            <span className="text-yellow-500">
              {session?.user.name?.split(" ")[0]}
            </span>
            !
          </h1>
          <p className="text-center text-lg">
            Você ainda não configurou o seu orçamento. <br></br>Clique no botão
            abaixo para iniciarmos.
          </p>

          <div className="flex pt-8">
            <Link href="/meu-espaco/orcamento">
              <Button
                variant="outline"
                size="lg"
                className="h-14 rounded-full border-black text-xl dark:border-white"
              >
                Configurar orçamento
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </BTJPage>
  );
}
