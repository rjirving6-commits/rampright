import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare } from "lucide-react";
import { ImportantPerson } from "@/lib/mock-data";

interface TeamDirectoryProps {
  people: ImportantPerson[];
}

export default function TeamDirectory({ people }: TeamDirectoryProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      manager: "Manager",
      buddy: "Buddy",
      team_member: "Team Member",
      stakeholder: "Stakeholder",
    };
    return labels[type] || type;
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-2xl font-bold text-foreground">Your Team</h3>
      <p className="text-muted-foreground">
        Key people you&apos;ll work with during your onboarding
      </p>

      <div className="space-y-3 mt-6">
        {people.map((person) => (
          <div
            key={person.id}
            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-all"
          >
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              {person.avatarUrl && <AvatarImage src={person.avatarUrl} alt={person.name} />}
              <AvatarFallback className="bg-gradient-warm text-primary-foreground font-semibold">
                {getInitials(person.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h4 className="font-semibold text-foreground">{person.name}</h4>
              <p className="text-sm text-muted-foreground">{person.role}</p>
              <Badge variant="outline" className="mt-1 text-xs">
                {getTypeLabel(person.type)}
              </Badge>
              {person.bio && (
                <p className="text-xs text-muted-foreground mt-1">{person.bio}</p>
              )}
            </div>

            <div className="flex gap-2">
              <a
                href={`mailto:${person.email}`}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                title={`Email ${person.name}`}
              >
                <Mail size={18} className="text-muted-foreground" />
              </a>
              <button
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                title="Send message"
              >
                <MessageSquare size={18} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
