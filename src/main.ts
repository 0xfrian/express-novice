import { startApp } from "@utils/app";


export default async function main() {
  startApp();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
