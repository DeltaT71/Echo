import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-[calc(100vh-300px)] flex justify-center items-center">
      <SignUp />
    </div>
  );
}
