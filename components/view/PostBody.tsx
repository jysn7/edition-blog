import { PortableText } from "@portabletext/react";
import { ptComponents } from "./ptComponents";

export function PostBody({ body }: any) {
  return (
    <section className="lg:col-span-9 max-w-2xl prose prose-zinc dark:prose-invert">
      <PortableText value={body} components={ptComponents} />
    </section>
  );
}
