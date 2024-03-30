import { useEffect } from "react";
import { userStore } from "../../../reducers";
import { StatWidget } from "../../widgets";
import localForage from "localforage";

export const HomePage = () => {
  const { login, user } = userStore();
  const { firstName, email, registrationDate } = user;

  useEffect(() => {
    localForage.getItem("user").then((value) => login(value));
  }, [login]);

  return (
    <section className="w-full">
      <h1 className="text-xl font-semibold">
        Hello, {(firstName || email) ?? ""} 👋
      </h1>
      <h1 className="text-sm font-semibold py-2">
        You joined us{" "}
        <span className="text-green-500">{registrationDate ?? ""}</span>. We are
        glad to have you here. Here&apos;s a summary of your activities.
      </h1>
      <section className="grid w-full grid-cols-1 lg:grid-cols-3 gap-4 py-4">
        <StatWidget />
        <StatWidget />
        <StatWidget />
      </section>
    </section>
  );
};
