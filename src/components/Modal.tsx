import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (selectedWeek: string) => void
}

export default function Modal({ isOpen, onClose, onSave }: ModalProps) {
  const [selectedWeek, setSelectedWeek] = useState("Week 1")

  if (!isOpen) return null

  const handleSave = () => {
    onSave(selectedWeek)
    onClose()
  }

  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Select Week</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="flex justify-between mb-6">
          {weeks.map((week) => (
            <button
              key={week}
              onClick={() => setSelectedWeek(week)}
              className={`px-4 py-2 rounded-md ${
                selectedWeek === week ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {week}
            </button>
          ))}
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-[#0f3460] text-white py-2 rounded-md hover:bg-opacity-90 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}
