import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <span className="block text-accent text-sm font-semibold tracking-widest uppercase mb-4">
          404
        </span>
        <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-dark">
          Page Not Found
        </h1>
        <p className="mt-4 text-body leading-relaxed">
          The page you are looking for does not exist or has been moved.
          Please check the URL or navigate back to our homepage.
        </p>
        <div className="mt-8">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
