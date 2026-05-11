export const checkEnvVariables = () => {
  const REQUIRED = [
    "DATABASE_PORT",
    "DATABASE_USER",
    "DATABASE_PASSWORD",
    "DATABASE_NAME",
    "DATABASE_HOST",
    "RESEND_API_KEY",
    "SENDER_EMAIL",
    "RECEIVER_EMAIL",
    "ALLOWED_ORIGIN"
  ];

  const missingEnvVariables = REQUIRED.filter(
    (envKey) => process.env[envKey] === undefined,
  );

  if (missingEnvVariables.length > 0) {
    console.error("\n╔══════════════════════════════════════════════╗");
    console.error("║       ⚠  Variables d'environnement          ║");
    console.error("╚══════════════════════════════════════════════╝");
    missingEnvVariables.forEach((envKey) => {
      console.error(`❌  ${envKey} est manquant`);
    });
    console.error("\n💥 Démarrage annulé.\n");
    return process.exit(1);
  }
};
