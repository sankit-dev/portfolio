import { Bookshelf } from "@/components/site/bookshelf";
import { BOOKS } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Books", description: "What I've read, what stuck, and whether you should read it." };

export default function BooksPage() {
  return (
    <section className="page" data-src="Bookshelf ← BOOKS">
      <div className="page-head">
        <h1 className="page-title">Shelf <em>pull a book, flip it open</em></h1>
        <span className="label">{BOOKS.length} books</span>
      </div>
      <Bookshelf books={BOOKS} />
    </section>
  );
}
