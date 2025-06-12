import { useState } from "react";
import { ChevronRight, ChevronLeft, Plus, Trash2, Check } from "lucide-react";

export default function PlannerSidebar() {
  const [open, setOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      setAssignments([
        ...assignments,
        { id: Date.now(), text: input.trim(), done: false },
      ]);
      setInput("");
    }
  };

  const handleDelete = (id) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  const handleCheck = (id) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, done: !a.done } : a));
  };

  // Button style matches your music/focus buttons (transparent/blurred)
  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end">
      {/* Mini Sidebar Button */}
      {!open && (
        <button
          className="backdrop-blur-md bg-black/30 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-all shadow-lg flex items-center"
          onClick={() => setOpen(true)}
          aria-label="Open Planner"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}
      {/* Sidebar */}
      {open && (
        <div className="flex items-end">
          <div
            className="backdrop-blur-lg bg-black/50 border border-white/10 rounded-2xl shadow-2xl p-5 w-80 max-w-xs mr-2 transition-all"
            style={{ minHeight: 260 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-white">Planner</span>
              <button
                className="p-1 rounded hover:bg-white/10"
                onClick={() => setOpen(false)}
                aria-label="Close Planner"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
            </div>
            {/* Assignment Input */}
            <div className="flex mb-3">
              <input
                type="text"
                className="flex-1 bg-white/5 border border-white/10 rounded-l-lg px-3 py-1 text-white placeholder:text-white/60 outline-none"
                placeholder="Add assignment…"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAdd()}
              />
              <button
                className="bg-emerald-500/80 hover:bg-emerald-500 transition p-2 rounded-r-lg"
                onClick={handleAdd}
                aria-label="Add Assignment"
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
            {/* Assignment List */}
            <ul className="space-y-2 max-h-44 overflow-y-auto">
              {assignments.length === 0 && (
                <li className="text-white/40 text-sm text-center">No assignments yet</li>
              )}
              {assignments.map(a => (
                <li key={a.id} className="flex items-center group">
                  <button
                    onClick={() => handleCheck(a.id)}
                    className={`mr-2 p-1 rounded-full border border-white/10 ${a.done ? "bg-emerald-500/70" : "bg-white/10"} transition`}
                    aria-label="Toggle Complete"
                  >
                    {a.done ? <Check className="w-4 h-4 text-white" /> : <div className="w-4 h-4" />}
                  </button>
                  <span className={`flex-1 text-white ${a.done ? "line-through opacity-60" : ""}`}>{a.text}</span>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="ml-2 p-1 rounded hover:bg-red-500/30"
                    aria-label="Delete Assignment"
                  >
                    <Trash2 className="w-4 h-4 text-white opacity-70 group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
