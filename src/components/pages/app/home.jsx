import { userStore } from "../../../reducers";

export const HomePage = () => {
  const { user } = userStore();
  return (
    <section>
      <h1 className="text-xl font-semibold">Hello, {user?.email ?? ""} 👋</h1>
    </section>
  );
};
