import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page lost">
      <p className="lost-code" aria-hidden="true">404</p>
      <h1 className="page-title">
        This rabbit hole <em>goes nowhere</em>
      </h1>
      <p className="dim" style={{ margin: "8px 0 0", fontSize: 16 }}>
        Went too deep and hit bedrock. The page you&apos;re after doesn&apos;t exist, or it moved.
      </p>
      <div className="btn-row">
        <Link className="btn" href="/">
          Back to the surface
        </Link>
        <span className="dim" style={{ fontSize: 14 }}>
          or press <kbd>⌘K</kbd> to jump anywhere
        </span>
      </div>
    </section>
  );
}
