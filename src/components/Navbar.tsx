import React, { useState } from "react"

interface NavbarProps {
  onAddToWeek: () => void
}

export default function Navbar({ onAddToWeek }: NavbarProps) {
  const [activeTab, setActiveTab] = useState("All Meals")
  const tabs = ["All Meals", "Week 1", "Week 2", "Week 3", "Week 4"]

  return (
    <div className="w-full h-96">
      <h1 className="text-3xl font-bold text-gray-900 py-8 ml-64">Week Orders</h1>
      <div className="bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-32">
            <nav className="flex-1 flex justify-around">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`font-bold px-3 py-2 focus:outline-none ${
                    activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "black hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
            <button
              onClick={onAddToWeek}
              className="bg-[#0f3460] text-white px-4 py-2 ml-28 rounded-md text-sm font-bold hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0f3460]"
            >
              Add to Week
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
