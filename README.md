This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Hot Yoga main page:
- call to action
- new to hot yoga ghent + "must reserve" warning
- link to newest blog
- link to newest event

## Ideas: 
- display on the main page when the next two classes are scheduled
- display on the main page when the next event is scheduled
- put a warning on the timetable page a week or two before the schedule changes (when summer holidays start for example)

## Todo:
- look into sitemap feature
- stop browser caching on pages that can change (timetable etc)
- replace own hamburger menu/ icon with tailwindui one
- fix welcome page (link to contact form)
- fix contact form (validation)
- fix active day in timeTable (static now)
- implement Contentful webhook: site should update on Contentful changes
- Add hot yoga events in Contentful
- Fix Events page
- Upgrade the timetable page:
  - automatically switch schedules during Gentse feesten & winter holidays
  - warn visitors up front of changes in the schedule, let's say 1 or 2 weeks up front

  ## Done:
  - 