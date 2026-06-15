CREATE DATABASE IF NOT EXISTS nutriteg_db;

USE nutriteg_db;

CREATE TABLE IF NOT EXISTS menus (
  id VARCHAR(50) PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  harga INT NOT NULL,
  kalori INT NOT NULL,
  gula INT NOT NULL,
  protein INT NOT NULL,
  lemak INT NOT NULL,
  karbohidrat INT NOT NULL,
  deskripsi TEXT,
  gambar TEXT,
  kategori VARCHAR(100) NOT NULL
);

-- Contoh Data Awal (Dummy Data)
INSERT INTO menus (id, nama, harga, kalori, gula, protein, lemak, karbohidrat, deskripsi, gambar, kategori) VALUES
('1', 'Tempe Orek Kering', 5000, 150, 5, 10, 8, 12, 'Potongan tempe yang dimasak kering dengan bumbu kecap manis, sedikit pedas, dan gurih.', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&q=80', 'Lauk'),
('2', 'Nasi Merah Porsi Pas', 6000, 110, 1, 3, 1, 23, 'Nasi merah organik yang dikukus pulen, kaya serat dan baik untuk pencernaan.', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80', 'Karbohidrat'),
('3', 'Ayam Goreng Rempah Bali', 15000, 350, 2, 25, 20, 5, 'Ayam goreng dengan bumbu rempah khas Bali, rasanya gurih, sedikit pedas, dan harum.', 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300&q=80', 'Lauk'),
('4', 'Tumis Kangkung Bawang Putih', 4000, 80, 2, 2, 4, 8, 'Kangkung segar ditumis cepat dengan bawang putih dan saus tiram, renyah dan gurih.', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80', 'Sayur');

-- Tabel Admin untuk Login
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO admins (username, password) VALUES ('admin', 'admin123');
