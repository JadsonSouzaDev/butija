import { type FC, type PropsWithChildren } from "react";
import BTJNavbar from "../navbar";

const BTJPage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <BTJNavbar />
      <main className="">{children}</main>
    </div>
  );
};

export default BTJPage;
