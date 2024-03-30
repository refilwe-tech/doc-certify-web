import { userStore } from "../../../reducers";

export const HomePage = () => {
  const { user } = userStore();
  const { username, email } = user;
  return (
    <section>
      <h1 className="text-xl font-semibold">
        Hello, {(username || email) ?? ""} 👋
      </h1>
    </section>
  );
};
