"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModuleEditor } from "./ModuleEditor"
import { PeopleEditor } from "./PeopleEditor"
import { mockCompany, mockTemplate, mockModuleContent, mockImportantPeople } from "@/lib/mock-data"
import type { Company, ModuleContent, ImportantPerson } from "@/lib/mock-data"

interface WizardData {
  company: Company
  templateId: string
  modules: ModuleContent[]
  people: ImportantPerson[]
  newHireEmail: string
  newHireName: string
}

export function SetupWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<WizardData>({
    company: { ...mockCompany },
    templateId: mockTemplate.id,
    modules: mockModuleContent.map(m => ({ ...m })),
    people: mockImportantPeople.map(p => ({ ...p })),
    newHireEmail: "",
    newHireName: "",
  })

  const totalSteps = 4

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Final step - log the collected data
      console.log("=== ONBOARDING SETUP COMPLETE ===")
      console.log("Company Info:", data.company)
      console.log("Template ID:", data.templateId)
      console.log("Modules:", data.modules)
      console.log("Important People:", data.people)
      console.log("New Hire:", { name: data.newHireName, email: data.newHireEmail })
      alert("Setup complete! Check console for collected data.")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateCompany = (field: keyof Company, value: string) => {
    setData(prev => ({
      ...prev,
      company: { ...prev.company, [field]: value }
    }))
  }

  const updateModule = (moduleId: string, updates: Partial<ModuleContent>) => {
    setData(prev => ({
      ...prev,
      modules: prev.modules.map(m =>
        m.id === moduleId ? { ...m, ...updates } : m
      )
    }))
  }

  const updatePeople = (people: ImportantPerson[]) => {
    setData(prev => ({ ...prev, people }))
  }

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step === currentStep
                    ? "bg-primary text-primary-foreground"
                    : step < currentStep
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step}
              </div>
              <span className="text-xs mt-2 text-center font-medium">
                {step === 1 && "Company Info"}
                {step === 2 && "Template"}
                {step === 3 && "Content"}
                {step === 4 && "Invite"}
              </span>
            </div>
            {step < 4 && (
              <div
                className={`h-[2px] flex-1 ${
                  step < currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Separator />

      {/* Step Content */}
      <div className="min-h-[500px]">
        {/* Step 1: Company Info */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Tell us about your company to customize the onboarding experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={data.company.name}
                  onChange={(e) => updateCompany("name", e.target.value)}
                  placeholder="Enter company name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={data.company.industry}
                    onChange={(e) => updateCompany("industry", e.target.value)}
                    placeholder="e.g., SaaS, E-commerce"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Company Size</Label>
                  <Input
                    id="size"
                    value={data.company.size}
                    onChange={(e) => updateCompany("size", e.target.value)}
                    placeholder="e.g., 50-200 employees"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={data.company.website}
                  onChange={(e) => updateCompany("website", e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={data.company.description}
                  onChange={(e) => updateCompany("description", e.target.value)}
                  placeholder="Brief company description"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Template Selection */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Onboarding Template</CardTitle>
              <CardDescription>
                Choose the template that best fits the new hire&apos;s role
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`p-6 rounded-lg border-2 cursor-pointer transition-colors ${
                  data.templateId === mockTemplate.id
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-primary/50"
                }`}
                onClick={() =>
                  setData(prev => ({ ...prev, templateId: mockTemplate.id }))
                }
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{mockTemplate.name}</h3>
                      <Badge>Default</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {mockTemplate.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                      <span>{mockTemplate.duration} weeks</span>
                      <span>•</span>
                      <span>28 tasks</span>
                      <span>•</span>
                      <span>5 learning modules</span>
                    </div>
                  </div>
                  {data.templateId === mockTemplate.id && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-primary-foreground"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  More templates coming soon! For now, you can customize the GTM template
                  in the next step to fit any role.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Content Editing */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Customize Content</CardTitle>
              <CardDescription>
                Edit learning modules and manage important people for the new hire
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="modules" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="modules">Learning Modules</TabsTrigger>
                  <TabsTrigger value="people">Important People</TabsTrigger>
                </TabsList>

                <TabsContent value="modules" className="space-y-4">
                  <ModuleEditor
                    modules={data.modules}
                    onUpdate={updateModule}
                  />
                </TabsContent>

                <TabsContent value="people" className="space-y-4">
                  <PeopleEditor
                    people={data.people}
                    onChange={updatePeople}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Invite New Hire */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Invite New Hire</CardTitle>
              <CardDescription>
                Send an invitation to your new team member to start their onboarding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-hire-name">New Hire Name</Label>
                <Input
                  id="new-hire-name"
                  value={data.newHireName}
                  onChange={(e) =>
                    setData(prev => ({ ...prev, newHireName: e.target.value }))
                  }
                  placeholder="Enter new hire's full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-hire-email">Email Address</Label>
                <Input
                  id="new-hire-email"
                  type="email"
                  value={data.newHireEmail}
                  onChange={(e) =>
                    setData(prev => ({ ...prev, newHireEmail: e.target.value }))
                  }
                  placeholder="newhire@company.com"
                />
              </div>

              <div className="p-4 bg-muted rounded-lg space-y-2">
                <h4 className="font-semibold text-sm">Preview</h4>
                <p className="text-sm text-muted-foreground">
                  {data.newHireName || "New hire"} will receive an email invitation to join{" "}
                  {data.company.name} and start their onboarding journey.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4 mt-2">
                  <li>• Access to their personalized onboarding plan</li>
                  <li>• {mockTemplate.duration} weeks of guided tasks and learning</li>
                  <li>• Introduction to {data.people.length} important team members</li>
                  <li>• {data.modules.length} learning modules to review</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          Back
        </Button>
        <Button 
          onClick={handleNext}
          variant="hero"
          className="font-semibold shadow-lg hover:shadow-xl transition-shadow"
        >
          {currentStep === totalSteps ? "Complete Setup" : "Next →"}
        </Button>
      </div>
    </div>
  )
}
