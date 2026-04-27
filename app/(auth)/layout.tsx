import { Logo } from "@/components/ui/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        
        <Logo height={50} />
        
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            The Hub for <br />
            Premium IT Solutions
          </h2>
          <p className="text-primary-light text-lg max-w-md">
            Join thousands of professionals who trust YoTech for their hardware and software needs.
          </p>
        </div>
        
        <div className="relative z-10 flex items-center gap-4 text-sm font-medium">
          <p>© {new Date().getFullYear()} YoTech Systems</p>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}
