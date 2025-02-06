import { TitleAuth } from "../ui/TitleAuth";
import { SignInForm } from "./ui/SignInForm";

export default function LoginPage() {
  return (
    <>
      <TitleAuth>Sign In</TitleAuth>

      <SignInForm />
    </>
  );
}
