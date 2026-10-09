interface CardProps {
  title: string
  text?: string
  num?: number
  plain?: boolean
  image?: string
}

export default function Card({ title, text, num, plain, image }: CardProps) {
  return (
    <article className={`card${plain ? ' plain' : ''}`}>
      {image && <img className="card-img" src={image} alt={title} />}
      {num !== undefined && <span className="num">0{num}</span>}
      <h3>{title}</h3>
      {text && <p>{text}</p>}
    </article>
  )
}
