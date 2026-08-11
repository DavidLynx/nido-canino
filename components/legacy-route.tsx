import { Fragment } from "react";

import { readLegacyPage } from "@/lib/legacy-page";

import { LegacyInlineScript } from "./legacy-inline-script";

export function LegacyRoute({ source }: { source: string }) {
  const page = readLegacyPage(source);

  return (
    <>
      {page.styles.map((style, index) => (
        <style
          dangerouslySetInnerHTML={{ __html: style }}
          key={`${source}-style-${index}`}
          suppressHydrationWarning
        />
      ))}
      <div
        className="legacy-route-root"
        dangerouslySetInnerHTML={{ __html: page.mainHtml }}
        suppressHydrationWarning
      />
      {page.supplementalHtml ? (
        <div
          className="legacy-route-root"
          dangerouslySetInnerHTML={{ __html: page.supplementalHtml }}
          suppressHydrationWarning
        />
      ) : null}
      {page.inlineScripts.map((script, index) => (
        <Fragment key={`${source}-script-${index}`}>
          <LegacyInlineScript code={script} />
        </Fragment>
      ))}
    </>
  );
}
