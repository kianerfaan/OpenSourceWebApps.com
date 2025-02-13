import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { type Project } from "@shared/schema";

export function HeroSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedProject, setRecommendedProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRecommend = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiRequest("GET", "/api/projects/recommend");
      const project = (await res.json()) as Project;
      setRecommendedProject(project);
    } catch (error) {
      setError("Failed to get recommendation");
      setRecommendedProject(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white border-b">
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-blue-900">OpenSourceWebApps.com</h1>
        <Button
          size="lg"
          onClick={handleRecommend}
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90"
        >
          {isLoading ? "Loading..." : "Recommend me a web app"}
        </Button>

        {recommendedProject && (
          <Card className="mt-8 max-w-lg mx-auto bg-gradient-to-br from-blue-50 to-indigo-100">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">
                {recommendedProject.name === "RealTaxRate.com" ? (
                  <span className="text-primary">
                    {recommendedProject.name} <span className="text-sm text-muted-foreground">(coming soon)</span>
                  </span>
                ) : recommendedProject.name === "OpenSourceWebApps.com" ? (
                  <span className="text-primary">{recommendedProject.name}</span>
                ) : (
                  <a
                    href={recommendedProject.name === "MyTariffs.com" ? "https://mytariffs.com" : recommendedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {recommendedProject.name}
                  </a>
                )}
              </h3>
              <p className="text-muted-foreground mb-4">{recommendedProject.description}</p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {recommendedProject.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-900 hover:bg-blue-200 text-[11px] px-1.5 py-0 h-4">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-col items-center gap-3">
                  <a
                    href={recommendedProject.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm"
                  >
                    <Badge variant="outline" className="text-[11px] px-1.5 py-0 h-4">{recommendedProject.license}</Badge>
                  </a>
                  <a
                    href={recommendedProject.name === "OpenSourceWebApps.com" ? "https://github.com/kianerfaan/OpenSourceWebApps.com" : recommendedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Visit GitHub →
                </a>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <p className="mt-4 text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}