import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogOut, Plus, Trash2, Edit, X, ArrowLeft, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list"); // 'list' or 'edit'
  
  // Product State
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: "", description: "", main_image: "", category_id: 1, features: "", specifications: "", applications: "" });
  
  // Spare Parts State
  const [spares, setSpares] = useState([]);
  const [isSpareModalOpen, setIsSpareModalOpen] = useState(false);
  const [editingSpareId, setEditingSpareId] = useState(null);
  const [spareForm, setSpareForm] = useState({ part_name: "", description: "", image_path: "" });

  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) navigate("/admin");
    else fetchProducts();
  }, [token, navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data.data || []);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const fetchProductDetails = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      const p = res.data.data;
      setCurrentProduct(p);
      setSpares(p.spares || []);
      setProductForm({
        name: p.name, 
        description: p.description, 
        main_image: p.main_image, // 🟢 image_url થી main_image કર્યું
        category_id: p.category_id, 
        features: Array.isArray(p.features) ? p.features.join(", ") : "",
        specifications: p.specifications ? JSON.stringify(p.specifications) : "",
        applications: Array.isArray(p.applications) ? p.applications.join(", ") : ""
      });
      setView("edit");
    } catch (error) { alert("Error fetching details"); } finally { setLoading(false); }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        name: productForm.name,
        description: productForm.description,
        main_image: productForm.main_image, // 🟢 main_image મોકલો
        category_id: productForm.category_id,
        features: productForm.features.split(",").map(s => s.trim()).filter(Boolean),
        specifications: productForm.specifications ? JSON.parse(productForm.specifications) : {},
        applications: productForm.applications.split(",").map(s => s.trim()).filter(Boolean)
      };

      if (currentProduct) {
        await axios.put(`http://localhost:5000/api/products/${currentProduct.id}`, payload);
      } else {
        await axios.post("http://localhost:5000/api/products", payload);
      }
      alert("Product Saved Successfully!");
      setView("list");
      fetchProducts();
    } catch (error) { 
      console.error("Save Error:", error.response?.data || error.message);
      alert("Error saving product: " + (error.response?.data?.message || error.message)); 
    } finally { setLoading(false); }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Delete this product and all its spare parts?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        alert("Error deleting product");
      }
    }
  };

  // --- SPARE PARTS ACTIONS ---
  const handleSaveSpare = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingSpareId) {
        await axios.put(`http://localhost:5000/api/spares/${editingSpareId}`, spareForm);
      } else {
        await axios.post("http://localhost:5000/api/spares", { ...spareForm, product_id: currentProduct.id });
      }
      setIsSpareModalOpen(false);
      fetchProductDetails(currentProduct.id);
    } catch (error) { alert("Error saving spare part"); } finally { setLoading(false); }
  };

  const handleDeleteSpare = async (id) => {
    if (window.confirm("Delete this spare part?")) {
      try {
        await axios.delete(`http://localhost:5000/api/spares/${id}`);
        fetchProductDetails(currentProduct.id);
      } catch (error) { alert("Error deleting spare part"); }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-mist p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            {view === "edit" && (
              <button onClick={() => setView("list")} className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"><ArrowLeft size={20} /></button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-navy font-display">
                {view === "list" ? "Manage Products" : `Editing: ${currentProduct?.name}`}
              </h1>
              <p className="text-sm text-gray-500">Add, Edit, and Delete Products & Spare Parts.</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded-md transition-all"><LogOut size={18} /> Logout</button>
        </div>

        {loading && (
          <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <Loader2 className="animate-spin text-brand" size={48} />
          </div>
        )}

        {view === "list" && (
          <>
            <button onClick={() => { setCurrentProduct(null); setProductForm({ name: "", description: "", main_image: "", category_id: 1, features: "", specifications: "", applications: "" }); setView("edit"); }} className="mb-6 bg-brand text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold hover:bg-brand-dark transition shadow-lg shadow-brand/20">
              <Plus size={18}/> Add New Product
            </button>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-navy text-white text-sm">
                  <tr><th className="p-4">Image</th><th className="p-4">Product Name</th><th className="p-4">Category</th><th className="p-4 text-center">Actions</th></tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b hover:bg-mist/50">
                      <td className="p-4"><img src={p.main_image} className="w-16 h-12 object-cover rounded" alt="" /></td>
                      <td className="p-4 font-semibold text-navy">{p.name}</td>
                      <td className="p-4 text-sm text-gray-500">{p.category_name}</td>
                      <td className="p-4 flex items-center justify-center gap-2">
                        <button onClick={() => fetchProductDetails(p.id)} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 flex items-center gap-1 text-sm font-medium"><Edit size={16}/> Edit & Manage Parts</button>
                        <button onClick={() => handleDeleteProduct(p.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md"><Trash2 size={18}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {view === "edit" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-navy mb-4">Product Details</h2>
              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Product Name</label>
                  <input required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="text-sm font-medium">Main Image URL</label>
                  <input required value={productForm.main_image} onChange={e => setProductForm({...productForm, main_image: e.target.value})} className="w-full border p-2 rounded" placeholder="/images/your-image.jpeg" />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <textarea required value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} className="w-full border p-2 rounded h-24" />
                </div>
                <div>
                  <label className="text-sm font-medium">Category ID (1: Plants, 2: Pavers, 3: Concrete, 4: Rollers)</label>
                  <input type="number" required value={productForm.category_id} onChange={e => setProductForm({...productForm, category_id: parseInt(e.target.value)})} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="text-sm font-medium">Features (Comma Separated)</label>
                  <input value={productForm.features} onChange={e => setProductForm({...productForm, features: e.target.value})} className="w-full border p-2 rounded" placeholder="High capacity, Durable" />
                </div>
                <div>
                  <label className="text-sm font-medium">Specifications (JSON Format)</label>
                  <textarea value={productForm.specifications} onChange={e => setProductForm({...productForm, specifications: e.target.value})} className="w-full border p-2 rounded h-20" placeholder='{"Capacity": "100 TPH"}' />
                </div>
                <div>
                  <label className="text-sm font-medium">Applications (Comma Separated)</label>
                  <input value={productForm.applications} onChange={e => setProductForm({...productForm, applications: e.target.value})} className="w-full border p-2 rounded" placeholder="Roads, Highways" />
                </div>
                <button type="submit" className="w-full bg-brand text-white py-3 rounded font-bold hover:bg-brand-dark">Save Product</button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-navy">Spare Parts</h2>
                {currentProduct && (
                  <button onClick={() => { setEditingSpareId(null); setSpareForm({ part_name: "", description: "", image_path: "" }); setIsSpareModalOpen(true); }} className="bg-navy text-white px-3 py-1.5 rounded text-sm flex items-center gap-1 hover:bg-navy-deep"><Plus size={16}/> Add Part</button>
                )}
              </div>
              
              {!currentProduct ? (
                <p className="text-gray-500 text-center py-10">Save the product first to add spare parts.</p>
              ) : (
                <div className="space-y-3">
                  {spares.map(s => (
                    <div key={s.id} className="flex items-center gap-4 p-3 border rounded-lg hover:shadow-sm">
                      <img src={s.image_path} className="w-12 h-12 object-cover rounded" alt="" />
                      <div className="flex-grow">
                        <h4 className="font-bold text-navy">{s.part_name}</h4>
                        <p className="text-xs text-gray-500 line-clamp-1">{s.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingSpareId(s.id); setSpareForm({ part_name: s.part_name, description: s.description, image_path: s.image_path }); setIsSpareModalOpen(true); }} className="text-blue-500 p-1.5 hover:bg-blue-50 rounded"><Edit size={16}/></button>
                        <button onClick={() => handleDeleteSpare(s.id)} className="text-red-500 p-1.5 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                      </div>
                    </div>
                  ))}
                  {spares.length === 0 && <p className="text-gray-400 text-center py-4">No spare parts added yet.</p>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isSpareModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl relative">
            <button onClick={() => setIsSpareModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><X size={24}/></button>
            <h2 className="text-xl font-bold text-navy mb-4">{editingSpareId ? "Edit Spare Part" : "Add Spare Part"}</h2>
            <form onSubmit={handleSaveSpare} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Part Name</label>
                <input required value={spareForm.part_name} onChange={e => setSpareForm({...spareForm, part_name: e.target.value})} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="text-sm font-medium">Image URL</label>
                <input required value={spareForm.image_path} onChange={e => setSpareForm({...spareForm, image_path: e.target.value})} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="text-sm font-medium">Short Description</label>
                <textarea required value={spareForm.description} onChange={e => setSpareForm({...spareForm, description: e.target.value})} className="w-full border p-2 rounded h-20" />
              </div>
              <button type="submit" className="w-full bg-brand text-white py-2.5 rounded font-bold hover:bg-brand-dark">{editingSpareId ? "Update Part" : "Save Part"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
