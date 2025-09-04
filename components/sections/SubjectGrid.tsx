import SubjectTile from "@/components/cards/SubjectTile"

const palette = ["#E57373", "#FF8A65", "#26A69A", "#9575CD", "#64B5F6", "#66BB6A"]

export default function SubjectGrid({ subjects }: { subjects: { id: string; title: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {subjects.map((s, i) => (
        <SubjectTile key={s.id} title={s.title} color={palette[i % palette.length]} />
      ))}
    </div>
  )
}


