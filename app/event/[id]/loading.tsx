export default function Loading() {
    return (
      <article className="rounded-xl border bg-white p-6">
        <div className="h-5 w-20 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-9 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="mt-1 h-6 w-1/2 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 h-8 w-1/3 animate-pulse rounded bg-slate-200" />
        <div className="mt-1 h-6 w-2/5 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 h-10 w-24 animate-pulse rounded bg-slate-200" />
        <div className="mt-6 h-64 w-full animate-pulse rounded-xl bg-slate-200" />
        <div className="mt-6 h-6 w-32 animate-pulse rounded bg-slate-200" />
      </article>
    );
  }