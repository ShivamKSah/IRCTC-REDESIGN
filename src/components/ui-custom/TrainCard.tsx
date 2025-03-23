
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Train, 
  Clock, 
  Calendar, 
  Users, 
  IndianRupee, 
  ChevronDown, 
  ChevronUp,
  AlertCircle
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface TrainCardProps {
  train: {
    id: string;
    number: string;
    name: string;
    departure: string;
    arrival: string;
    duration: string;
    source: string;
    destination: string;
    sourceCode: string;
    destinationCode: string;
    date: string;
    classes: Array<{
      type: string;
      available: number;
      price: number;
      status: "WL" | "RAC" | "AVL" | "REGRET";
    }>;
    runsOn: string[];
  };
  className?: string;
  style?: CSSProperties;
}

const statusColors = {
  AVL: "text-green-600 dark:text-green-500",
  RAC: "text-yellow-600 dark:text-yellow-500",
  WL: "text-orange-600 dark:text-orange-500",
  REGRET: "text-destructive",
};

const getStatusLabel = (status: "WL" | "RAC" | "AVL" | "REGRET", available?: number) => {
  switch (status) {
    case "AVL":
      return `Available (${available})`;
    case "RAC":
      return "RAC";
    case "WL":
      return `WL ${available}`;
    case "REGRET":
      return "Not Available";
    default:
      return "Unknown";
  }
};

const TrainCard = ({ train, className = "", style }: TrainCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div 
      className={cn(
        "bg-card border rounded-xl overflow-hidden transition-all duration-300 animate-slide-up",
        expanded ? "shadow-elevation" : "shadow-subtle hover:shadow-elevation",
        className
      )}
      style={style}
    >
      <div className="p-4 md:p-5">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-xs px-2">
                {train.number}
              </Badge>
              <h3 className="font-medium text-lg">{train.name}</h3>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>{train.date}</span>
              <span className="mx-1">•</span>
              {train.runsOn.map((day, i) => (
                <Badge 
                  key={day} 
                  variant="outline" 
                  className="text-[10px] h-4 px-1 ml-0.5"
                >
                  {day}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>{train.duration}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full h-8 w-8 p-0"
              onClick={toggleExpand}
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-start gap-6 md:gap-10">
            <div className="space-y-1">
              <div className="text-2xl font-medium">{train.departure}</div>
              <div className="text-sm flex items-center gap-1">
                <span className="font-medium">{train.sourceCode}</span>
                <span className="text-muted-foreground">{train.source}</span>
              </div>
            </div>

            <div className="flex flex-col items-center mt-3">
              <div className="w-24 md:w-32 h-0.5 bg-muted relative">
                <div className="absolute -top-1.5 left-0 w-3 h-3 rounded-full border-2 border-primary bg-background"></div>
                <div className="absolute -top-1.5 right-0 w-3 h-3 rounded-full border-2 border-primary bg-background"></div>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <Train className="w-4 h-4 text-primary animate-pulse-gentle" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-medium">{train.arrival}</div>
              <div className="text-sm flex items-center gap-1">
                <span className="font-medium">{train.destinationCode}</span>
                <span className="text-muted-foreground">{train.destination}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            {train.classes.slice(0, expanded ? undefined : 1).map((cls) => (
              <TooltipProvider key={cls.type}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={cn(
                      "text-center px-3 py-1.5 rounded-lg border bg-card",
                      cls.status === "REGRET" ? "opacity-60" : "",
                    )}>
                      <div className="font-medium text-sm">{cls.type}</div>
                      <div className={cn(
                        "text-xs mt-1",
                        statusColors[cls.status]
                      )}>
                        {getStatusLabel(cls.status, cls.available)}
                      </div>
                      <div className="flex items-center justify-center mt-1 text-sm font-medium">
                        <IndianRupee className="w-3 h-3" />
                        {cls.price}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs">
                      {cls.type} - {getStatusLabel(cls.status, cls.available)}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            {!expanded && train.classes.length > 1 && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-full"
                onClick={toggleExpand}
              >
                +{train.classes.length - 1} more
              </Button>
            )}
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t animate-slide-down animation-delay-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Train Details</h4>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                  <div className="text-muted-foreground">Category</div>
                  <div>Express</div>
                  <div className="text-muted-foreground">Pantry</div>
                  <div>Available</div>
                  <div className="text-muted-foreground">Distance</div>
                  <div>1,291 km</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Route Information</h4>
                <div className="flex gap-2 flex-wrap">
                  {["MGS", "CNB", "LKO", "MB", "GKP", "GD"].map((station) => (
                    <Badge key={station} variant="outline" className="bg-background">
                      {station}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="bg-background">
                    +6 more
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4 pt-4 border-t">
              <Button className="flex-1 sm:flex-none">
                Book Now
              </Button>
              <Button variant="outline">
                Check Availability
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainCard;
