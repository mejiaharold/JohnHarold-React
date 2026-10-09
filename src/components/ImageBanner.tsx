export default function ImageBanner({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="banner">
      <img src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
