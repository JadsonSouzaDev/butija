import Link from "next/link";
import { type FC } from "react";
import { ModeToggle } from "~/components/ui/modeToggle";
import { getServerAuthSession } from "~/server/auth";

const BTJNavbar: FC = async () => {
  const session = await getServerAuthSession();
  return (
    <nav className="flex  p-4 shadow-sm">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link className="text-2xl font-bold" href="/">
            Butija
          </Link>
        </div>
        <div className="flex items-center space-x-4 lg:space-x-8">
          <ModeToggle />
          {session?.user && (
            <Link href="/api/auth/signout" className="">
              Sair
            </Link>
          )}
          {!session?.user && (
            <Link href="/api/auth/signin" className="">
              Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default BTJNavbar;
