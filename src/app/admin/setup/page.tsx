import { SetupWizard } from "@/components/admin/SetupWizard"

export default function SetupPage() {
  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Onboarding Setup</h1>
        <p className="text-muted-foreground mt-2">
          Create a customized onboarding plan for your new hire
        </p>
      </div>
      <SetupWizard />
    </div>
  )
}
