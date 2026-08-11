import { isValidElement, type ReactNode } from "react";
import Link from "next/link";
import GithubSlugger from "github-slugger";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ContentKind } from "@/lib/content/markdown";

import { PersistentCheckbox } from "./resource-interactions";

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeText(node.props.children);
  return "";
}

export function MarkdownContent({
  body,
  kind,
  resourceSlug,
}: {
  body: string;
  kind: ContentKind;
  resourceSlug?: string;
}) {
  const slugger = new GithubSlugger();
  let checkboxIndex = 0;
  const storageKey = resourceSlug ? `nido-resource-${resourceSlug}` : "";

  const components: Components = {
    h1({ children }) {
      slugger.slug(nodeText(children));
      return null;
    },
    h2({ children }) {
      return <h2 id={slugger.slug(nodeText(children))}>{children}</h2>;
    },
    h3({ children }) {
      return <h3 id={slugger.slug(nodeText(children))}>{children}</h3>;
    },
    a({ children, href = "" }) {
      if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
      return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
    },
    blockquote({ children }) {
      const text = nodeText(children);
      const isKeyIdea = kind === "blog" && /idea clave/iu.test(text);
      return (
        <aside className={isKeyIdea ? "key-idea-card" : kind === "resource" ? "resource-note" : "editorial-quote"}>
          {children}
        </aside>
      );
    },
    input({ checked }) {
      const index = checkboxIndex++;
      if (!resourceSlug) return <input type="checkbox" checked={checked} readOnly />;
      return (
        <PersistentCheckbox
          defaultChecked={Boolean(checked)}
          index={index}
          storageKey={storageKey}
        />
      );
    },
    table({ children }) {
      return <div className="markdown-table-wrap"><table>{children}</table></div>;
    },
  };

  return (
    <div className={`markdown-body markdown-body--${kind}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {body}
      </ReactMarkdown>
    </div>
  );
}
