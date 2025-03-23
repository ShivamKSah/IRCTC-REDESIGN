
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import TrainCard from "@/components/ui-custom/TrainCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Train,
  Filter,
  RefreshCw,
  ArrowRight,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  MapPin,
} from "lucide-react";
import AnimatedLoader from "@/components/ui-custom/AnimatedLoader";

// Mock data for train list
const mockTrains = [
  {
    id: "12302",
    number: "12302",
    name: "New Delhi - Howrah Rajdhani Express",
    departure: "16:55",
    arrival: "10:10",
    duration: "17h 15m",
    source: "New Delhi",
    destination: "Howrah",
    sourceCode: "NDLS",
    destinationCode: "HWH",
    date: "Wed, 15 Jun 2023",
    classes: [
      { type: "1A", available: 12, price: 4295, status: "AVL" as const },
      { type: "2A", available: 24, price: 2515, status: "AVL" as const },
      { type: "3A", available: 5, price: 1765, status: "RAC" as const },
    ],
    runsOn: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
  },
  {
    id: "12952",
    number: "12952",
    name: "New Delhi - Mumbai Central Rajdhani Express",
    departure: "16:25",
    arrival: "08:35",
    duration: "16h 10m",
    source: "New Delhi",
    destination: "Mumbai Central",
    sourceCode: "NDLS",
    destinationCode: "MMCT",
    date: "Wed, 15 Jun 2023",
    classes: [
      { type: "1A", available: 0, price: 4185, status: "WL" as const },
      { type: "2A", available: 16, price: 2465, status: "AVL" as const },
      { type: "3A", available: 32, price: 1695, status: "AVL" as const },
    ],
    runsOn: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
  },
  {
    id: "12951",
    number: "12951",
    name: "Mumbai Central - New Delhi Rajdhani Express",
    departure: "17:40",
    arrival: "08:35",
    duration: "14h 55m",
    source: "Mumbai Central",
    destination: "New Delhi",
    sourceCode: "MMCT",
    destinationCode: "NDLS",
    date: "Wed, 15 Jun 2023",
    classes: [
      { type: "1A", available: 0, price: 4185, status: "REGRET" as const },
      { type: "2A", available: 0, price: 2465, status: "REGRET" as const },
      { type: "3A", available: 14, price: 1695, status: "AVL" as const },
    ],
    runsOn: ["Mo", "We", "Fr", "Su"]
  },
  {
    id: "12957",
    number: "12957",
    name: "Swarna Jayanti Rajdhani Express",
    departure: "19:55",
    arrival: "07:30",
    duration: "11h 35m",
    source: "New Delhi",
    destination: "Ahmedabad",
    sourceCode: "NDLS",
    destinationCode: "ADI",
    date: "Wed, 15 Jun 2023",
    classes: [
      { type: "2A", available: 4, price: 2250, status: "RAC" as const },
      { type: "3A", available: 28, price: 1550, status: "AVL" as const },
      { type: "SL", available: 120, price: 580, status: "AVL" as const },
    ],
    runsOn: ["Mo", "Tu", "We", "Fr"]
  },
  {
    id: "12903",
    number: "12903",
    name: "Golden Temple Mail",
    departure: "21:20",
    arrival: "14:10",
    duration: "16h 50m",
    source: "Mumbai Central",
    destination: "Amritsar",
    sourceCode: "MMCT",
    destinationCode: "ASR",
    date: "Wed, 15 Jun 2023",
    classes: [
      { type: "1A", available: 2, price: 3950, status: "AVL" as const },
      { type: "2A", available: 12, price: 2320, status: "AVL" as const },
      { type: "3A", available: 62, price: 1605, status: "AVL" as const },
      { type: "SL", available: 240, price: 625, status: "AVL" as const },
    ],
    runsOn: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
  },
];

// Filter options
const classTypes = [
  { id: "1A", label: "First AC (1A)" },
  { id: "2A", label: "Second AC (2A)" },
  { id: "3A", label: "Third AC (3A)" },
  { id: "SL", label: "Sleeper (SL)" },
  { id: "CC", label: "Chair Car (CC)" },
  { id: "2S", label: "Second Sitting (2S)" },
];

const quotaTypes = [
  { id: "GN", label: "General Quota" },
  { id: "TQ", label: "Tatkal Quota" },
  { id: "LD", label: "Ladies Quota" },
  { id: "PT", label: "Premium Tatkal" },
  { id: "DF", label: "Duty Pass" },
];

const departureTimeSlots = [
  { id: "0-6", label: "Early Morning (00:00 - 06:00)" },
  { id: "6-12", label: "Morning (06:00 - 12:00)" },
  { id: "12-18", label: "Afternoon (12:00 - 18:00)" },
  { id: "18-24", label: "Night (18:00 - 24:00)" },
];

const TrainList = () => {
  const [trains, setTrains] = useState(mockTrains);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedQuota, setSelectedQuota] = useState("GN");
  const [departureTimeRange, setDepartureTimeRange] = useState([0, 24]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedAvailability, setSelectedAvailability] = useState("all");
  const [sortOption, setSortOption] = useState("departure");

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="page-container">
        <div className="mb-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Trains for Your Journey</h1>
              <div className="flex items-center text-muted-foreground">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  New Delhi (NDLS)
                </span>
                <ArrowRight className="h-4 w-4 mx-2" />
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Mumbai (CSTM)
                </span>
                <span className="mx-4">|</span>
                <Calendar className="h-4 w-4 mr-1" />
                <span>Wed, 15 Jun 2023</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filters</span>
                    <Badge className="ml-1 text-xs">3</Badge>
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filter Trains</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    {/* Travel Class Filter */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Travel Class</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {classTypes.map((classType) => (
                          <div
                            key={classType.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`class-${classType.id}`}
                              checked={selectedClasses.includes(classType.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedClasses([...selectedClasses, classType.id]);
                                } else {
                                  setSelectedClasses(
                                    selectedClasses.filter((id) => id !== classType.id)
                                  );
                                }
                              }}
                            />
                            <Label htmlFor={`class-${classType.id}`}>{classType.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quota Filter */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Quota</h3>
                      <RadioGroup 
                        value={selectedQuota}
                        onValueChange={setSelectedQuota}
                      >
                        {quotaTypes.map((quota) => (
                          <div 
                            key={quota.id}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem value={quota.id} id={`quota-${quota.id}`} />
                            <Label htmlFor={`quota-${quota.id}`}>{quota.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Departure Time Filter */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Departure Time</h3>
                      <div className="px-2">
                        <Slider
                          value={departureTimeRange}
                          min={0}
                          max={24}
                          step={1}
                          onValueChange={setDepartureTimeRange}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                          <span>{departureTimeRange[0]}:00</span>
                          <span>{departureTimeRange[1]}:00</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {departureTimeSlots.map((slot) => (
                          <div
                            key={slot.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`time-${slot.id}`}
                              onCheckedChange={() => {
                                const [start, end] = slot.id.split('-').map(Number);
                                setDepartureTimeRange([start, end]);
                              }}
                            />
                            <Label htmlFor={`time-${slot.id}`} className="text-xs">
                              {slot.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Price Range</h3>
                      <div className="px-2">
                        <Slider
                          value={priceRange}
                          min={0}
                          max={5000}
                          step={100}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                          <span>₹{priceRange[0]}</span>
                          <span>₹{priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Availability Filter */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Availability</h3>
                      <RadioGroup 
                        value={selectedAvailability}
                        onValueChange={setSelectedAvailability}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="all" />
                          <Label htmlFor="all">All Trains</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="available" id="available" />
                          <Label htmlFor="available">Available Only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="tatkal" id="tatkal" />
                          <Label htmlFor="tatkal">Tatkal Available</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Additional Options */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Additional Options</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="accessible" />
                          <Label htmlFor="accessible">Accessible Facilities</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="pantry" />
                          <Label htmlFor="pantry">Pantry Available</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="charging" />
                          <Label htmlFor="charging">Charging Points</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <SheetFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSelectedClasses([]);
                        setSelectedQuota("GN");
                        setDepartureTimeRange([0, 24]);
                        setPriceRange([0, 5000]);
                        setSelectedAvailability("all");
                      }}
                    >
                      Reset Filters
                    </Button>
                    <SheetClose asChild>
                      <Button type="button">Apply Filters</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              <Button variant="outline" className="gap-2" onClick={handleRefresh} disabled={loading}>
                {loading ? (
                  <AnimatedLoader size="sm" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">Refresh</span>
              </Button>

              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Change Date</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Results toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 animate-fade-in animation-delay-100">
          <div className="mb-2 sm:mb-0">
            <span className="text-sm text-muted-foreground">
              Found <span className="font-medium text-foreground">{trains.length}</span> trains
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort by:</span>
            <select
              className="bg-transparent border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="departure">Departure (Early → Late)</option>
              <option value="arrival">Arrival (Early → Late)</option>
              <option value="duration">Duration (Short → Long)</option>
              <option value="price">Price (Low → High)</option>
              <option value="availability">Availability</option>
            </select>
          </div>
        </div>

        {/* Train list */}
        <div className="space-y-4">
          {loading ? (
            <div className="w-full py-24 flex flex-col items-center justify-center animate-fade-in">
              <AnimatedLoader size="lg" className="mb-4" />
              <p className="text-muted-foreground">Searching for trains...</p>
            </div>
          ) : (
            <>
              {trains.map((train, index) => (
                <TrainCard 
                  key={train.id} 
                  train={train} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }} 
                />
              ))}
            </>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 animate-fade-in animation-delay-300">
          <Button variant="outline" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "outline"}
                size="sm"
                className="w-8 h-8 p-0 rounded-full mx-1"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Additional information */}
        <div className="mt-12 bg-muted/30 rounded-lg p-4 animate-fade-in animation-delay-500">
          <h3 className="text-lg font-medium mb-2">Travel Information</h3>
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              The train schedule and availability information displayed above is indicative and subject to confirmation from Indian Railways.
            </p>
            <p>
              For more information about the trains, please contact the Indian Railways helpline at 139 or visit the official website.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TrainList;
