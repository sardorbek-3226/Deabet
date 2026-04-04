import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaTrash,
  FaEdit,
  FaSearch,
  FaCalendarAlt,
  FaFire,
  FaTasks,
  FaFilter,
  FaRedo,
} from "react-icons/fa";

const defaultTasks = [
  {
    id: 1,
    title: "Ertalab qandni o‘lchash",
    category: "Salomatlik",
    priority: "high",
    time: "07:30",
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "30 daqiqa yurish",
    category: "Fitness",
    priority: "medium",
    time: "18:00",
    done: false,
    createdAt: new Date().toISOString(),
  },
];

export default function RoutinePage() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("advanced-routine-tasks");
    return saved ? JSON.parse(saved) : defaultTasks;
  });

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("Salomatlik");

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("advanced-routine-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const isOverdue = (task) => {
    if (!task.time || task.done) return false;

    const now = new Date();
    const [hours, minutes] = task.time.split(":").map(Number);

    const taskDate = new Date();
    taskDate.setHours(hours, minutes, 0, 0);

    return now > taskDate && !task.done;
  };

  const handleAddOrUpdate = () => {
    if (!title.trim()) return;

    if (editingId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingId
            ? {
                ...task,
                title,
                time,
                priority,
                category,
              }
            : task
        )
      );
      setEditingId(null);
    } else {
      const newTask = {
        id: Date.now(),
        title,
        time,
        priority,
        category,
        done: false,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
    }

    setTitle("");
    setTime("");
    setPriority("medium");
    setCategory("Salomatlik");
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setTime(task.time || "");
    setPriority(task.priority);
    setCategory(task.category);
  };

  const handleToggleDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.done));
  };

  const handleResetAll = () => {
    setTasks([]);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        filterCategory === "all" || task.category === filterCategory;

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "done" && task.done) ||
        (filterStatus === "pending" && !task.done && !isOverdue(task)) ||
        (filterStatus === "overdue" && isOverdue(task));

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [tasks, search, filterCategory, filterStatus]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.done).length;
    const pending = tasks.filter((t) => !t.done && !isOverdue(t)).length;
    const overdue = tasks.filter((t) => isOverdue(t)).length;
    const progress = total ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      overdue,
      progress,
    };
  }, [tasks]);

  const getPriorityStyle = (p) => {
    if (p === "high") {
      return "bg-red-100 text-red-700 border border-red-200";
    }
    if (p === "medium") {
      return "bg-amber-100 text-amber-700 border border-amber-200";
    }
    return "bg-emerald-100 text-emerald-700 border border-emerald-200";
  };

  const getCategoryStyle = (c) => {
    if (c === "Salomatlik") return "bg-sky-100 text-sky-700";
    if (c === "Fitness") return "bg-emerald-100 text-emerald-700";
    if (c === "Ovqat") return "bg-orange-100 text-orange-700";
    return "bg-violet-100 text-violet-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-md border border-gray-100 hover:bg-gray-50 transition"
        >
          <FaArrowLeft />
          Ortga qaytish
        </button>

        <div className="rounded-[32px] bg-white/90 backdrop-blur-md border border-white/70 shadow-xl p-6 md:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
                <FaTasks />
                Smart Routine System
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Kunlik Rutina Dashboard
              </h1>
              <p className="text-gray-600 mt-3 max-w-2xl leading-relaxed">
                Vazifalarni qo‘shing, tahrirlang, ustuvorlik belgilang,
                vaqtini belgilang va kunlik intizomingizni professional tarzda
                boshqaring.
              </p>
            </div>

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-3xl shadow-lg">
              <FaFire />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Jami task</p>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {stats.total}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Bajarilgan</p>
            <h2 className="text-3xl font-extrabold text-emerald-600">
              {stats.completed}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Jarayonda</p>
            <h2 className="text-3xl font-extrabold text-sky-600">
              {stats.pending}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Kechikkan</p>
            <h2 className="text-3xl font-extrabold text-red-600">
              {stats.overdue}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Progress</p>
            <h2 className="text-3xl font-extrabold text-violet-600">
              {stats.progress}%
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">Kunlik progress</h3>
            <span className="text-sm font-semibold text-violet-700">
              {stats.progress}% yakunlangan
            </span>
          </div>

          <div className="h-4 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 transition-all duration-500"
              style={{ width: `${stats.progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-1 bg-white rounded-[28px] p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-5">
              {editingId ? "Vazifani tahrirlash" : "Yangi vazifa qo‘shish"}
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masalan: Dorini ichish"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-400"
              />

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-400"
              />

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-400"
              >
                <option value="low">Low priority</option>
                <option value="medium">Medium priority</option>
                <option value="high">High priority</option>
              </select>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-400"
              >
                <option value="Salomatlik">Salomatlik</option>
                <option value="Fitness">Fitness</option>
                <option value="Ovqat">Ovqat</option>
                <option value="Shaxsiy">Shaxsiy</option>
              </select>

              <button
                onClick={handleAddOrUpdate}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 font-semibold shadow-md hover:scale-[1.01] transition"
              >
                {editingId ? <FaEdit /> : <FaPlus />}
                {editingId ? "Yangilash" : "Qo‘shish"}
              </button>

              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setTitle("");
                    setTime("");
                    setPriority("medium");
                    setCategory("Salomatlik");
                  }}
                  className="w-full rounded-2xl bg-gray-100 text-gray-700 py-3 font-semibold hover:bg-gray-200 transition"
                >
                  Bekor qilish
                </button>
              )}
            </div>
          </div>

          <div className="xl:col-span-2 bg-white rounded-[28px] p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Task qidirish..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>

              <div className="flex gap-3 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="rounded-2xl border border-gray-200 px-4 py-3 outline-none"
                >
                  <option value="all">Barcha status</option>
                  <option value="done">Bajarilgan</option>
                  <option value="pending">Jarayonda</option>
                  <option value="overdue">Kechikkan</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="rounded-2xl border border-gray-200 px-4 py-3 outline-none"
                >
                  <option value="all">Barcha kategoriya</option>
                  <option value="Salomatlik">Salomatlik</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Ovqat">Ovqat</option>
                  <option value="Shaxsiy">Shaxsiy</option>
                </select>
              </div>
            </div>

            {filteredTasks.length === 0 ? (
              <div className="rounded-3xl border-2 border-dashed border-gray-200 p-10 text-center">
                <div className="text-4xl mb-3">🗂️</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Hozircha mos task topilmadi
                </h4>
                <p className="text-gray-500">
                  Yangi task qo‘shing yoki filterlarni o‘zgartiring.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => {
                  const overdue = isOverdue(task);

                  return (
                    <div
                      key={task.id}
                      className={`rounded-[24px] p-5 border shadow-sm hover:shadow-md transition ${
                        task.done
                          ? "bg-emerald-50 border-emerald-200"
                          : overdue
                          ? "bg-red-50 border-red-200"
                          : "bg-gray-50 border-gray-100"
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <h3
                              className={`text-lg font-bold ${
                                task.done
                                  ? "line-through text-gray-500"
                                  : "text-gray-900"
                              }`}
                            >
                              {task.title}
                            </h3>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryStyle(
                                task.category
                              )}`}
                            >
                              {task.category}
                            </span>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityStyle(
                                task.priority
                              )}`}
                            >
                              {task.priority}
                            </span>

                            {overdue && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                                Overdue
                              </span>
                            )}

                            {task.done && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                                Done
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            {task.time && (
                              <span className="inline-flex items-center gap-2">
                                <FaClock />
                                {task.time}
                              </span>
                            )}

                            <span className="inline-flex items-center gap-2">
                              <FaCalendarAlt />
                              {new Date(task.createdAt).toLocaleDateString("uz-UZ")}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleToggleDone(task.id)}
                            className={`px-4 py-2 rounded-xl font-medium transition ${
                              task.done
                                ? "bg-gray-900 text-white hover:bg-black"
                                : "bg-emerald-600 text-white hover:bg-emerald-700"
                            }`}
                          >
                            <span className="inline-flex items-center gap-2">
                              <FaCheckCircle />
                              {task.done ? "Qaytarish" : "Bajarildi"}
                            </span>
                          </button>

                          <button
                            onClick={() => handleEdit(task)}
                            className="px-4 py-2 rounded-xl bg-violet-100 text-violet-700 hover:bg-violet-200 transition font-medium"
                          >
                            <span className="inline-flex items-center gap-2">
                              <FaEdit />
                              Tahrirlash
                            </span>
                          </button>

                          <button
                            onClick={() => handleDelete(task.id)}
                            className="px-4 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition font-medium"
                          >
                            <span className="inline-flex items-center gap-2">
                              <FaTrash />
                              O‘chirish
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-[28px] p-6 shadow-md border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <FaFilter className="text-violet-600" />
              <h3 className="text-xl font-bold text-gray-900">
                Smart Insight
              </h3>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Sizning kunlik rutinangiz endi oddiy task list emas. Bu tizim
              vazifalarni ustuvorlik, kategoriya, vaqt va bajarilish holatiga
              qarab boshqaradi. Bu yondashuv real product UX’ga yaqin bo‘lib,
              foydalanuvchiga tartibli va intizomli hayot yuritishga yordam beradi.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-violet-950 text-white rounded-[28px] p-6 shadow-lg">
            <p className="text-sm text-violet-200 mb-2">Smart Summary</p>
            <h3 className="text-2xl font-bold mb-3">
              {stats.completed}/{stats.total} task
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-5">
              Bugungi umumiy bajarilish darajasi {stats.progress}% ni tashkil
              qildi. Kechikkan tasklar soni: {stats.overdue}.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleClearCompleted}
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-gray-900 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition"
              >
                <FaCheckCircle />
                Bajarilganlarni tozalash
              </button>

              <button
                onClick={handleResetAll}
                className="w-full inline-flex items-center justify-center gap-2 bg-violet-700 text-white py-3 rounded-2xl font-semibold hover:bg-violet-800 transition"
              >
                <FaRedo />
                Hammasini reset qilish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}