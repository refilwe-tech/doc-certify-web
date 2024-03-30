import { FolderFilesImage } from "../../../assets";
import { LoginForm } from "../../forms";

export const LoginPage = () => {
  return (
    <section className="flex bg-primary items-center h-full">
      <section className="w-1/2 bg-white h-full flex justify-center">
        <LoginForm />
      </section>
      <section className="w-1/2 flex bg-primary justify-center">
        <img
          src={FolderFilesImage}
          alt="login"
          className="object-cover hidden lg:block"
        />
      </section>
    </section>
  );
};
