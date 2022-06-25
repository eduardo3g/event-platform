import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

export function Subscribe() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    try {
      await createSubscriber({ variables: { name, email } });

      navigate("/event");
    } catch (e) {
      console.log("Something went wrong to create the subscription", e);
    }
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 max-auto">
        <div className="max-w-[640px]">
          <Logo />

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Build <strong className="text-blue-500">enterprise-ready</strong>{" "}
            softwares with <strong className="text-blue-500">serverless</strong>{" "}
            technologies
          </h1>

          <p className="mt-4 text-gray-200 leading-relaxed">
            Join live streams and hand-on labs that will cover the hottest
            topics about serverless technologies on Amazon Web Services, such as
            Lambda, DynamoDB, Cognito, API Gateway, Kinesis and many more.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Subscribe for free</strong>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-2 w-full"
          >
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="text"
              placeholder="Your full name"
              onChange={(event) => setName(event.target.value)}
            />
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="email"
              placeholder="Email address"
              onChange={(event) => setEmail(event.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Join the event
            </button>
          </form>
        </div>
      </div>

      <img
        src="/src/assets/code-mockup.png"
        className="mt-10"
        alt="Code mockup image"
      />
    </div>
  );
}
