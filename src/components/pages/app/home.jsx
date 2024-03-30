import { userStore } from "../../../reducers";

export const HomePage = () => {
  const { user } = userStore();
  const { firstName, email } = user;
  console.log(user);
  return (
    <section>
      <h1 className="text-xl font-semibold">
        Hello, {(firstName || email) ?? ""} 👋
      </h1>
    </section>
  );
};
