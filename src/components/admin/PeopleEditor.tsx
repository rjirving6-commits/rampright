"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ImportantPerson } from "@/lib/mock-data"

interface PeopleEditorProps {
  people: ImportantPerson[]
  onChange: (people: ImportantPerson[]) => void
}

export function PeopleEditor({ people, onChange }: PeopleEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Partial<ImportantPerson>>({
    name: "",
    role: "",
    email: "",
    type: "team_member",
    bio: "",
  })
  const [originalData, setOriginalData] = useState<Partial<ImportantPerson> | null>(null)
  const editFormRef = useRef<HTMLDivElement>(null)

  const handleEdit = (person: ImportantPerson) => {
    setEditingId(person.id)
    setFormData(person)
    setOriginalData({ ...person })
    setIsAdding(false)
  }

  // Scroll to edit form when editing starts
  useEffect(() => {
    if ((editingId || isAdding) && editFormRef.current) {
      // Small delay to ensure the form is rendered
      setTimeout(() => {
        editFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    }
  }, [editingId, isAdding])

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this person?")) {
      onChange(people.filter(p => p.id !== id))
    }
  }

  // Check if form has changes
  const hasChanges = () => {
    if (isAdding) {
      // For adding, check if required fields are filled
      return !!(formData.name && formData.role && formData.email)
    }
    if (editingId && originalData) {
      // For editing, compare with original data
      return (
        formData.name !== originalData.name ||
        formData.role !== originalData.role ||
        formData.email !== originalData.email ||
        formData.type !== originalData.type ||
        (formData.bio || "") !== (originalData.bio || "")
      )
    }
    return false
  }

  const handleSave = () => {
    if (!formData.name || !formData.role || !formData.email) {
      alert("Please fill in all required fields")
      return
    }

    if (editingId) {
      // Update existing person
      onChange(
        people.map(p =>
          p.id === editingId ? { ...p, ...formData } as ImportantPerson : p
        )
      )
      setEditingId(null)
    } else {
      // Add new person
      const newPerson: ImportantPerson = {
        id: `person-${Date.now()}`,
        name: formData.name!,
        role: formData.role!,
        email: formData.email!,
        type: formData.type || "team_member",
        bio: formData.bio,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
      }
      onChange([...people, newPerson])
      setIsAdding(false)
    }

    // Reset form
    setFormData({
      name: "",
      role: "",
      email: "",
      type: "team_member",
      bio: "",
    })
    setOriginalData(null)
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData({
      name: "",
      role: "",
      email: "",
      type: "team_member",
      bio: "",
    })
    setOriginalData(null)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
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

  const getTypeLabel = (type: string) => {
    return type
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
            setOriginalData(null)
          }}
          disabled={isAdding || editingId !== null}
          size="sm"
        >
          Add Person
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <Card ref={editFormRef}>
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
                <Label htmlFor="person-role">
                  Role <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="person-role"
                  value={formData.role || ""}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, role: e.target.value }))
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
                <Label htmlFor="person-type">Type</Label>
                <Select
                  value={formData.type || "team_member"}
                  onValueChange={(value) =>
                    setFormData(prev => ({
                      ...prev,
                      type: value as ImportantPerson["type"],
                    }))
                  }
                >
                  <SelectTrigger id="person-type">
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
              <Button 
                variant={hasChanges() ? "default" : "outline"}
                onClick={handleSave}
                disabled={!hasChanges()}
                className={hasChanges() ? "font-semibold shadow-lg hover:shadow-xl transition-all scale-105" : ""}
              >
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* People List */}
      <div className="space-y-3">
        {people.map((person) => (
          <Card key={person.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={person.avatarUrl} alt={person.name} />
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
                        {person.role}
                      </p>
                    </div>
                    <Badge variant="outline" className={getTypeColor(person.type)}>
                      {getTypeLabel(person.type)}
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
                      onClick={() => handleEdit(person)}
                      disabled={isAdding || editingId !== null}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(person.id)}
                      disabled={isAdding || editingId !== null}
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
