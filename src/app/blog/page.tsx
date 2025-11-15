import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Resources - Employee Onboarding Insights",
  description: "Discover insights, best practices, and expert advice on employee onboarding and team success. Learn from industry leaders and transform your onboarding process.",
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Employee Onboarding in 2025",
    excerpt:
      "Discover the latest best practices for creating exceptional onboarding experiences that increase retention and productivity. Learn how modern companies are transforming their approach to welcoming new hires.",
    author: "Sarah Chen",
    publishedDate: "2025-01-10",
    category: "Best Practices",
    readTime: "8 min read",
  },
  {
    id: "2",
    title: "How to Build a 90-Day Onboarding Plan That Works",
    excerpt:
      "A step-by-step framework for creating comprehensive onboarding plans that set new employees up for long-term success. Includes templates and real-world examples from top companies.",
    author: "Michael Rodriguez",
    publishedDate: "2025-01-05",
    category: "Guides",
    readTime: "12 min read",
  },
  {
    id: "3",
    title: "Remote Onboarding: Challenges and Solutions",
    excerpt:
      "Navigate the unique challenges of remote employee onboarding with proven strategies and tools. Learn how to create connection and engagement from day one, no matter where your team is located.",
    author: "Emily Watson",
    publishedDate: "2024-12-28",
    category: "Remote Work",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "Measuring Onboarding Success: Key Metrics That Matter",
    excerpt:
      "Learn which metrics truly indicate onboarding effectiveness and how to track them. From time-to-productivity to employee satisfaction scores, we cover the KPIs that drive results.",
    author: "David Kim",
    publishedDate: "2024-12-20",
    category: "Analytics",
    readTime: "10 min read",
  },
  {
    id: "5",
    title: "The ROI of Structured Onboarding Programs",
    excerpt:
      "Explore the financial impact of investing in quality onboarding. See how companies are saving costs and increasing revenue through better new hire experiences backed by real data.",
    author: "Jennifer Martinez",
    publishedDate: "2024-12-15",
    category: "Business Impact",
    readTime: "7 min read",
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Blog & Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, best practices, and expert advice on employee onboarding and team success.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="flex flex-col hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {post.readTime}
                  </span>
                </div>
                <CardTitle className="text-xl line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.publishedDate)}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button variant="ghost" className="w-full group" asChild>
                  <Link href={`/blog/${post.id}`}>
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
}
