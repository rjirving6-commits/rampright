import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare } from "lucide-react";

const teamMembers = [
  { name: "Sarah Chen", role: "Engineering Manager", department: "Engineering", initials: "SC" },
  { name: "Marcus Johnson", role: "Onboarding Buddy", department: "Engineering", initials: "MJ" },
  { name: "Emily Rodriguez", role: "HR Business Partner", department: "People Ops", initials: "ER" },
  { name: "David Kim", role: "Product Lead", department: "Product", initials: "DK" },
];

export default function TeamDirectory() {
  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-2xl font-bold text-foreground">Your Team</h3>
      <p className="text-muted-foreground">Key people you&apos;ll work with during your first 90 days</p>

      <div className="space-y-3 mt-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-all"
          >
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarFallback className="bg-gradient-warm text-primary-foreground font-semibold">
                {member.initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h4 className="font-semibold text-foreground">{member.name}</h4>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              <Badge variant="outline" className="mt-1 text-xs">
                {member.department}
              </Badge>
            </div>

            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-accent transition-colors">
                <Mail size={18} className="text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-accent transition-colors">
                <MessageSquare size={18} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
