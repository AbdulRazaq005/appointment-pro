import ProfessionalList from '@/components/professional-list'

export default function ProfessionalsPage() {
  return (
    <div className="container mx-auto p-4 pt-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Choose a Professional</h1>
      <ProfessionalList />
    </div>
  )
}

