
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import StationSelector from "@/components/ui-custom/StationSelector";
import DateSelector from "@/components/ui-custom/DateSelector";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Train,
  User,
  Users,
  Calendar,
  ArrowRight,
  Info,
  Filter,
  LocateFixed,
  RefreshCw,
  Clock,
  Check,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import AnimatedLoader from "@/components/ui-custom/AnimatedLoader";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const TrainBooking = () => {
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [departDate, setDepartDate] = useState<Date | undefined>(undefined);
  const [travelClass, setTravelClass] = useState("ALL"); // Changed default from "" to "ALL"
  const [quota, setQuota] = useState("GN");
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [errors, setErrors] = useState({
    fromStation: "",
    toStation: "",
    departDate: "",
  });
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors = {
      fromStation: !fromStation ? "Please select a source station" : "",
      toStation: !toStation ? "Please select a destination station" : "",
      departDate: !departDate ? "Please select a departure date" : "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSwapStations = () => {
    setFromStation(toStation);
    setToStation(fromStation);
  };

  const handleSearchTrains = () => {
    if (!validateForm()) return;

    if (fromStation === toStation) {
      toast({
        title: "Error",
        description: "Source and destination stations cannot be the same",
        variant: "destructive",
      });
      return;
    }

    setSearchInProgress(true);
    // Simulate API request
    setTimeout(() => {
      setSearchInProgress(false);
      window.location.href = "/trains";
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="page-container min-h-[calc(100vh-16rem)]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 animate-fade-in">Book Train Tickets</h1>
            <p className="text-muted-foreground animate-fade-in animation-delay-100">
              Find and book train tickets for your journey across India
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Search Form */}
            <div className="lg:col-span-2 animate-slide-up">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Train className="h-5 w-5 text-primary" />
                    Journey Details
                  </CardTitle>
                  <CardDescription>
                    Enter your journey details to find available trains
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                    <StationSelector
                      label="From Station"
                      id="from-station"
                      value={fromStation}
                      onChange={setFromStation}
                      placeholder="Select source station"
                      error={errors.fromStation}
                    />
                    
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="rounded-full h-8 w-8 shadow-sm"
                        onClick={handleSwapStations}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <StationSelector
                      label="To Station"
                      id="to-station"
                      value={toStation}
                      onChange={setToStation}
                      placeholder="Select destination station"
                      error={errors.toStation}
                    />
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="md:hidden rounded-full h-8 w-8 mx-auto"
                      onClick={handleSwapStations}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DateSelector
                      label="Travel Date"
                      id="depart-date"
                      date={departDate}
                      onDateChange={setDepartDate}
                      error={errors.departDate}
                    />
                    
                    <div className="space-y-2">
                      <Label htmlFor="travel-class">Travel Class</Label>
                      <Select 
                        value={travelClass} 
                        onValueChange={setTravelClass}
                      >
                        <SelectTrigger id="travel-class">
                          <SelectValue placeholder="All Classes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALL">All Classes</SelectItem> {/* Changed value from "" to "ALL" */}
                          <SelectItem value="1A">First AC (1A)</SelectItem>
                          <SelectItem value="2A">Second AC (2A)</SelectItem>
                          <SelectItem value="3A">Third AC (3A)</SelectItem>
                          <SelectItem value="SL">Sleeper (SL)</SelectItem>
                          <SelectItem value="CC">Chair Car (CC)</SelectItem>
                          <SelectItem value="2S">Second Sitting (2S)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quota">Reservation Quota</Label>
                      <Select 
                        value={quota} 
                        onValueChange={setQuota}
                      >
                        <SelectTrigger id="quota">
                          <SelectValue placeholder="General Quota" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GN">General (GN)</SelectItem>
                          <SelectItem value="TQ">Tatkal Quota (TQ)</SelectItem>
                          <SelectItem value="LD">Ladies Quota (LD)</SelectItem>
                          <SelectItem value="PT">Premium Tatkal (PT)</SelectItem>
                          <SelectItem value="DF">Duty Pass (DF)</SelectItem>
                          <SelectItem value="FT">Foreign Tourist (FT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="passengers">Number of Passengers</Label>
                      <Select defaultValue="1">
                        <SelectTrigger id="passengers">
                          <SelectValue placeholder="1 Passenger" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Passenger</SelectItem>
                          <SelectItem value="2">2 Passengers</SelectItem>
                          <SelectItem value="3">3 Passengers</SelectItem>
                          <SelectItem value="4">4 Passengers</SelectItem>
                          <SelectItem value="5">5 Passengers</SelectItem>
                          <SelectItem value="6">6 Passengers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="flexible-dates" />
                      <Label htmlFor="flexible-dates" className="text-sm">Show trains with flexible dates (±3 days)</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="connecting-trains" />
                      <Label htmlFor="connecting-trains" className="text-sm">Include connecting trains in search results</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="divyaang-concession" />
                      <Label htmlFor="divyaang-concession" className="text-sm">Divyaang concession</Label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      className="flex-1 sm:flex-none" 
                      onClick={handleSearchTrains}
                      disabled={searchInProgress}
                    >
                      {searchInProgress ? (
                        <>
                          <AnimatedLoader className="mr-2" size="sm" variant="primary" />
                          <span>Searching...</span>
                        </>
                      ) : (
                        <>
                          <Train className="mr-2 h-4 w-4" />
                          <span>Search Trains</span>
                        </>
                      )}
                    </Button>
                    <Button variant="outline" type="button">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Advanced Filters</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Searches */}
              <Card className="mt-6 animate-fade-in animation-delay-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Recent Searches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        from: "New Delhi",
                        fromCode: "NDLS",
                        to: "Mumbai",
                        toCode: "CSTM",
                        date: "11 Jun 2023",
                        class: "3A",
                      },
                      {
                        from: "Bangalore",
                        fromCode: "SBC",
                        to: "Chennai",
                        toCode: "MAS",
                        date: "24 May 2023",
                        class: "SL",
                      },
                    ].map((search, i) => (
                      <div 
                        key={i} 
                        className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 cursor-pointer transition-colors duration-200"
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{search.fromCode}</span>
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            <span className="font-medium">{search.toCode}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {search.from} to {search.to}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>{search.date}</span>
                            <Badge variant="outline" className="text-[10px] py-0 h-4">
                              {search.class}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 animate-slide-up animation-delay-300">
              {/* Featured Routes */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <LocateFixed className="h-4 w-4 text-primary" />
                    Featured Routes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { from: "Delhi", to: "Mumbai", trains: 42 },
                    { from: "Chennai", to: "Bangalore", trains: 35 },
                    { from: "Kolkata", to: "Delhi", trains: 29 },
                    { from: "Hyderabad", to: "Chennai", trains: 22 },
                  ].map((route, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between bg-muted/30 rounded-lg p-3 cursor-pointer hover:bg-muted/60 transition-colors duration-200"
                    >
                      <div>
                        <div className="flex items-center gap-1">
                          <span>{route.from}</span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span>{route.to}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {route.trains} trains available
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-primary/5">
                        Popular
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Travel Tips */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Travel Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Tatkal Booking Tips</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                          <li>Tatkal booking starts at 10:00 AM for AC classes and 11:00 AM for non-AC classes.</li>
                          <li>Keep your passenger details ready before booking to save time.</li>
                          <li>Ensure you have multiple payment options ready.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Reservation Quotas</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                          <li><span className="font-medium">General Quota (GN):</span> Available for all passengers</li>
                          <li><span className="font-medium">Tatkal Quota (TQ):</span> For last-minute bookings</li>
                          <li><span className="font-medium">Ladies Quota (LD):</span> Reserved for women travelers</li>
                          <li><span className="font-medium">Premium Tatkal (PT):</span> Dynamic pricing</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Train Classes Explained</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                          <li><span className="font-medium">1A:</span> First AC - Most luxurious with private cabins</li>
                          <li><span className="font-medium">2A:</span> Second AC - Comfortable 2-tier berths</li>
                          <li><span className="font-medium">3A:</span> Third AC - Economical air-conditioned travel</li>
                          <li><span className="font-medium">SL:</span> Sleeper - Non-AC berths, most affordable</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Check PNR Status</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Train className="mr-2 h-4 w-4" />
                    <span>Train Schedule</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    <span>Manage Profile</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Saved Passengers</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TrainBooking;
