export default function UnauthorizedPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-700 text-center max-w-md">
          Sorry, you do not have permission to view this page. Please contact your administrator if you believe this is a mistake.
        </p>
      </div>
    );
  }
  