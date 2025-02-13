import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-indigo-100 border-2">
      <CardHeader>
        <CardTitle>
          {project.name === "RealTaxRate.com" ? (
            <span className="text-primary">
              {project.name} <span className="text-sm text-muted-foreground">(coming soon)</span>
            </span>
          ) : project.name === "OpenSourceWebApps.com" ? (
            <span className="text-primary">{project.name}</span>
          ) : (
            <a
              href={project.name === "MyTariffs.com" ? "https://mytariffs.com" : project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {project.name}
            </a>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-900 hover:bg-blue-200">
              {tag}
            </Badge>
          ))}
        </div>
        <a
          href={project.name === "ReasonToSue.com" ? "https://github.com/kianerfaan/ReasonToSue.com" : 
               project.name === "TweetLikeKanye.com" ? "https://github.com/kianerfaan/TweetLikeKanye.com" :
               project.name === "MyTariffs.com" ? "https://github.com/kianerfaan/MyTariffs.com" :
               project.name === "RealTaxRate.com" ? "https://github.com/kianerfaan/RealTaxRate.com" :
               (project.githubUrl || project.url)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:underline"
        >
          {project.name === "ReasonToSue.com" || project.name === "TweetLikeKanye.com" || project.name === "MyTariffs.com" || project.name === "RealTaxRate.com" || project.githubUrl ? 'Visit GitHub →' : 'Visit Website →'}
        </a>
        <div className="flex justify-end"> {/* Added to position badge at bottom right */}
          <a
            href={project.licenseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm"
          >
            <Badge variant="outline" className="text-[11px] px-1.5 py-0 h-4">{project.license}</Badge>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}