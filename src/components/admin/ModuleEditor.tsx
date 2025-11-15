"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReactMarkdown from "react-markdown"

interface ModuleContent {
  type: string
  title: string
  content: string
  order: number
}

interface ModuleEditorProps {
  modules: ModuleContent[]
  onUpdate: (moduleType: string, updates: Partial<ModuleContent>) => void
}

export function ModuleEditor({ modules, onUpdate }: ModuleEditorProps) {
  const [selectedModuleType, setSelectedModuleType] = useState<string>(modules[0]?.type || "")

  const selectedModule = modules.find(m => m.type === selectedModuleType)

  if (!selectedModule) {
    return <div>No modules available</div>
  }

  const getModuleIcon = (type: string) => {
    switch (type) {
      case "company_overview":
        return "🏢"
      case "product_overview":
        return "📦"
      case "competitive_landscape":
        return "📊"
      case "tools_systems":
        return "🛠️"
      case "team_culture":
        return "👥"
      default:
        return "📄"
    }
  }

  const getModuleLabel = (type: string) => {
    return type
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Select a module to edit its content. All changes are pre-populated with template defaults.
      </p>

      {/* Module Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {modules.map((module) => (
          <Button
            key={module.type}
            variant={selectedModuleType === module.type ? "default" : "outline"}
            className="h-auto py-3 px-4 justify-start"
            onClick={() => setSelectedModuleType(module.type)}
          >
            <span className="mr-2 text-lg">{getModuleIcon(module.type)}</span>
            <span className="text-xs">{getModuleLabel(module.type)}</span>
          </Button>
        ))}
      </div>

      {/* Module Edit Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getModuleIcon(selectedModule.type)}</span>
            <div>
              <CardTitle>{selectedModule.title}</CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="mt-1">
                  {getModuleLabel(selectedModule.type)}
                </Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="module-title">Module Title</Label>
            <Input
              id="module-title"
              value={selectedModule.title}
              onChange={(e) =>
                onUpdate(selectedModule.type, { title: e.target.value })
              }
              placeholder="Enter module title"
            />
          </div>

          <div className="space-y-2">
            <Label>Content (Markdown supported)</Label>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="mt-4">
                <div className="min-h-[400px] p-4 border rounded-md bg-card overflow-auto">
                  <div className="markdown-preview">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 mt-6 first:mt-0">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-5 first:mt-0">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 mt-4 first:mt-0">{children}</h3>,
                        p: ({ children }) => <p className="mb-4 text-foreground leading-relaxed">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 ml-4">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 ml-4">{children}</ol>,
                        li: ({ children }) => <li className="text-foreground">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        code: ({ children }) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
                        blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">{children}</blockquote>,
                      }}
                    >
                      {selectedModule.content || "*No content yet*"}
                    </ReactMarkdown>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="edit" className="mt-4">
                <Textarea
                  id="module-content"
                  value={selectedModule.content}
                  onChange={(e) =>
                    onUpdate(selectedModule.type, { content: e.target.value })
                  }
                  placeholder="Enter module content..."
                  className="min-h-[400px] font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  You can use Markdown formatting for headings, lists, bold, italic, etc.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Reset to template default (could be implemented)
                alert("Reset to default functionality (demo)")
              }}
            >
              Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
