import { AuthForm } from "@/components/auth-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import logo from "@/assets/ff.svg";

export default function SignUpPage() {
  return (
    <Card className="px-8 max-w-lg mx-auto my-6">
      <CardHeader className="text-center">
        <figure className="mx-auto">
          <img
            src={logo}
            alt="logo"
            className=" size-12"
          />
        </figure>

        <CardTitle className="text-2xl fontbold">Create An Account</CardTitle>
        <CardDescription>
          <p className="w-full max-w-md text-gray-400">
            We'd love to have you on board. Join over 500+ customers around the
            globle and enhace productivity
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm />
      </CardContent>
    </Card>
  );
}
