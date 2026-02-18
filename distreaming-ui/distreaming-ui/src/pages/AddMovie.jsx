import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addMovie, getCategories } from "../services/api"; // Pastikan import ini benar

const AddMovie = () => {
  const navigate = useNavigate();

  // State untuk menyimpan data inputan
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    release_year: "",
    rating: "",
    thumbnail: "",
    category_id: "", // Untuk dropdown
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Ambil data kategori saat halaman dibuka
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data.data); // Sesuaikan dengan respon backend
      } catch (err) {
        console.error("Gagal ambil kategori", err);
      }
    };
    fetchCategories();
  }, []);

  // Handle perubahan input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await addMovie(formData);
      navigate("/home"); // Sukses -> Balik ke Home
    } catch (err) {
      console.error(err);
      setError("Gagal menambahkan film. Pastikan semua data terisi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form" style={{ maxWidth: "600px" }}>
        {" "}
        {/* Lebih lebar dikit dari login */}
        <h2>Tambah Film Baru</h2>
        {error && <div className="error-box">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Judul */}
          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Judul Film (Ex: Avengers)"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Deskripsi */}
          <div className="form-group">
            <textarea
              name="description"
              placeholder="Sinopsis / Deskripsi Film..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="custom-textarea"
            ></textarea>
          </div>

          {/* Tahun & Rating (Sebelah-sebelahan) */}
          <div style={{ display: "flex", gap: "15px" }}>
            <input
              type="number"
              name="release_year"
              placeholder="Tahun (Ex: 2024)"
              value={formData.release_year}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              step="0.1" // Supaya bisa koma (Ex: 8.5)
              name="rating"
              placeholder="Rating (0-10)"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>

          {/* URL Gambar */}
          <div className="form-group">
            <input
              type="url"
              name="thumbnail"
              placeholder="URL Poster (https://...)"
              value={formData.thumbnail}
              onChange={handleChange}
              required
            />
          </div>

          {/* Dropdown Kategori */}
          <div className="form-group">
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              className="custom-select"
            >
              <option value="">-- Pilih Genre / Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="cta-btn" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Film"}
          </button>

          <button
            type="button"
            className="btn-secondary"
            style={{ marginTop: "10px", width: "100%" }}
            onClick={() => navigate("/home")}
          >
            Batal
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
