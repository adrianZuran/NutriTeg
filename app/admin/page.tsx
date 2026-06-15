"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, LayoutDashboard, UtensilsCrossed, PackageOpen, LogOut, Search, Menu as MenuIcon } from "lucide-react";
import { MenuItem } from "@/types";

export default function AdminPage() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"Semua" | "Biasa" | "Paket">("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [formData, setFormData] = useState({
    nama: "",
    harga: 0,
    kalori: 0,
    gula: 0,
    protein: 0,
    lemak: 0,
    karbohidrat: 0,
    deskripsi: "",
    gambar: "",
    kategori: "Lauk"
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/check");
      if (res.ok) {
        setIsAuthenticated(true);
        fetchMenus();
      }
    } catch (e) {
      // Not authenticated
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm)
      });
      if (res.ok) {
        setIsAuthenticated(true);
        fetchMenus();
      } else {
        const data = await res.json();
        setLoginError(data.message || "Gagal login");
      }
    } catch (error) {
      setLoginError("Terjadi kesalahan server");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setMenus([]);
  };

  const fetchMenus = async () => {
    try {
      const res = await fetch("/api/menu");
      const data = await res.json();
      if (data.success) {
        setMenus(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch menus", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "nama" || name === "deskripsi" || name === "gambar" || name === "kategori" 
        ? value 
        : Number(value)
    });
  };

  const openAddModal = (tipe: "Biasa" | "Paket" = "Biasa") => {
    setEditingId(null);
    setFormData({
      nama: "", harga: 0, kalori: 0, gula: 0, protein: 0, lemak: 0, karbohidrat: 0,
      deskripsi: "", gambar: "", kategori: tipe === "Paket" ? "Paket" : "Lauk"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (menu: MenuItem) => {
    setEditingId(menu.id);
    setFormData({
      nama: menu.nama, harga: menu.harga, kalori: menu.kalori, gula: menu.gula,
      protein: menu.protein, lemak: menu.lemak, karbohidrat: menu.karbohidrat,
      deskripsi: menu.deskripsi, gambar: menu.gambar, kategori: menu.kategori
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus menu ini?")) return;
    
    try {
      const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMenus(menus.filter(m => m.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      try {
        const res = await fetch(`/api/menu/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          setMenus(menus.map(m => m.id === editingId ? { ...formData, id: editingId } as MenuItem : m));
        }
      } catch (error) {
         console.error("Failed to update", error);
      }
    } else {
      try {
        const res = await fetch("/api/menu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success) {
          setMenus([...menus, data.data]);
        }
      } catch (error) {
        console.error("Failed to add menu", error);
      }
    }
    
    setIsModalOpen(false);
  };

  if (isCheckingAuth) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-nutriteg-green-light border-t-nutriteg-green-dark"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f4f9f1] px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-nutriteg-green-lighter rounded-2xl mx-auto flex items-center justify-center mb-4">
              <LayoutDashboard className="w-8 h-8 text-nutriteg-green-dark" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-500 text-sm mt-2">Masuk untuk mengelola data menu makanan NutriTeg</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center font-medium">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
              <input 
                type="text" 
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-nutriteg-green-dark outline-none transition-all text-black" 
                required 
                placeholder="Masukkan username admin"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input 
                type="password" 
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-nutriteg-green-dark outline-none transition-all text-black" 
                required 
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-nutriteg-green-dark text-white rounded-xl py-3.5 font-bold hover:bg-nutriteg-green-darker transition-colors mt-6 shadow-md shadow-nutriteg-green-dark/20"
            >
              Masuk Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredMenus = menus.filter(m => {
    const matchesTab = activeTab === "Semua" 
      ? true 
      : activeTab === "Paket" 
        ? m.kategori === "Paket"
        : m.kategori !== "Paket";
        
    const matchesSearch = m.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (m.deskripsi && m.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()));
                          
    return matchesTab && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex bg-gray-50 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-0 lg:w-72'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col shrink-0 overflow-hidden`}>
        <div className="h-20 flex items-center px-8 border-b border-gray-100 shrink-0">
          <span className="text-2xl font-black text-nutriteg-green-dark tracking-tight">NutriTeg Admin</span>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto admin-scroll">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Menu Utama</p>
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab("Semua")}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold transition-colors ${activeTab === "Semua" ? "bg-nutriteg-green-dark text-white shadow-md shadow-nutriteg-green-dark/20" : "text-gray-500 hover:bg-gray-100"}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Semua Menu
            </button>
            <button 
              onClick={() => setActiveTab("Biasa")}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold transition-colors ${activeTab === "Biasa" ? "bg-nutriteg-green-dark text-white shadow-md shadow-nutriteg-green-dark/20" : "text-gray-500 hover:bg-gray-100"}`}
            >
              <UtensilsCrossed className="w-5 h-5" />
              Menu Biasa
            </button>
            <button 
              onClick={() => setActiveTab("Paket")}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold transition-colors ${activeTab === "Paket" ? "bg-nutriteg-green-dark text-white shadow-md shadow-nutriteg-green-dark/20" : "text-gray-500 hover:bg-gray-100"}`}
            >
              <PackageOpen className="w-5 h-5" />
              Menu Paket
            </button>
          </nav>
        </div>

        <div className="p-6 border-t border-gray-100 shrink-0">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-2xl font-bold transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 lg:hidden text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">
              {activeTab === "Semua" ? "Dashboard Menu" : `Data Menu ${activeTab}`}
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2.5 border border-gray-200 w-64">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Cari menu..." 
                className="bg-transparent border-none outline-none text-sm w-full text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-nutriteg-green-light flex items-center justify-center text-nutriteg-green-dark font-bold border-2 border-white shadow-sm">
                AD
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-bold text-gray-800">Admin NutriTeg</p>
                <p className="text-gray-500 text-xs">Superadmin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto admin-scroll p-6 lg:p-10 bg-gray-50/50">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-black text-gray-900">Kelola Menu {activeTab !== "Semua" && activeTab}</h3>
              <p className="text-gray-500 mt-1 text-sm font-medium">Anda memiliki total {filteredMenus.length} menu di kategori ini.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => openAddModal("Biasa")}
                className="flex items-center gap-2 bg-white border-2 border-nutriteg-green-dark text-nutriteg-green-dark px-5 py-2.5 rounded-xl font-bold hover:bg-nutriteg-green-light/20 transition-colors shadow-sm"
              >
                <UtensilsCrossed className="w-5 h-5" /> + Biasa
              </button>
              <button 
                onClick={() => openAddModal("Paket")}
                className="flex items-center gap-2 bg-nutriteg-green-dark text-white px-5 py-2.5 rounded-xl font-bold hover:bg-nutriteg-green-darker transition-colors shadow-sm shadow-nutriteg-green-dark/20"
              >
                <PackageOpen className="w-5 h-5" /> + Paket
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-nutriteg-green-dark"></div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50/80 text-gray-500 border-b border-gray-100">
                    <tr>
                      <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs">Menu Makanan</th>
                      <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">Kategori</th>
                      <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">Harga</th>
                      <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs">Nutrisi</th>
                      <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredMenus.map((menu) => (
                      <tr key={menu.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <img src={menu.gambar} alt={menu.nama} className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                            <div>
                               <div className="font-bold text-gray-900 text-base">{menu.nama}</div>
                               <div className="text-xs text-gray-500 truncate max-w-[220px] mt-0.5">{menu.deskripsi}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            menu.kategori === 'Paket' ? 'bg-amber-100 text-amber-700' : 
                            menu.kategori === 'Sayur' ? 'bg-green-100 text-green-700' : 
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {menu.kategori}
                          </span>
                        </td>
                        <td className="px-6 py-5 font-bold text-gray-900">
                          Rp {menu.harga.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-nutriteg-green-dark">{menu.kalori}</span>
                            <span className="text-gray-500 text-xs">Kkal</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => openEditModal(menu)}
                              className="p-2.5 text-blue-600 hover:bg-blue-50 bg-white border border-gray-100 rounded-xl transition-all shadow-sm hover:shadow"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(menu.id)}
                              className="p-2.5 text-red-600 hover:bg-red-50 bg-white border border-gray-100 rounded-xl transition-all shadow-sm hover:shadow"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredMenus.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-8 py-16 text-center">
                           <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                             <UtensilsCrossed className="w-8 h-8 text-gray-300" />
                           </div>
                           <p className="text-gray-500 font-medium">Belum ada data menu di kategori ini.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center z-10 shrink-0">
              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  {editingId ? "Edit Menu" : `Tambah Menu ${formData.kategori === 'Paket' ? 'Paket' : 'Biasa'}`}
                </h2>
                <p className="text-sm text-gray-500 mt-1">Isi form di bawah ini dengan lengkap</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-gray-50 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto admin-scroll flex-1 bg-gray-50/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">Nama Menu</label>
                  <input required type="text" name="nama" value={formData.nama} onChange={handleInputChange} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-nutriteg-green-dark focus:border-transparent outline-none transition-all shadow-sm text-black" 
                    placeholder="Contoh: Nasi Putih, Paket Hemat 1..." 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Kategori</label>
                  <select name="kategori" value={formData.kategori} onChange={handleInputChange} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-nutriteg-green-dark focus:border-transparent outline-none transition-all shadow-sm font-medium text-black"
                  >
                    <option value="Sayur">Sayur</option>
                    <option value="Lauk">Lauk</option>
                    <option value="Karbohidrat">Karbohidrat</option>
                    <option value="Sambal">Sambal</option>
                    <option value="Minuman">Minuman</option>
                    <option value="Paket">Menu Paket</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Harga (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">Rp</span>
                    <input required type="number" name="harga" value={formData.harga} onChange={handleInputChange} 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 pl-12 focus:bg-white focus:ring-2 focus:ring-nutriteg-green-dark outline-none transition-all shadow-sm text-black" 
                    />
                  </div>
                </div>

                {/* Nutrisi Group */}
                <div className="md:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mt-2">
                  <h4 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-nutriteg-green-dark"></div>
                    Informasi Nutrisi (Per Porsi / 100g)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Kalori (Kkal)</label>
                      <input required type="number" name="kalori" value={formData.kalori} onChange={handleInputChange} 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:bg-white focus:ring-2 focus:ring-nutriteg-green-dark outline-none transition-all text-center font-bold text-black" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Protein (g)</label>
                      <input required type="number" name="protein" value={formData.protein} onChange={handleInputChange} 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:bg-white focus:ring-2 focus:ring-nutriteg-green-dark outline-none transition-all text-center font-bold text-black" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Lemak (g)</label>
                      <input required type="number" name="lemak" value={formData.lemak} onChange={handleInputChange} 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:bg-white focus:ring-2 focus:ring-nutriteg-green-dark outline-none transition-all text-center font-bold text-black" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Karbo (g)</label>
                      <input required type="number" name="karbohidrat" value={formData.karbohidrat} onChange={handleInputChange} 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:bg-white focus:ring-2 focus:ring-nutriteg-green-dark outline-none transition-all text-center font-bold text-black" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">Gambar Menu</label>
                  <div className="flex items-center gap-4">
                    {formData.gambar && (
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-200">
                        <img src={formData.gambar} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          
                          const formDataData = new FormData();
                          formDataData.append('file', file);
                          
                          try {
                            const res = await fetch('/api/upload', { method: 'POST', body: formDataData });
                            const data = await res.json();
                            if (data.success) {
                              setFormData(prev => ({ ...prev, gambar: data.url }));
                            } else {
                              alert("Gagal upload gambar");
                            }
                          } catch (err) {
                            alert("Terjadi kesalahan saat upload");
                          }
                        }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:bg-white focus:ring-2 focus:ring-nutriteg-green-dark outline-none transition-all shadow-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-nutriteg-green-light/20 file:text-nutriteg-green-dark hover:file:bg-nutriteg-green-light/40" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">Deskripsi</label>
                  <textarea required name="deskripsi" value={formData.deskripsi} onChange={handleInputChange} rows={3} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-nutriteg-green-dark outline-none transition-all shadow-sm resize-none text-black" 
                    placeholder="Jelaskan detail menu ini..."
                  ></textarea>
                </div>
              </div>
              
              <div className="pt-8 border-t border-gray-100 flex justify-end gap-3 shrink-0 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} 
                  className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-200 bg-gray-100 transition-colors"
                >
                  Batal
                </button>
                <button type="submit" 
                  className="px-8 py-3 rounded-xl font-bold bg-nutriteg-green-dark text-white hover:bg-nutriteg-green-darker transition-colors shadow-lg shadow-nutriteg-green-dark/30 flex items-center gap-2"
                >
                  Simpan Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
