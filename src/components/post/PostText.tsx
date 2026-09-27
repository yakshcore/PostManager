import { Fragment, type ReactNode } from "react";

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Renders plain LinkedIn text with blank-line paragraphs and highlighted #hashtags / @mentions. */
export function PostText({ text, mention }: { text: string; mention?: string }) {
  const tokens = [mention && `@${escapeRegExp(mention)}`, "#[\\p{L}\\p{N}_]+", "@[\\p{L}\\p{N}_]+"].filter(Boolean);
  const re = new RegExp(`(${tokens.join("|")})`, "gu");

  const highlight = (line: string): ReactNode[] =>
    line.split(re).map((part, i) =>
      i % 2 === 1 ? (
        <span key={i} className="font-semibold text-primary cursor-pointer hover:underline">
          {part}
        </span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );

  return (
    <>
      {text.split(/\n{2,}/).map((para, i) => (
        <p key={i}>
          {para.split("\n").map((line, j) => (
            <Fragment key={j}>
              {j > 0 && <br />}
              {highlight(line)}
            </Fragment>
          ))}
        </p>
      ))}
    </>
  );
}
