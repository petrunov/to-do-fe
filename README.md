# NEXbase Core

This is a simple ToDo app based on NEXbase Core (made by Vesselin Petrunov out of the scope of Simple ToDo).

# Installation

Accessible at http://localhost:3002/todos

```bash
$ docker build -t simple-todo .
$ docker run -p 3002:3000 -d --name simple-todo simple-todo
```

OR

```bash
$ yarn
$ yarn dev
```

## What does it give you?

Always up to date NextJS application with configured:

- TypeScript
- Prettier
- ESLint
- StyleLint
- Lint-staged
- Husky

### Pre-configured commands

- yarn dev
- yarn build
- yarn start
- yarn lint:styles
- yarn lint
- yarn lint:fix
- yarn prettier
- yarn prepare

## Installation

1. Clone the repository.

## Getting Started

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Based on NextJS

This project is based on NextJS 14

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
