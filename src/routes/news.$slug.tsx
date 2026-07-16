import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar } from "lucide-react";
import { getNewsBySlug, type NewsPost } from "@/lib/news";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    const post = await getNewsBySlug({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return { post: post as NewsPost };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article Not Found — CAAS Towing & Recovery" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.post;
    const url = `https://caastowing.com/news/${p.slug}`;
    const img = p.cover_url || "https://caastowing.com/og-image.jpg";
    return {
      meta: [
        { title: `${p.title} — CAAS Towing & Recovery` },
        { name: "description", content: p.excerpt ?? p.title },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt ?? p.title },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: img },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: img },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: NotFoundPost,
  errorComponent: () => (
    <div className="pt-40 pb-20 container-x">
      <p className="text-muted-foreground">This article couldn't be loaded.</p>
    </div>
  ),
  component: NewsDetail,
});

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function NotFoundPost() {
  return (
    <section className="pt-40 pb-20 container-x">
      <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Not Found</div>
      <h1 className="font-display text-5xl">Article not found.</h1>
      <Link
        to="/news"
        className="mt-8 inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-heading uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to news
      </Link>
    </section>
  );
}

function NewsDetail() {
  const { post } = Route.useLoaderData();
  const paragraphs = post.body.split(/\n{2,}/).map((p: string) => p.trim()).filter(Boolean);

  return (
    <>
      <section className="pt-32 pb-8 border-b border-border">
        <div className="container-x max-w-4xl">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-3 w-3" /> All News
          </Link>
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-primary">
            <span>{post.category}</span>
            <span className="text-muted-foreground/60">•</span>
            <span className="text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.published_at)}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mt-4">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl">{post.excerpt}</p>
          )}
        </div>
      </section>

      {post.cover_url && (
        <section className="py-8 bg-background">
          <div className="container-x max-w-5xl">
            <div className="aspect-[16/9] w-full overflow-hidden border border-border bg-surface">
              <img
                src={post.cover_url}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      <section className="pb-24">
        <div className="container-x max-w-3xl">
          <article className="prose-invert">
            {paragraphs.map((para: string, i: number) => (
              <p
                key={i}
                className="text-base md:text-lg leading-relaxed text-foreground/90 mb-6 whitespace-pre-wrap"
              >
                {para}
              </p>
            ))}
          </article>

          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4 flex-wrap">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-heading uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> More Articles
            </Link>
            <Link
              to="/request"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-heading uppercase tracking-wider hover:btn-glow transition-all"
            >
              Request Service
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
