import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@acme/ui/button";

import { authClient } from "~/auth/client";

export function AuthShowcase() {
  const { t } = useTranslation();
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();

  if (!session) {
    return (
      <Button
        size="lg"
        onClick={async () => {
          const res = await authClient.signIn.social({
            provider: "discord",
            callbackURL: "/",
          });
          if (!res.data?.url) {
            throw new Error("No URL returned from signInSocial");
          }
          await navigate({ href: res.data.url, replace: true });
        }}
      >
        {t("auth.signInWithDiscord")}
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>{t("auth.loggedInAs", { name: session.user.name })}</span>
      </p>

      <Button
        size="lg"
        onClick={async () => {
          await authClient.signOut();
          await navigate({ href: "/", replace: true });
        }}
      >
        {t("auth.signOut")}
      </Button>
    </div>
  );
}
