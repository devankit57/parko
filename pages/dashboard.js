import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import { Home, MapPin, Car, Settings, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // 🛠 FIXED: Hooks must be at the top level, before any conditional return
  const [activeTab, setActiveTab] = useState("home");
  const [showPlanPopup, setShowPlanPopup] = useState(false);
  const [tripDetails, setTripDetails] = useState({
    destination: "",
    days: "",
    notes: "",
  });
  const [parkingSubTab, setParkingSubTab] = useState("search");
  const [loading, setLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null); 

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/");
    }
  }, [session, status, router]);

  // ✅ FIXED: Hooks are initialized at the top, so we can return safely now
  if (!session) return null;

  const menuItems = [
    { name: "Home", icon: <Home size={24} />, key: "home" },
    { name: "Plan Trip", icon: <MapPin size={24} />, key: "plan" },
    { name: "Parking", icon: <Car size={24} />, key: "parking" },
    { name: "Settings", icon: <Settings size={24} />, key: "settings" },
  ];
  // Default sub-tab for parking
  const handlePlanSubmit = async () => {
    setLoading(true);
    setError("");
    setTravelPlan("");

    try {
      const response = await fetch("/api/travel-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripDetails),
      });

      const data = await response.json();
      if (response.ok) {
        setTravelPlan(data.plan);
      } else {
        setError("Error fetching plan. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch("/api/travel-history");
      const data = await response.json();
      if (response.ok) {
        setHistory(data.history);
      } else {
        setError("Error fetching history.");
      }
    } catch (error) {
      setError("Network error. Could not fetch history.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-800 p-6 space-y-6">
        <h2 className="text-2xl font-bold">Parko</h2>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 w-full ${
                activeTab === item.key ? "bg-indigo-600" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab(item.key)}
            >
              {item.icon}
              <span className="text-lg">{item.name}</span>
            </button>
          ))}
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 p-3 text-red-400 hover:text-red-500 transition-all"
          >
            <LogOut size={24} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Mobile Nav */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Parko</h2>
          <div className="flex gap-3">
            {menuItems.map((item) => (
              <button
                key={item.key}
                className={`p-2 rounded-full ${
                  activeTab === item.key ? "bg-indigo-600" : "hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab(item.key)}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {activeTab === "home" && (
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Welcome to Parko</h3>
              <p className="text-gray-400 mt-2">Plan your trips and manage parking easily.</p>
            </div>
          )}

          {activeTab === "plan" && (
            <>
              <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold">Plan Your Trip</h3>
                <p className="text-gray-400 mt-2">
                  Find the best route and get real-time traffic updates.
                </p>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => setShowPlanPopup(true)}
                    className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-500"
                  >
                    Plan Travel
                  </button>
                  <button
  onClick={fetchHistory}
  className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
>
  Plan History
</button>


                </div>
              </div>

              {/* Destination Selection & Dropdown */}
              {history.length > 0 && (
                <div className="p-6 bg-gray-800 rounded-lg shadow-lg mt-4">
                  <h3 className="text-xl font-semibold">Your Saved Travel Plans</h3>
                  
                  {/* Dropdown to Select Travel Plan */}
                  <select
                    className="mt-3 p-2 w-full bg-gray-700 rounded-lg text-white"
                    onChange={(e) => {
                      const selected = history.find(plan => plan._id === e.target.value);
                      setSelectedPlan(selected);
                    }}
                  >
                    <option value="">Select a plan...</option>
                    {history.map((plan) => (
                      <option key={plan._id} value={plan._id}>
                        {plan.destination} - {new Date(plan.createdAt).toLocaleDateString()}
                      </option>
                    ))}
                  </select>

                  {/* Display Selected Travel Plan */}
                  {selectedPlan && (
                    <div className="mt-4 p-4 bg-gray-700 rounded-lg shadow-md">
                      <h4 className="text-lg font-semibold">Destination: {selectedPlan.destination}</h4>
                      <p><strong>Days:</strong> {selectedPlan.days}</p>
                      <p><strong>Notes:</strong> {selectedPlan.notes || "No notes"}</p>
                      <p><strong>Date:</strong> {new Date(selectedPlan.createdAt).toLocaleString()}</p>
                      <div
                        className="mt-2 text-gray-300 leading-relaxed text-lg"
                        dangerouslySetInnerHTML={{ __html: selectedPlan.planHtml }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Travel Plan Response Card */}
              {travelPlan && (
                <div className="p-6 bg-gray-800 rounded-lg shadow-lg mt-4">
                  <h3 className="text-xl font-semibold mb-4">Your Travel Plan</h3>
                  <div
                    className="text-gray-300 leading-relaxed text-lg"
                    style={{ lineHeight: "2", letterSpacing: "0.5px" }}
                    dangerouslySetInnerHTML={{ __html: travelPlan }}
                  />
                </div>
              )}

              
            </>
          )}
{/* Parking Section */}
{activeTab === "parking" && (
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Parking System</h3>
              <p className="text-gray-400 mt-2">
                Search for parking, view invoices, and check history.
              </p>

              {/* Parking Submenu */}
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => setParkingSubTab("search")}
                  className={`px-4 py-2 rounded-lg ${
                    parkingSubTab === "search" ? "bg-indigo-600" : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  Search
                </button>
                <button
                  onClick={() => setParkingSubTab("invoice")}
                  className={`px-4 py-2 rounded-lg ${
                    parkingSubTab === "invoice" ? "bg-indigo-600" : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  Invoice
                </button>
                <button
                  onClick={() => setParkingSubTab("history")}
                  className={`px-4 py-2 rounded-lg ${
                    parkingSubTab === "history" ? "bg-indigo-600" : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  History
                </button>
              </div>

              {/* Parking Submenu Content */}
              <div className="mt-6">
                {parkingSubTab === "search" && (
                  <div>
                    <h4 className="text-lg font-semibold">Search for Parking</h4>
                    <p className="text-gray-400 mt-2">Find available parking spots in your area.</p>
                    {/* Add search functionality here */}
                  </div>
                )}

                {parkingSubTab === "invoice" && (
                  <div>
                    <h4 className="text-lg font-semibold">Parking Invoices</h4>
                    <p className="text-gray-400 mt-2">View and manage your parking invoices.</p>
                    {/* Add invoice retrieval logic here */}
                  </div>
                )}

                {parkingSubTab === "history" && (
                  <div>
                    <h4 className="text-lg font-semibold">Parking History</h4>
                    <p className="text-gray-400 mt-2">Check your past parking records.</p>
                    {/* Add history fetching logic here */}
                  </div>
                )}
              </div>
            </div>
          )}

{activeTab === "settings" && (
  <div className="p-6 bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto relative overflow-hidden w-full md:max-w-lg lg:max-w-xl">
    {/* Background Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 opacity-75 blur-lg" />

    {/* User Profile */}
    <div className="relative z-10 flex flex-col items-center">
      <img
        src={session?.user?.image || "/default-avatar.png"} // Default avatar
        alt="User Avatar"
        className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-indigo-500 shadow-lg"
      />
      <h3 className="text-2xl font-semibold text-white mt-4 text-center">
        {session?.user?.name || "Guest User"}
      </h3>
      <p className="text-gray-400 text-sm">{session?.user?.email || "N/A"}</p>
    </div>

    {/* User Details */}
    <div className="relative z-10 mt-6 space-y-4 bg-gray-900/50 p-6 rounded-lg shadow-md text-gray-300 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <span className="text-indigo-400 text-lg font-medium">👤 Name:</span>
        <span className="text-white">{session?.user?.name || "N/A"}</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <span className="text-indigo-400 text-lg font-medium">📧 Email:</span>
        <span className="text-white">{session?.user?.email || "N/A"}</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <span className="text-indigo-400 text-lg font-medium">🎂 DOB:</span>
        <span className="text-white">{session?.user?.dob || "Not Available"}</span>
      </div>
    </div>

    {/* Logout Button */}
    <div className="relative z-10 mt-6 flex justify-center">
      <button
        onClick={() => signOut()}
        className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-6 rounded-full transition-all shadow-lg w-full md:w-auto"
      >
        Logout 🚀
      </button>
    </div>
  </div>
)}

        </motion.div>
      </div>

      {/* Plan Travel Popup */}
      {showPlanPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Plan Your Trip</h3>
            <input
              type="text"
              placeholder="Destination"
              className="w-full p-2 mb-2 rounded bg-gray-700"
              onChange={(e) =>
                setTripDetails({ ...tripDetails, destination: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Days"
              className="w-full p-2 mb-2 rounded bg-gray-700"
              onChange={(e) => setTripDetails({ ...tripDetails, days: e.target.value })}
            />
            <textarea
              placeholder="Additional Notes"
              className="w-full p-2 mb-2 rounded bg-gray-700"
              onChange={(e) => setTripDetails({ ...tripDetails, notes: e.target.value })}
            ></textarea>
            <button
              onClick={handlePlanSubmit}
              className="w-full bg-indigo-600 p-2 rounded-lg hover:bg-indigo-500"
            >
              {loading ? "Planning..." : "Get Plan"}
            </button>
            {error && <p className="mt-2 text-red-400">{error}</p>}
            <button onClick={() => setShowPlanPopup(false)} className="mt-2 text-red-400">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
