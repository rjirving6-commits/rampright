"use client";

import { ModuleContent } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ModuleViewerProps {
  module: ModuleContent;
}

export function ModuleViewer({ module }: ModuleViewerProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getModuleBadgeColor = (type: string) => {
    switch (type) {
      case "company_overview":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "product_overview":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20";
      case "competitive_landscape":
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20";
      case "tools_systems":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "team_culture":
        return "bg-pink-500/10 text-pink-500 hover:bg-pink-500/20";
      default:
        return "";
    }
  };

  const formatModuleType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge className={getModuleBadgeColor(module.type)}>
            {formatModuleType(module.type)}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            Updated {formatDate(module.updatedAt)}
          </div>
        </div>
        <CardTitle className="text-3xl">{module.title}</CardTitle>
        <CardDescription>
          Essential information to help you succeed in your role
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold mt-5 mb-3">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-medium mt-4 mb-2">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="ml-4">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-4 italic my-4">
                  {children}
                </blockquote>
              ),
            }}
          >
            {module.content}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
