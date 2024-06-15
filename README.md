# express-novice

### Project Setup
Node + TypeScript
- `npm init --yes` - Initialize [Node](https://nodejs.org/en) project
    - `npm install pnpm` - Optional: Install [pnpm](https://pnpm.io/)
- `pnpm add -D typescript tsx @types/node` - Install [TypeScript](https://www.typescriptlang.org/) + [tsx](https://tsx.is/)
- `tsc --init ` - Generate [TypeScript configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- Edit `tsconfig.json`:
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "rootDir": "./",
    "baseUrl": "./src",
    "paths": {
      "@utils/*": ["utils/*"]
    },
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

Express
- `pnpm add express` - Install [Express](https://expressjs.com/)
    - `pnpm add -D @types/express` - Optional: Install types for Express
- Update `scripts` in `package.json`:
```json
// package.json
"scripts": {
    "start": "tsx ./src/main.ts",
    "dev": "tsx watch ./src/main.ts"
}
```

Jest
- `pnpm add -D ts-jest @jest/globals @types/jest` - Install [Jest](https://jestjs.io/)
- `npx ts-jest config:init --ts` - Generate [Jest configuration](https://jestjs.io/docs/configuration)

### References
- [Umi - Uploading Assets](https://developers.metaplex.com/umi/storage)


