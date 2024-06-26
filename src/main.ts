import { ExpressApp } from "@utils/app";

export default async function main() {
  const app = new ExpressApp();
  app.start(3000);
  console.log(`Starting Express app: ${app.url()}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
