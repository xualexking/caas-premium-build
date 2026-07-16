import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { listNews, type NewsPost } from "@/lib/news";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Updates — CAAS Towing & Recovery Ghana" },
      { name: "description", content: "Company updates, safety tips, and recovery stories from CAAS Towing & Recovery — Ghana's 24/7 towing and heavy transport team." },
      { property: "og:title", content: "News & Updates — CAAS Towing & Recovery" },
      { property: "og:description", content: "Company updates, safety tips, and recovery stories from CAAS Ghana." },
      { property: "og:url", content: "https://caastowing.com/news" },
      { property: "og:image", content: "https://caastowing.com/og-image.jpg" },
      { name: "twitter:image", content: "https://caastowing.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://caastowing.com/news" }],
  }),
  component: NewsIndex,
});

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function NewsIndex() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    listNews()
      .then((rows) => setPosts(rows as NewsPost[]))
      .catch(() => setPosts([]))
      .finally(() => setLoaded(true));
  }, []);

  const [featured, ...rest] = posts;

  return (
    <>
      <section className="pt-40 pb-12 border-b border-border">
        <div className="container-x">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">News Feed</div>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9]">
            Updates From <span className="text-primary">The Road.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Company news, safety tips, and stories from the CAAS dispatch team across Ghana.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          {!loaded ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="border border-border bg-surface p-16 text-center max-w-2xl mx-auto">
              <Newspaper className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <div className="font-heading uppercase tracking-wider text-muted-foreground">
                No articles published yet
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Check back soon for company updates and news.
              </p>
            </div>
          ) : (
            <div className="grid gap-8">
              {/* Featured */}
              {featured && (
                <Link
                  to="/news/$slug"
                  params={{ slug: featured.slug }}
                  className="group grid md:grid-cols-2 gap-6 border border-border bg-surface overflow-hidden hover:border-primary transition-colors"
                >
                  <div className="aspect-[16/10] md:aspect-auto bg-background relative overflow-hidden">
                    {featured.cover_url ? (
                      <img
                        src={featured.cover_url}
                        alt={featured.title}
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <Newspaper className="h-16 w-16 opacity-30" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-heading uppercase tracking-wider px-2 py-1">
                      Featured
                    </div>
                  </div>
                  <div className="p-6 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-primary">
                      <span>{featured.category}</span>
                      <span className="text-muted-foreground/60">•</span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(featured.published_at)}
                      </span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl mt-4 leading-tight group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
                    )}
                    <div className="mt-6 inline-flex items-center gap-2 font-heading uppercase tracking-wider text-sm text-primary">
                      Read Article <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              )}

              {/* Rest */}
              {rest.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((p) => (
                    <Link
                      key={p.id}
                      to="/news/$slug"
                      params={{ slug: p.slug }}
                      className="group border border-border bg-surface overflow-hidden hover:border-primary transition-colors flex flex-col"
                    >
                      <div className="aspect-[16/10] bg-background relative overflow-hidden">
                        {p.cover_url ? (
                          <img
                            src={p.cover_url}
                            alt={p.title}
                            className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            <Newspaper className="h-10 w-10 opacity-30" />
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-primary">
                          <span>{p.category}</span>
                          <span className="text-muted-foreground/60">•</span>
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(p.published_at)}
                          </span>
                        </div>
                        <h3 className="font-heading uppercase tracking-wider text-lg mt-3 leading-snug group-hover:text-primary transition-colors">
                          {p.title}
                        </h3>
                        {p.excerpt && (
                          <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                            {p.excerpt}
                          </p>
                        )}
                        <div className="mt-4 inline-flex items-center gap-2 font-heading uppercase tracking-wider text-xs text-primary">
                          Read <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
