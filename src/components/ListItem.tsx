export default function ListItem({ date, text }: { date: string; text: string }) {
  return (
    <li>
      <time>{date}</time>
      <span>{text}</span>
    </li>
  )
}
