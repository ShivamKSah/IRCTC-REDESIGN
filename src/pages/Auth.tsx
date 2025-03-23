
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  Phone,
  User,
  Train,
  ArrowRight,
  Smartphone,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import AnimatedLoader from "@/components/ui-custom/AnimatedLoader";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const { toast } = useToast();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Success",
        description: "You are now logged in",
      });
    }, 1500);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (
      !registerForm.name ||
      !registerForm.email ||
      !registerForm.phone ||
      !registerForm.password
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Account created",
        description: "Your account has been created successfully",
      });
      setActiveTab("login");
    }, 1500);
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <MainLayout hideFooter className="bg-muted/30">
      <div className="min-h-[calc(100vh-4rem)] flex flex-col sm:flex-row">
        {/* Left Section (Login/Register Form) */}
        <div className="w-full sm:w-1/2 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md animate-fade-in">
            <div className="mb-8 text-center sm:text-left">
              <Link to="/" className="flex items-center gap-2 text-xl font-semibold mb-2 mx-auto sm:mx-0 w-fit">
                <Train className="h-6 w-6 text-primary" />
                <span>IRCTC</span>
              </Link>
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground">Sign in to your account to continue</p>
            </div>

            <Tabs 
              defaultValue={activeTab} 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as "login" | "register")}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Register
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="animate-slide-up">
                <Card className="border-none shadow-none bg-transparent">
                  <CardContent className="p-0">
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                          </div>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link to="#" className="text-xs text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <Lock className="h-4 w-4" />
                          </div>
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={toggleShowPassword}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? (
                          <AnimatedLoader className="mr-2" size="sm" variant="primary" />
                        ) : (
                          <LogIn className="mr-2 h-4 w-4" />
                        )}
                        {loading ? "Signing in..." : "Sign In"}
                      </Button>
                    </form>
                  </CardContent>

                  <CardFooter className="flex flex-col p-0 pt-6">
                    <div className="relative w-full">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="bg-muted/30 dark:bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <Button variant="outline" className="gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        <span>GitHub</span>
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                        <span>Facebook</span>
                      </Button>
                    </div>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                      Don't have an account?{" "}
                      <button 
                        type="button" 
                        className="text-primary hover:underline font-medium" 
                        onClick={() => setActiveTab("register")}
                      >
                        Sign up
                      </button>
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="register" className="animate-slide-up">
                <Card className="border-none shadow-none bg-transparent">
                  <CardContent className="p-0">
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-name">Full Name</Label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <User className="h-4 w-4" />
                          </div>
                          <Input
                            id="register-name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            className="pl-10"
                            value={registerForm.name}
                            onChange={handleRegisterChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                          </div>
                          <Input
                            id="register-email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10"
                            value={registerForm.email}
                            onChange={handleRegisterChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-phone">Phone Number</Label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                          </div>
                          <Input
                            id="register-phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            className="pl-10"
                            value={registerForm.phone}
                            onChange={handleRegisterChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <Lock className="h-4 w-4" />
                          </div>
                          <Input
                            id="register-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className="pl-10"
                            value={registerForm.password}
                            onChange={handleRegisterChange}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={toggleShowPassword}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-confirm-password">Confirm Password</Label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <Lock className="h-4 w-4" />
                          </div>
                          <Input
                            id="register-confirm-password"
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="pl-10"
                            value={registerForm.confirmPassword}
                            onChange={handleRegisterChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="terms"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            required
                          />
                          <label htmlFor="terms" className="ml-2 block text-sm text-muted-foreground">
                            I agree to the{" "}
                            <Link to="#" className="text-primary hover:underline">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link to="#" className="text-primary hover:underline">
                              Privacy Policy
                            </Link>
                          </label>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? (
                          <AnimatedLoader className="mr-2" size="sm" variant="primary" />
                        ) : (
                          <UserPlus className="mr-2 h-4 w-4" />
                        )}
                        {loading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </form>
                  </CardContent>

                  <CardFooter className="flex flex-col p-0 pt-6">
                    <p className="text-center text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <button 
                        type="button" 
                        className="text-primary hover:underline font-medium" 
                        onClick={() => setActiveTab("login")}
                      >
                        Sign in
                      </button>
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Section (Image & Info) */}
        <div className="hidden sm:block sm:w-1/2 bg-primary/10 p-8">
          <div className="h-full flex flex-col justify-center max-w-md mx-auto animate-fade-in animation-delay-300">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Modern Railway Experience</h2>
              <p className="text-muted-foreground">
                Join millions of travelers who book seamless railway journeys with IRCTC
              </p>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-elevation mb-8">
              <img 
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                alt="Train" 
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Mobile App</h3>
                  <p className="text-sm text-muted-foreground">Download our mobile app for a seamless experience on the go</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Profile Management</h3>
                  <p className="text-sm text-muted-foreground">Save passenger details for quick booking in the future</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-muted-foreground">Get timely alerts about your bookings and train status</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2">
              <Link to="/" className="text-sm text-primary hover:underline flex items-center gap-1">
                <ArrowRight className="h-3 w-3" />
                <span>Return to home page</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Auth;
