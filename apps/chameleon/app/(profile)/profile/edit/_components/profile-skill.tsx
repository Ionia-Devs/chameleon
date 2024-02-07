'use client'
import { Button } from "@/components/ui/button"

interface ProfileSkillsProps {
  userSkills:
    | {
        id: string
        userId: string
        name: string
      }[]
    | null
}
const skills = [
  { name: 'NSFW', isSelected: false, id:'1' },
  { name: 'Studio', isSelected: false, id: "2" },
  { name: 'Off Site', isSelected: false, id: "3" },
  { name: 'Editorial', isSelected: false, id: "4" },
  { name: 'Cosplay', isSelected: false, id: "5" },
  { name: 'Fashion', isSelected: false, id: "6" },
  { name: 'Portrait', isSelected: false, id: "7" },
  { name: 'Events', isSelected: false, id: '8' },
]

export default function ProfileSkills({ userSkills }: ProfileSkillsProps) {
  return (
    <>
        {skills.map((skill) => (
          <Button key={skill.id} className={`m-1 h-8 bg-primary text-secondary`}>
          {skill.name}
        </Button>
        ))}
    </>
  )
}
