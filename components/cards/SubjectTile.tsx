type Props = { title: string; color: string }

export default function SubjectTile({ title, color }: Props) {
  return (
    <div className={`rounded-2xl p-6 shadow-sm ring-1 ring-black/5 text-white text-center font-semibold`} style={{ backgroundColor: color }}>
      <div className="h-10" />
      <div className="text-base">{title}</div>
    </div>
  )
}


