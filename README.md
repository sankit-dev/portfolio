# ankit.

Personal site of Ankit Singh. Black and white, simple, a little playful.

Built with Next.js, Tailwind CSS and MDX. The previous design lives on the `archive/old-design` branch.

## Run it

```bash
pnpm install
pnpm dev
```

## Edit content

Almost everything you see is in one file: [`src/data/site.ts`](./src/data/site.ts).

- **Profile, links, email, roles**: `SITE`
- **Work timeline**: `JOBS`
- **Projects** (Web gets a browser frame, Mobile gets a phone frame): `PROJECTS`. Add a `screenshot` path to replace the placeholder.
- **Blog**: `FEATURED_POST` and `EXTERNAL_POSTS` link out to X/Medium. Posts written on the site are `.mdx` files in [`content/`](./content).
- **Books**: `BOOKS`, with what you liked, what didn't land, and a verdict.

Anything in `[square brackets]` is a placeholder waiting for real content.

## Pages

| Route | What's there |
| --- | --- |
| `/` | Hero, about, builder arc, honest stats |
| `/work` | Expandable work timeline |
| `/projects` | Project showcase with All / Shipped / Cooking filters |
| `/blog`, `/blog/[slug]` | Featured post, on-site MDX posts, posts elsewhere |
| `/books` | Bookshelf; click a spine and the book opens |

## License

MIT
