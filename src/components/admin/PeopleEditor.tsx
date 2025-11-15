"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ImportantPerson {
  name: string
  title: string
  email: string
  role: string
  photoUrl?: string
  bio?: string
  order: number
}

interface PeopleEditorProps {
  people: ImportantPerson[]
  onChange: (people: ImportantPerson[]) => void
}

export function PeopleEditor({ people, onChange }: PeopleEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Partial<ImportantPerson>>({
    name: "",
    title: "",
    email: "",
    role: "team_member",
    bio: "",
    order: people.length,
  })

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setFormData(people[index])
    setIsAdding(false)
  }

  const handleDelete = (index: number) => {
    if (confirm("Are you sure you want to remove this person?")) {
      onChange(people.filter((_, i) => i !== index))
    }
  }

  const handleSave = () => {
    if (!formData.name || !formData.title || !formData.email) {
      alert("Please fill in all required fields")
      return
    }

    const personData = {
      name: formData.name,
      title: formData.title,
      email: formData.email,
      role: formData.role || "team_member",
      bio: formData.bio,
      photoUrl: formData.photoUrl,
      order: formData.order || people.length,
    }

    if (editingIndex !== null) {
      const updated = [...people]
      updated[editingIndex] = personData as ImportantPerson
      onChange(updated)
      setEditingIndex(null)
    } else {
      onChange([...people, personData as ImportantPerson])
      setIsAdding(false)
    }

    setFormData({
      name: "",
      title: "",
      email: "",
      role: "team_member",
      bio: "",
      order: people.length + 1,
    })
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setIsAdding(false)
    setFormData({
      name: "",
      title: "",
      email: "",
      role: "team_member",
      bio: "",
      order: people.length,
    })
  }

  const getTypeColor = (role: string) => {
    switch (role) {
      case "manager":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "buddy":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "stakeholder":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getTypeLabel = (role: string) => {
    return role
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Manage the key people the new hire should know
        </p>
        <Button
          onClick={() => {
            setIsAdding(true)
            setFormData({
              name: "",
              title: "",
              email: "",
              role: "team_member",
              bio: "",
              order: people.length,
            })
          }}
          disabled={isAdding || editingIndex !== null}
          size="sm"
        >
          Add Person
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingIndex !== null) && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="person-name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="person-name"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="person-title">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="person-title"
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Job title"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="person-email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="person-email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="email@company.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="person-role">Role</Label>
                <Select
                  value={formData.role || "team_member"}
                  onValueChange={(value) =>
                    setFormData(prev => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger id="person-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="buddy">Buddy</SelectItem>
                    <SelectItem value="team_member">Team Member</SelectItem>
                    <SelectItem value="stakeholder">Stakeholder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="person-bio">Bio (Optional)</Label>
              <Textarea
                id="person-bio"
                value={formData.bio || ""}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, bio: e.target.value }))
                }
                placeholder="A brief description about this person..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* People List */}
      <div className="space-y-3">
        {people.map((person, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>
                    {person.name
                      .split(" ")
                      .map(n => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold">{person.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {person.title}
                      </p>
                    </div>
                    <Badge variant="outline" className={getTypeColor(person.role)}>
                      {getTypeLabel(person.role)}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mt-1">
                    {person.email}
                  </p>

                  {person.bio && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {person.bio}
                    </p>
                  )}

                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(index)}
                      disabled={isAdding || editingIndex !== null}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(index)}
                      disabled={isAdding || editingIndex !== null}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {people.length === 0 && !isAdding && (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">
              No people added yet. Click &quot;Add Person&quot; to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
