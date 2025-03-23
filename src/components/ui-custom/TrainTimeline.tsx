
import { cn } from "@/lib/utils";

interface TrainStatus {
  station: string;
  stationCode: string;
  scheduledArrival: string;
  scheduledDeparture: string;
  actualArrival?: string;
  actualDeparture?: string;
  distance: number;
  status: "arrived" | "departed" | "upcoming" | "delayed" | "cancelled";
  platform?: number;
  delayMinutes?: number;
}

interface TrainTimelineProps {
  trainStatus: TrainStatus[];
  currentStation: string;
  className?: string;
}

const TrainTimeline = ({ trainStatus, currentStation, className = "" }: TrainTimelineProps) => {
  const getStatusClasses = (status: TrainStatus["status"]) => {
    switch (status) {
      case "arrived":
      case "departed":
        return "bg-green-500";
      case "upcoming":
        return "bg-blue-500";
      case "delayed":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className={cn("relative", className)}>
      {trainStatus.map((station, index) => (
        <div key={station.stationCode} className="relative">
          <div className="flex items-start mb-8">
            {/* Timeline connector */}
            <div className="flex flex-col items-center mr-4">
              <div
                className={cn(
                  "w-3 h-3 rounded-full z-10",
                  getStatusClasses(station.status)
                )}
              ></div>
              {index < trainStatus.length - 1 && (
                <div
                  className={cn(
                    "w-0.5 h-24 -mt-1.5",
                    index < trainStatus.findIndex(s => s.stationCode === currentStation)
                      ? "bg-green-500"
                      : "bg-gray-200 dark:bg-gray-700"
                  )}
                ></div>
              )}
            </div>

            {/* Station content */}
            <div 
              className={cn(
                "flex-1 p-4 rounded-lg border transition-all duration-300",
                station.stationCode === currentStation ? 
                  "bg-primary/5 border-primary shadow-sm" : 
                  "bg-card hover:bg-muted/40"
              )}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{station.station}</h3>
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded">
                      {station.stationCode}
                    </span>
                    {station.platform && (
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-0.5 rounded">
                        Platform {station.platform}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {station.distance} km
                  </p>
                </div>
                
                <div className="flex flex-col sm:items-end gap-1">
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">Scheduled:</div>
                    <div className="text-sm">
                      {station.scheduledArrival} - {station.scheduledDeparture}
                    </div>
                  </div>
                  
                  {(station.actualArrival || station.actualDeparture) && (
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground">Actual:</div>
                      <div className="text-sm">
                        {station.actualArrival || "--"} - {station.actualDeparture || "--"}
                      </div>
                    </div>
                  )}
                  
                  {station.status === "delayed" && station.delayMinutes && (
                    <div className="text-xs text-yellow-600 dark:text-yellow-400">
                      Delayed by {station.delayMinutes} min
                    </div>
                  )}
                  
                  {station.status === "cancelled" && (
                    <div className="text-xs text-red-600 dark:text-red-400">
                      Cancelled
                    </div>
                  )}
                  
                  {station.status === "arrived" && (
                    <div className="text-xs text-green-600 dark:text-green-400">
                      Arrived
                    </div>
                  )}
                  
                  {station.status === "departed" && (
                    <div className="text-xs text-green-600 dark:text-green-400">
                      Departed
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrainTimeline;
