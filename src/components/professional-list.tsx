'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'

type Professional = {
  id: string
  name: string
  specialty: string
  avatar: string
  state: string
  city: string
}

const professionals: Professional[] = [
  { id: '1', name: 'Dr. Jane Smith', specialty: 'General Practitioner', avatar: '/placeholder.svg?height=100&width=100', state: 'California', city: 'Los Angeles' },
  { id: '2', name: 'Dr. John Doe', specialty: 'Dentist', avatar: '/placeholder.svg?height=100&width=100', state: 'New York', city: 'New York City' },
  { id: '3', name: 'Dr. Emily Brown', specialty: 'Psychologist', avatar: '/placeholder.svg?height=100&width=100', state: 'Texas', city: 'Houston' },
  { id: '4', name: 'Dr. Michael Lee', specialty: 'Dermatologist', avatar: '/placeholder.svg?height=100&width=100', state: 'California', city: 'San Francisco' },
  { id: '5', name: 'Dr. Sarah Johnson', specialty: 'Pediatrician', avatar: '/placeholder.svg?height=100&width=100', state: 'Illinois', city: 'Chicago' },
  { id: '6', name: 'Dr. David Wilson', specialty: 'Cardiologist', avatar: '/placeholder.svg?height=100&width=100', state: 'Florida', city: 'Miami' },
]

export default function ProfessionalList() {
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedState, setSelectedState] = useState('all')
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')

  const states = useMemo(() => ['all', ...new Set(professionals.map(p => p.state))], [])
  const cities = useMemo(() => ['all', ...new Set(professionals.map(p => p.city))], [])
  const specialties = useMemo(() => ['all', ...new Set(professionals.map(p => p.specialty))], [])

  const filteredProfessionals = useMemo(() => {
    return professionals.filter(professional => 
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedState === 'all' || professional.state === selectedState) &&
      (selectedCity === 'all' || professional.city === selectedCity) &&
      (selectedSpecialty === 'all' || professional.specialty === selectedSpecialty)
    )
  }, [searchTerm, selectedState, selectedCity, selectedSpecialty])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          placeholder="Search professionals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white bg-opacity-80 backdrop-blur-lg"
        />
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger className="bg-white bg-opacity-80 backdrop-blur-lg">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            {states.filter(state => state !== 'all').map(state => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="bg-white bg-opacity-80 backdrop-blur-lg">
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.filter(city => city !== 'all').map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
          <SelectTrigger className="bg-white bg-opacity-80 backdrop-blur-lg">
            <SelectValue placeholder="Select Specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            {specialties.filter(specialty => specialty !== 'all').map(specialty => (
              <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProfessionals.map((professional) => (
          <Card key={professional.id} className="bg-white bg-opacity-80 backdrop-blur-lg">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={professional.avatar} alt={professional.name} />
                  <AvatarFallback>{professional.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800">{professional.name}</CardTitle>
                  <p className="text-sm text-gray-600">{professional.specialty}</p>
                  <p className="text-sm text-gray-600">{professional.city}, {professional.state}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setSelectedProfessional(professional)}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Select
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedProfessional && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="bg-white w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">Confirm Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">You have selected {selectedProfessional.name}. Would you like to proceed to book an appointment?</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedProfessional(null)}>Cancel</Button>
                <Link href={`/?professional=${selectedProfessional.id}`}>
                  <Button>Proceed</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

