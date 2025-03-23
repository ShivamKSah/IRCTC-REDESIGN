
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import SearchBar from "@/components/ui-custom/SearchBar";
import TrainTimeline from "@/components/ui-custom/TrainTimeline";
import AnimatedLoader from "@/components/ui-custom/AnimatedLoader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Train,
  Clock,
  Map,
  RefreshCw,
  Bell,
  Share2,
  AlertCircle,
  MoveRight,
} from "lucide-react";

// Mock train status data
const trainStatus = [
  {
    station: "New Delhi",
    stationCode: "NDLS",
    scheduledArrival: "--:--",
    scheduledDeparture: "16:55",
    actualArrival: undefined,
    actualDeparture: "16:55",
    distance: 0,
    status: "departed" as const,
    platform: 9,
  },
  {
    station: "Mathura Junction",
    stationCode: "MTJ",
    scheduledArrival: "18:31",
    scheduledDeparture: "18:33",
    actualArrival: "18:31",
    actualDeparture: "18:33",
    distance: 141,
    status: "departed" as const,
    platform: 3,
  },
  {
    station: "Agra Cantt",
    stationCode: "AGC",
    scheduledArrival: "19:23",
    scheduledDeparture: "19:25",
    actualArrival: "19:23",
    actualDeparture: "19:25",
    distance: 195,
    status: "departed" as const,
    platform: 5,
  },
  {
    station: "Gwalior",
    stationCode: "GWL",
    scheduledArrival: "20:45",
    scheduledDeparture: "20:50",
    actualArrival: "20:55",
    actualDeparture: "21:00",
    distance: 306,
    status: "departed" as const,
    platform: 2,
    delayMinutes: 10,
  },
  {
    station: "Jhansi Junction",
    stationCode: "JHS",
    scheduledArrival: "21:40",
    scheduledDeparture: "21:50",
    actualArrival: "21:55",
    actualDeparture: "22:05",
    distance: 403,
    status: "departed" as const,
    platform: 1,
    delayMinutes: 15,
  },
  {
    station: "Bhopal Junction",
    stationCode: "BPL",
    scheduledArrival: "01:15",
    scheduledDeparture: "01:25",
    actualArrival: undefined,
    actualDeparture: undefined,
    distance: 703,
    status: "upcoming" as const,
    platform: 4,
    delayMinutes: 15,
  },
  {
    station: "Itarsi Junction",
    stationCode: "ET",
    scheduledArrival: "03:05",
    scheduledDeparture: "03:10",
    actualArrival: undefined,
    actualDeparture: undefined,
    distance: 846,
    status: "upcoming" as const,
    platform: 2,
  },
  {
    station: "Nagpur Junction",
    stationCode: "NGP",
    scheduledArrival: "06:15",
    scheduledDeparture: "06:25",
    actualArrival: undefined,
    actualDeparture: undefined,
    distance: 1092,
    status: "upcoming" as const,
    platform: 3,
  },
  {
    station: "Bhusaval Junction",
    stationCode: "BSL",
    scheduledArrival: "09:35",
    scheduledDeparture: "09:40",
    actualArrival: undefined,
    actualDeparture: undefined,
    distance: 1380,
    status: "upcoming" as const,
  },
  {
    station: "Mumbai CSTM",
    stationCode: "CSTM",
    scheduledArrival: "15:55",
    scheduledDeparture: "--:--",
    actualArrival: undefined,
    actualDeparture: undefined,
    distance: 1534,
    status: "upcoming" as const,
  },
];

// Mock train details
const trainDetails = {
  number: "12952",
  name: "New Delhi - Mumbai Rajdhani Express",
  departureTime: "16:55",
  arrivalTime: "15:55",
  duration: "23h 00m",
  departureDate: "15 Jun 2023",
  source: "New Delhi",
  destination: "Mumbai CSTM",
  sourceCode: "NDLS",
  destinationCode: "CSTM",
  averageSpeed: "85 km/h",
  status: "Running on time",
  delay: 15,
  lastUpdated: "21:05",
  nextStation: "Bhopal Junction (BPL)",
  estimatedArrival: "01:30",
  distance: {
    completed: 403,
    total: 1534,
    remaining: 1131,
  },
  rakes: [
    { coach: "EOG", occupancy: null, type: "Generator" },
    { coach: "H1", occupancy: 82, type: "1AC" },
    { coach: "A1", occupancy: 86, type: "2AC" },
    { coach: "A2", occupancy: 91, type: "2AC" },
    { coach: "B1", occupancy: 94, type: "3AC" },
    { coach: "B2", occupancy: 88, type: "3AC" },
    { coach: "B3", occupancy: 92, type: "3AC" },
    { coach: "PC", occupancy: 85, type: "Pantry Car" },
    { coach: "S1", occupancy: 96, type: "SL" },
    { coach: "S2", occupancy: 95, type: "SL" },
    { coach: "S3", occupancy: 92, type: "SL" },
    { coach: "S4", occupancy: 91, type: "SL" },
    { coach: "S5", occupancy: 93, type: "SL" },
    { coach: "S6", occupancy: 90, type: "SL" },
    { coach: "S7", occupancy: 89, type: "SL" },
    { coach: "S8", occupancy: 94, type: "SL" },
    { coach: "GEN", occupancy: 100, type: "General" },
    { coach: "SLR", occupancy: null, type: "Luggage" },
    { coach: "EOG", occupancy: null, type: "Generator" },
  ],
};

const TrainTracking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasSearched, setHasSearched] = useState(true); // set to true to show mockup initially
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const currentStation = "JHS"; // Jhansi Junction is the current station

  useEffect(() => {
    // Simulate map rendering
    if (mapContainerRef.current && hasSearched) {
      const mapImg = document.createElement("img");
      mapImg.src = "https://framerusercontent.com/images/AZ7CemeSMvPmulWmxMbVDZQe3o.jpg";
      mapImg.className = "w-full h-full object-cover rounded-lg";
      mapContainerRef.current.innerHTML = "";
      mapContainerRef.current.appendChild(mapImg);
    }
  }, [hasSearched]);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setSearchQuery(query);
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setHasSearched(true);
    }, 1500);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    
    // Simulate API request
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="page-container">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-4">Live Train Tracking</h1>
          <p className="text-muted-foreground max-w-3xl">
            Track your train in real-time with accurate location updates, arrival/departure times, and platform information
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8 animate-slide-up">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Enter Train Details</CardTitle>
            <CardDescription>
              Search by train number, name, or PNR
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <SearchBar
                  placeholder="Enter train number, name, or PNR"
                  withButton
                  buttonText="Track"
                  onSearch={handleSearch}
                  autoFocus
                />
              </div>
              <Button variant="outline" className="sm:self-end gap-2">
                <Map className="h-4 w-4" />
                <span>My Trains</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <AnimatedLoader size="lg" className="mb-4" />
            <p className="text-lg font-medium">Searching for train...</p>
            <p className="text-muted-foreground">Please wait while we fetch the latest information</p>
          </div>
        ) : hasSearched ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Train details & map */}
            <div className="lg:col-span-1 space-y-6">
              {/* Train Details */}
              <Card className="animate-slide-up">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="bg-primary/10 text-xs mb-2">
                        {trainDetails.number}
                      </Badge>
                      <CardTitle className="text-xl">{trainDetails.name}</CardTitle>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0 rounded-full"
                      onClick={handleRefresh}
                      disabled={refreshing}
                    >
                      {refreshing ? (
                        <AnimatedLoader size="sm" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Departed</p>
                      <p className="text-xl font-semibold">{trainDetails.departureTime}</p>
                      <p className="text-sm text-muted-foreground">{trainDetails.sourceCode}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-xs text-muted-foreground">{trainDetails.duration}</p>
                      <div className="flex items-center my-1">
                        <div className="h-1 w-2 bg-primary rounded-l-full"></div>
                        <div className="h-0.5 w-16 bg-muted"></div>
                        <div className="h-1 w-2 bg-primary rounded-r-full"></div>
                      </div>
                      <p className="text-xs text-muted-foreground">{trainDetails.distance.total} km</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Arriving</p>
                      <p className="text-xl font-semibold">{trainDetails.arrivalTime}</p>
                      <p className="text-sm text-muted-foreground">{trainDetails.destinationCode}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                        <Clock className="h-3.5 w-3.5" />
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-medium">Status: {trainDetails.status}</p>
                        <p className="text-xs text-muted-foreground">
                          {trainDetails.delay > 0 ? `Delayed by ${trainDetails.delay} minutes` : "Running on time"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                        <Train className="h-3.5 w-3.5" />
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-medium">Next Station: {trainDetails.nextStation}</p>
                        <p className="text-xs text-muted-foreground">
                          Estimated arrival at {trainDetails.estimatedArrival}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                        <AlertCircle className="h-3.5 w-3.5" />
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-medium">Journey Progress</p>
                        <div className="w-full mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(trainDetails.distance.completed / trainDetails.distance.total) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {trainDetails.distance.completed} km completed ({Math.round((trainDetails.distance.completed / trainDetails.distance.total) * 100)}%)
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between border-t pt-4 text-xs text-muted-foreground">
                  <span>Last updated: {trainDetails.lastUpdated}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                      <Bell className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                      <Share2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              {/* Live Map */}
              <div className="animate-fade-in animation-delay-200">
                <h3 className="text-lg font-medium mb-3">Live Location</h3>
                <div 
                  ref={mapContainerRef} 
                  className="bg-muted/60 rounded-lg h-[300px] flex items-center justify-center overflow-hidden border"
                >
                  <div className="text-muted-foreground">
                    <Map className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Loading map...</p>
                  </div>
                </div>
              </div>

              {/* Coach Layout */}
              <div className="animate-fade-in animation-delay-300">
                <h3 className="text-lg font-medium mb-3">Coach Composition</h3>
                <div className="overflow-x-auto pb-2 -mx-2 px-2">
                  <div className="flex gap-1 min-w-max">
                    {trainDetails.rakes.map((coach, index) => {
                      let bgColor = "bg-muted/60";
                      let textColor = "text-muted-foreground";
                      
                      if (coach.type === "1AC") {
                        bgColor = "bg-yellow-100 dark:bg-yellow-900/30";
                        textColor = "text-yellow-800 dark:text-yellow-400";
                      } else if (coach.type === "2AC") {
                        bgColor = "bg-green-100 dark:bg-green-900/30";
                        textColor = "text-green-800 dark:text-green-400";
                      } else if (coach.type === "3AC") {
                        bgColor = "bg-blue-100 dark:bg-blue-900/30";
                        textColor = "text-blue-800 dark:text-blue-400";
                      } else if (coach.type === "SL") {
                        bgColor = "bg-purple-100 dark:bg-purple-900/30";
                        textColor = "text-purple-800 dark:text-purple-400";
                      } else if (coach.type === "Pantry Car") {
                        bgColor = "bg-orange-100 dark:bg-orange-900/30";
                        textColor = "text-orange-800 dark:text-orange-400";
                      }
                      
                      return (
                        <div 
                          key={index} 
                          className={`min-w-16 h-16 p-1 rounded flex flex-col items-center justify-center text-center border ${bgColor} ${textColor}`}
                        >
                          <span className="text-sm font-medium">{coach.coach}</span>
                          <span className="text-xs mt-1">{coach.type.substring(0, 6)}</span>
                          {coach.occupancy !== null && (
                            <div className="w-full mt-1 h-1 rounded-full overflow-hidden bg-muted/40">
                              <div 
                                className={`h-full rounded-full ${coach.occupancy > 90 ? 'bg-red-500' : coach.occupancy > 75 ? 'bg-orange-500' : 'bg-green-500'}`}
                                style={{ width: `${coach.occupancy}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Timeline & info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Time Features */}
              <Tabs defaultValue="timeline" className="animate-slide-up">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="timeline">Station Timeline</TabsTrigger>
                  <TabsTrigger value="info">Train Information</TabsTrigger>
                </TabsList>
                <TabsContent value="timeline" className="pt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Route Timeline</CardTitle>
                      <CardDescription>
                        Live status of stations on the route
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TrainTimeline 
                        trainStatus={trainStatus} 
                        currentStation={currentStation}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="info" className="pt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Train Information</CardTitle>
                      <CardDescription>
                        Details about train services and schedule
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">Basic Information</h3>
                            <div className="bg-muted/40 rounded-lg p-3 text-sm space-y-3">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Train Number</span>
                                <span>{trainDetails.number}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Average Speed</span>
                                <span>{trainDetails.averageSpeed}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Distance</span>
                                <span>{trainDetails.distance.total} km</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Travel Time</span>
                                <span>{trainDetails.duration}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Rake Composition</span>
                                <span>{trainDetails.rakes.length} coaches</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">Services Available</h3>
                            <div className="bg-muted/40 rounded-lg p-3 text-sm space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Pantry Car</span>
                                <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700">
                                  Available
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Bedroll</span>
                                <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700">
                                  Available
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">WiFi</span>
                                <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
                                  Limited
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Wheelchair Access</span>
                                <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700">
                                  Available
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Charging Points</span>
                                <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700">
                                  Available
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Train Schedule</h3>
                          <div className="bg-muted/40 rounded-lg overflow-hidden">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b bg-muted/60">
                                  <th className="text-left px-3 py-2">Day</th>
                                  <th className="text-left px-3 py-2">Departure</th>
                                  <th className="text-left px-3 py-2">Running Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { day: "Monday", departure: "16:55", status: "Regular Service" },
                                  { day: "Tuesday", departure: "16:55", status: "Regular Service" },
                                  { day: "Wednesday", departure: "16:55", status: "Regular Service" },
                                  { day: "Thursday", departure: "16:55", status: "Regular Service" },
                                  { day: "Friday", departure: "16:55", status: "Regular Service" },
                                  { day: "Saturday", departure: "16:55", status: "Regular Service" },
                                  { day: "Sunday", departure: "16:55", status: "Regular Service" },
                                ].map((day, index) => (
                                  <tr key={day.day} className="border-b">
                                    <td className="px-3 py-2">{day.day}</td>
                                    <td className="px-3 py-2">{day.departure}</td>
                                    <td className="px-3 py-2">{day.status}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Station Amenities</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              { station: "New Delhi (NDLS)", amenities: "Waiting Room, Food Stalls, ATM, Medical" },
                              { station: "Mathura Junction (MTJ)", amenities: "Waiting Room, Food Stalls" },
                              { station: "Bhopal Junction (BPL)", amenities: "Waiting Room, Food Stalls, ATM" },
                              { station: "Mumbai CSTM (CSTM)", amenities: "Waiting Room, Food Stalls, ATM, Medical" },
                            ].map((station, index) => (
                              <div key={index} className="bg-muted/40 rounded-lg p-3 text-sm">
                                <p className="font-medium mb-1">{station.station}</p>
                                <p className="text-muted-foreground">{station.amenities}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Relevant Alerts */}
              <Card className="animate-fade-in animation-delay-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Track maintenance near Itarsi Junction",
                        time: "1 hour ago",
                        description: "May cause minor delays between Itarsi and Nagpur Junction.",
                        severity: "medium",
                      },
                      {
                        title: "Speed restrictions near Bhusaval",
                        time: "3 hours ago",
                        description: "Temporary speed restrictions in place due to track maintenance.",
                        severity: "low",
                      },
                    ].map((alert, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          alert.severity === "high"
                            ? "bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/20"
                            : alert.severity === "medium"
                            ? "bg-orange-50 border-orange-200 dark:bg-orange-900/10 dark:border-orange-900/20"
                            : "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-900/20"
                        }`}
                      >
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium text-sm">{alert.title}</h4>
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Related Trains */}
              <div className="animate-fade-in animation-delay-300">
                <h3 className="text-lg font-medium mb-3">Related Trains</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      number: "12951",
                      name: "Mumbai - New Delhi Rajdhani",
                      departure: "17:10",
                      arrival: "08:35",
                      status: "On Time",
                    },
                    {
                      number: "12953",
                      name: "August Kranti Rajdhani",
                      departure: "17:40",
                      arrival: "10:55",
                      status: "Delayed by 15m",
                    },
                  ].map((train, index) => (
                    <Card key={index} className="border hover:shadow-sm transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <Badge variant="outline" className="mb-1 text-xs">
                              {train.number}
                            </Badge>
                            <h4 className="font-medium text-sm mb-1">{train.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{train.departure}</span>
                              <MoveRight className="h-3 w-3" />
                              <span>{train.arrival}</span>
                            </div>
                          </div>
                          <Badge
                            className={
                              train.status.includes("Delayed")
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            }
                          >
                            {train.status}
                          </Badge>
                        </div>
                        <Button variant="ghost" className="w-full mt-2 text-xs h-8">
                          Track this train
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-center max-w-md mx-auto animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <Train className="h-8 w-8 text-muted-foreground/70" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Track Your Train</h2>
            <p className="text-muted-foreground mb-6">
              Enter a train number, name, or PNR to get real-time tracking information about your journey
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              <Button variant="outline" className="gap-2">
                <Train className="h-4 w-4" />
                <span>Track by PNR</span>
              </Button>
              <Button variant="outline" className="gap-2">
                <Map className="h-4 w-4" />
                <span>Recent Trains</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TrainTracking;
