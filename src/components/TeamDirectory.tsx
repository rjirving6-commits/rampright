import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare } from "lucide-react";
import { ImportantPerson } from "@/lib/schema";

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
    <Card className="p-4 sm:p-6 space-y-3 sm:space-y-4">
      <h3 className="text-xl sm:text-2xl font-bold text-foreground">Your Team</h3>
      <p className="text-xs sm:text-sm text-muted-foreground">
        Key people you&apos;ll work with during your onboarding
      </p>

      <div className="space-y-3 mt-4 sm:mt-6">
        {people.map((person) => (
          <div
            key={person.id}
            className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border hover:bg-accent/50 transition-all"
          >
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-primary/20 flex-shrink-0">
              {person.photoUrl && <AvatarImage src={person.photoUrl} alt={person.name} />}
              <AvatarFallback className="bg-gradient-warm text-primary-foreground font-semibold text-xs sm:text-sm">
                {getInitials(person.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm sm:text-base font-semibold text-foreground truncate">{person.name}</h4>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">{person.title}</p>
              <Badge variant="outline" className="mt-1 text-xs">
                {getTypeLabel(person.role)}
              </Badge>
              {person.bio && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{person.bio}</p>
              )}
            </div>

            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
              <a
                href={`mailto:${person.email}`}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                title={`Email ${person.name}`}
              >
                <Mail size={16} className="sm:w-[18px] sm:h-[18px] text-muted-foreground" />
              </a>
              <button
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                title="Send message"
              >
                <MessageSquare size={16} className="sm:w-[18px] sm:h-[18px] text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
