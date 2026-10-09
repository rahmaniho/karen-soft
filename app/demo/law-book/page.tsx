import { redirect } from "next/navigation";

/** Retain the old URL, but send readers to the book's public topic catalogue. */
export default function LawBookDemoRedirect() {
  redirect("/products/law-book#book-topics");
}
