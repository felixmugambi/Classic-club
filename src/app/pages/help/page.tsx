export default function Help() {
    return (
      <div className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-4">Help & Support</h1>
        <p className="text-gray-600 mb-6">
          Need assistance? We’re here to help! Check out our frequently asked questions or contact our support team.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Login or account issues? Contact: <a href="mailto:support@classicfc.com" className="text-blue-600 hover:underline">support@classicfc.com</a></li>
          <li>Ticketing queries: <a href="mailto:tickets@classicfc.com" className="text-blue-600 hover:underline">tickets@classicfc.com</a></li>
          <li>Fan shop inquiries: <a href="mailto:shop@classicfc.com" className="text-blue-600 hover:underline">shop@classicfc.com</a></li>
        </ul>
      </div>
    );
  }
  