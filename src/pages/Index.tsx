
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import SearchBar from "@/components/ui-custom/SearchBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Train, 
  MapPin, 
  Calendar, 
  User, 
  Clock, 
  ChevronRight, 
  LocateFixed,
  BellRing,
  Ticket,
  Package,
  Coffee,
  Hotel,
  Map,
  PlayCircle
} from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
  {/* Background Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/40 z-0"></div>
  
  {/* Background Image */}
  <div 
    className="absolute inset-0 z-0 bg-cover bg-center" 
    style={{ 
      backgroundImage: "url('https://media-hosting.imagekit.io//66b3377de0314aa6/WhatsApp%20Image%202025-03-23%20at%2016.27.25_aff511a9_waifu2x_photo_noise3_scale.png?Expires=1837335599&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ke9XLk2Yj1tQIxFlDGocUjBDxqSB0OgpGr5hqV9rFDGDqfM9TclbW29wqlnibiIVNlzmISl3usqfGLAsx19D4gAaDAZsyLMw7NfiniwysWbkNIjzCrck-fiFID80lfGk89ELfXRZBDMjrmoBKKidaGrL~JcDnl2btf8oqxLe8or0Cit~w8dkx2R4ORDJTaZEIuDjy5hdaJEeqha-91b8uiVsmxTZ2e2yWfPhnehe2-mCJ7eHkbtp76B8Dc3PZuYh3lpOQPjG3Yxm~otmqOxdDOvtcNZiAOxQ~2t6Z8FE5jACJiJzDFoepBJnZ0Mty584~6cVMYcFF5mOuVUWhPXHEQ__')",
      filter: "brightness(0.4)"
    }}
  ></div>
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <Badge 
            variant="outline" 
            className="mb-4 text-white border-white/20 backdrop-blur-sm px-4 py-1.5 animate-fade-in"
          >
            Welcome to IRCTC
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl animate-slide-up">
            Experience Seamless Train Travel Across India
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 animate-slide-up animation-delay-200">
            Book tickets, track trains, and explore destinations with our modern railway platform
          </p>
          
          {/* Search Container */}
          <div className="w-full max-w-3xl bg-white/95 dark:bg-card/95 rounded-xl p-4 shadow-elevation backdrop-blur-md animate-fade-in animation-delay-300">
            <Tabs defaultValue="book" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="book">Book Ticket</TabsTrigger>
                <TabsTrigger value="pnr">PNR Status</TabsTrigger>
                <TabsTrigger value="track">Track Train</TabsTrigger>
              </TabsList>
              
              <TabsContent value="book" className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-primary/20 focus-within:border-primary/30">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="From: City or Station" 
                      className="w-full pl-10 pr-4 py-2 bg-transparent focus:outline-none"
                    />
                  </div>
                  <div className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-primary/20 focus-within:border-primary/30">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="To: City or Station" 
                      className="w-full pl-10 pr-4 py-2 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-primary/20 focus-within:border-primary/30">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Date" 
                      className="w-full pl-10 pr-4 py-2 bg-transparent focus:outline-none"
                    />
                  </div>
                  <div className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-primary/20 focus-within:border-primary/30">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <User className="h-4 w-4" />
                    </div>
                    <select 
                      className="w-full pl-10 pr-4 py-2 bg-transparent focus:outline-none appearance-none"
                    >
                      <option>All Classes</option>
                      <option>First AC</option>
                      <option>Second AC</option>
                      <option>Third AC</option>
                      <option>Sleeper</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <Link to="/booking">
                      <Button className="w-full">
                        Search Trains
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="pnr" className="animate-fade-in">
                <div className="space-y-4">
                  <div className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-primary/20 focus-within:border-primary/30">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Ticket className="h-4 w-4" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Enter 10 digit PNR Number" 
                      className="w-full pl-10 pr-4 py-2 bg-transparent focus:outline-none"
                    />
                  </div>
                  <Button className="w-full">
                    Check PNR Status
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="track" className="animate-fade-in">
                <div className="space-y-4">
                  <div className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-primary/20 focus-within:border-primary/30">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Train className="h-4 w-4" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Enter Train Number or Name" 
                      className="w-full pl-10 pr-4 py-2 bg-transparent focus:outline-none"
                    />
                  </div>
                  <Link to="/track">
                    <Button className="w-full">
                      Track Train
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Premium Services</h2>
            <p className="text-muted-foreground">
              Experience the best of Indian Railways with our premium features and exclusive services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Real-Time Tracking",
                description: "Track your train with accurate real-time updates and live location",
                icon: <LocateFixed />,
                color: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
              },
              {
                title: "Smart Alerts",
                description: "Get timely notifications about schedule changes and platform updates",
                icon: <BellRing />,
                color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
              },
              {
                title: "Tatkal Booking",
                description: "Quick and hassle-free tatkal booking with smart auto-fill",
                icon: <Clock />,
                color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
              },
              {
                title: "Meal Pre-ordering",
                description: "Order your favorite meals before your journey begins",
                icon: <Coffee />,
                color: "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
              },
              {
                title: "Luggage Services",
                description: "Book luggage services in advance for a comfortable journey",
                icon: <Package />,
                color: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
              },
              {
                title: "Hotel Booking",
                description: "Book hotels near your destination with exclusive discounts",
                icon: <Hotel />,
                color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
              },
            ].map((feature, index) => (
              <Card 
                key={feature.title} 
                className="border bg-card/60 backdrop-blur-sm hover:shadow-md transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="px-0 flex items-center gap-1 text-primary hover:text-primary/80 hover:bg-transparent">
                    <span>Learn more</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Routes</h2>
            <p className="text-muted-foreground">
              Explore the most traveled routes across India with our premium train services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                from: "Delhi",
                to: "Mumbai",
                image: "https://media-hosting.imagekit.io//607f1d87cf00407b/download%20(5)_waifu2x_noise3_scale4x.png?Expires=1837244235&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Vv2JvxdWt4op1P9SUW3uKZuNWBx59-44eXWB1hXTbn60NqSyVy-6DWQNWneNeJzYaYNmOspD87BGbBdH-37HbpFGU~w~WJLBDBdFYtbLng1f8OQtoTSIzIgVE~xKFx4P2mReSp-MnjXXZQ6LArk~T6DFF2LDmOW4y6IaXOvDlOaqPR4nOYaxqbfvGoM1KBo0o0Ke2PcM~h6ztpBffQ~j48JX1fMhoLDrHtuPP~ydqOZMScK5TsPTwXA07VF2psooVenqDoN56ii2aNYxgofFodYgfZuRpgPPgLV4C5rcnLZiEj5hTpJoT9Yg6IoXDViI3s4F4hQiD7KAdsPqB4uwTg__",
                trains: 42,
                time: "16h 30m",
              },
              {
                from: "Kolkata",
                to: "Chennai",
                image: "https://i.pinimg.com/736x/5a/b5/67/5ab5675966524841085625892abfb11f.jpg",
                trains: 28,
                time: "24h 15m",
              },
              {
                from: "Bangalore",
                to: "Hyderabad",
                image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=500&auto=format&fit=crop",
                trains: 35,
                time: "10h 45m",
              },
              {
                from: "Ahmedabad",
                to: "Jaipur",
                image: "https://i.pinimg.com/736x/62/9f/ea/629fea744355e384667aa949cbf9db27.jpg",
                trains: 22,
                time: "12h 20m",
              },
            ].map((route, index) => (
              <div 
                key={`${route.from}-${route.to}`} 
                className="group rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={route.image} 
                    alt={`${route.from} to ${route.to}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm opacity-80">From</div>
                        <div className="font-medium">{route.from}</div>
                      </div>
                      <Train className="h-5 w-5 text-white/70" />
                      <div className="text-right">
                        <div className="text-sm opacity-80">To</div>
                        <div className="font-medium">{route.to}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{route.trains}</span> trains
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {route.time}
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full mt-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    View Trains
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" className="gap-1">
              <span>Explore All Routes</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5 border-y">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 animate-slide-up">
              <h2 className="text-3xl font-bold">Download the IRCTC App</h2>
              <p className="text-muted-foreground max-w-md">
                Get the app for a faster and more convenient booking experience with exclusive mobile-only features and discounts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"></path>
                    <path d="M16 19h6"></path>
                    <path d="M19 16v6"></path>
                  </svg>
                  <span>Google Play</span>
                </Button>
                <Button variant="outline" className="gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                    <path d="M10 2c1 .5 2 2 2 5"></path>
                  </svg>
                  <span>App Store</span>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm1-4a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0z"></path>
                  </svg>
                  <span className="text-sm">24/7 Support</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 11 4-7"></path>
                    <path d="m19 11-4-7"></path>
                    <path d="M2 11h20"></path>
                    <path d="m5 11 4 7"></path>
                    <path d="m19 11-4 7"></path>
                  </svg>
                  <span className="text-sm">Online Booking</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                  <span className="text-sm">Live Tracking</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-up animation-delay-200 w-full max-w-[100%] mx-auto">
              <div className="w-full max-w-[1540px] mx-auto"> 
                <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-2xl -z-10 opacity-70"></div>
                <img 
                  src="https://media-hosting.imagekit.io//1bd2fdbaab4e40c6/Screenshot%202025-03-22%20162228_waifu2x_photo_noise3_scale.png?Expires=1837276164&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=nxfl30M29ImaA2~LYmH72tg~UiuULhqLHriPDsOED48oVZ3LWAp-FhKgjEnWXnF9gLHkZSXDvVEl0VPIRZEUreqqczt3iWXthXbD6EjDAKtj4GsZ4kOucZgCyrhsHN9TLwB54W9~cLLvPqM4PNt2bZtVgFtf0olKjpK~ozjUOscwrF0fQ5grjg0V5EBV6lzGb~LMwuIOGIQT3teql3I~BiXKgS~-CcHcmG4gm6fiftrn5eCkdqlmt8AspaGQ-mRi8Z99hdP67bk79ugpGYuiKLSie02PeMb1zoGwnB3iqRt7Eh7YjPV9ln9Epfit5mQ4SoO79uRL2bzWjYZqyM6EuA__" 
                  alt="IRCTC App" 
                  className="w-full h-auto scale-110"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats & Info */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Daily Travelers", value: "2.3M+", icon: <User /> },
              { label: "Stations Covered", value: "7,325", icon: <MapPin /> },
              { label: "Trains Running", value: "13,169", icon: <Train /> },
              { label: "Customer Satisfaction", value: "94%", icon: <BellRing /> },
            ].map((stat, index) => (
              <Card 
                key={stat.label} 
                className="text-center shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-2">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Explore India */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore India by Train</h2>
            <p className="text-muted-foreground">
              Discover the best tourist destinations connected by Indian Railways
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 row-span-2 animate-fade-in">
              <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1524230659092-07f99a75c013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                  alt="Rajasthan by Train" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-80"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <div className="flex justify-between items-end">
                    <div>
                      <Badge className="bg-primary/50 backdrop-blur-sm border-none mb-3">Featured</Badge>
                      <h3 className="text-2xl font-bold mb-2">Rajasthan Heritage Tour</h3>
                      <p className="text-white/80 mb-4 max-w-md">Experience the royal heritage of Rajasthan with our luxury train package covering Jaipur, Udaipur, and Jodhpur.</p>
                      <Button className="gap-2 bg-white text-primary hover:bg-white/90">
                        <span>View Package</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="hidden md:block text-right">
                      <p className="text-white/70 text-sm">Starting from</p>
                      <p className="text-2xl font-bold">₹12,999</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {[
              {
                title: "Kerala Backwaters",
                image: "https://www.tripsavvy.com/thmb/UjTIe0jl_mpF2E14pEAI0cBVVvY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-522478216-5ab12c4e3de4230036949cee.jpg",
                price: "₹9,499",
              },
              {
                title: "Himalayan Express",
                image: "https://i.pinimg.com/736x/87/ae/5a/87ae5ab39ca7a419599d2e67eea16d54.jpg",
                price: "₹15,899",
              },
              {
                title: "Golden Triangle",
                image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=500&auto=format&fit=crop",
                price: "₹7,999",
              },
              {
                title: "Eastern Odyssey",
                image: "https://specialplacesofindia.com/wp-content/uploads/2024/01/Untitled-design-2024-06-10T210108.434.jpg",
                price: "₹11,299",
              },
            ].map((tour, index) => (
              <div 
                key={tour.title} 
                className="animate-fade-in animation-delay-300"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="relative rounded-xl overflow-hidden group h-[200px] sm:h-[230px]">
                  <img 
                    src={tour.image} 
                    alt={tour.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="font-medium mb-1">{tour.title}</h3>
                        <Button variant="link" className="px-0 text-white hover:text-white/90 hover:no-underline flex items-center gap-1">
                          <span>View Details</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/80">From</p>
                        <p className="font-medium">{tour.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn how */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 space-y-6 animate-slide-up">
              <h2 className="text-3xl font-bold">How IRCTC Works</h2>
              <p className="text-muted-foreground">
                Learn how our platform has revolutionized the train booking experience for millions of passengers across India.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Search & Compare",
                    description: "Find the best trains and fares between any stations in India with our smart search",
                  },
                  {
                    title: "Book with Ease",
                    description: "Secure your tickets with just a few clicks and multiple payment options",
                  },
                  {
                    title: "Track in Real-time",
                    description: "Get live updates about your train's location, delays, and platform changes",
                  },
                ].map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <Button className="gap-2">
                  <span>Learn More</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="gap-2">
                  <PlayCircle className="h-4 w-4" />
                  <span>Watch Demo</span>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 animate-slide-up animation-delay-200">
              <div className="relative rounded-xl overflow-hidden shadow-elevation aspect-video">
                <img 
                  src="https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                  alt="IRCTC Demo" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="bg-white/90 dark:bg-black/80 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-transform duration-300">
                    <PlayCircle className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-primary/5 border-t">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in">Stay Updated</h2>
          <p className="text-muted-foreground mb-8 animate-fade-in animation-delay-100">
            Get notified about new features, discounts, and travel tips for a better railway experience
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto animate-fade-in animation-delay-200">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 rounded-lg border bg-background/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button>Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4 animate-fade-in animation-delay-300">
            By subscribing, you agree to our Privacy Policy and Terms of Service
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
