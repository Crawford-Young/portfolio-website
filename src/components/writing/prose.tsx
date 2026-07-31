interface ProseProps {
  readonly children: React.ReactNode
}

// Tailwind child selectors, not an mdx-components.tsx mapping — matches the
// approach shipped in instrumenttuner's guide pages. Theme-token classes only
// so both light and dark themes stay correct without a separate light pass.
const ARTICLE_PROSE_CLASSES =
  '[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-foreground ' +
  '[&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground ' +
  '[&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-muted-foreground ' +
  '[&_em]:text-foreground ' +
  '[&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-muted-foreground ' +
  '[&_blockquote]:mt-4 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground ' +
  '[&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4'

export function Prose({ children }: ProseProps): React.JSX.Element {
  return <article className={ARTICLE_PROSE_CLASSES}>{children}</article>
}
