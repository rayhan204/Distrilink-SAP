# DISTRILINK — Sales Performance Dashboard

Dashboard Analisa Performa Salesman yang dikembangkan sebagai bagian dari **Frontend Web Test Case** untuk studi kasus **DISTRILINK**.

Aplikasi ini digunakan untuk memantau performa salesman berdasarkan aktivitas kunjungan, efektivitas visit, nilai order, dan jumlah order OOS.

---

## Overview

DISTRILINK Sales Performance Dashboard menyediakan tampilan ringkas untuk membantu pengguna memantau performa tim sales melalui:

* Login menggunakan API autentikasi.
* Dashboard analisa performa salesman.
* Summary total visit hari ini.
* Rata-rata efektivitas visit.
* Total nilai order.
* Grafik efektivitas visit setiap salesman.
* Tabel detail performa salesman.
* Pencarian berdasarkan nama salesman.
* Filter berdasarkan area.
* Logout dan pengelolaan session menggunakan `localStorage`.
* Tampilan responsive untuk desktop dan tablet.

---

## Tech Stack

Project ini menggunakan teknologi yang diwajibkan pada test case:

* **Next.js**
* **TypeScript**
* **Tailwind CSS**
* **Recharts** — visualisasi data performa.
* **Lucide React** — icon.
* **DummyJSON Auth API** — autentikasi login.
* **Local JSON Dataset** — data performa salesman.

---

## Requirements

Pastikan environment berikut sudah tersedia:

* Node.js
* npm
* Git

---

## Installation

Clone repository:

```bash
git clone https://github.com/rayhan204/Distrilink-SAP.git
```

Masuk ke folder project:

```bash
cd Distrilink-SAP
```

Install dependency:

```bash
npm install
```

---

## Running the Application

Jalankan development server:

```bash
npm run dev
```

Kemudian buka browser dan akses:

```text
http://localhost:3000
```

Untuk menghentikan development server:

```text
Ctrl + C
```

---

## Login

Aplikasi menggunakan **DummyJSON Auth API** untuk proses autentikasi.

Endpoint yang digunakan:

```text
POST https://dummyjson.com/auth/login
```

### Demo Account

Gunakan akun berikut untuk melakukan login:

```text
Username: emilys
Password: emilyspass
```

Setelah login berhasil, pengguna akan diarahkan ke halaman Dashboard.

Nama pengguna pada Dashboard diambil dari response API login.

### Authentication Flow

```text
Login Form
    ↓
POST /auth/login
    ↓
DummyJSON API
    ↓
Login berhasil
    ↓
Simpan data user ke localStorage
    ↓
Redirect ke Dashboard
```

Jika username atau password salah, aplikasi akan menampilkan pesan error pada form login.

---

## Dataset

Data performa salesman disimpan sebagai **JSON statis lokal** karena dataset yang diberikan pada studi kasus bersifat spesifik untuk kebutuhan assessment dan tidak tersedia pada API publik.

Lokasi dataset:

```text
src/data/sales-performance.json
```

Dataset memiliki field berikut:

| Field                      | Description                                   |
| -------------------------- | --------------------------------------------- |
| `nama_sales`               | Nama salesman                                 |
| `area`                     | Area kerja salesman                           |
| `kunjungan_planned`        | Jumlah kunjungan yang direncanakan            |
| `kunjungan_unplanned`      | Jumlah kunjungan di luar rencana              |
| `kunjungan_realisasi`      | Jumlah kunjungan yang berhasil direalisasikan |
| `efektivitas_visit_persen` | Persentase efektivitas kunjungan              |
| `total_order_rp`           | Total nilai order dalam Rupiah                |
| `jumlah_order_oos`         | Jumlah order Out of Stock                     |

---

## Dashboard Metrics

Dashboard menampilkan tiga summary utama sesuai kebutuhan studi kasus.

### 1. Total Visit Hari Ini

Total visit dihitung berdasarkan jumlah:

```text
kunjungan_realisasi
```

Formula:

```text
Total Visit = SUM(kunjungan_realisasi)
```

Berdasarkan dataset awal:

```text
Total Visit = 76
```

---

### 2. Rata-rata Efektivitas Visit

Rata-rata efektivitas visit dihitung dari seluruh salesman yang sedang ditampilkan.

Formula:

```text
Average Effectiveness =
SUM(efektivitas_visit_persen) / jumlah_salesman
```

Berdasarkan seluruh dataset:

```text
Average Effectiveness = 82.2%
```

---

### 3. Total Order

Total order merupakan penjumlahan nilai order seluruh salesman.

Formula:

```text
Total Order = SUM(total_order_rp)
```

Berdasarkan seluruh dataset:

```text
Total Order = Rp33.130.002
```

---

## Search & Filter

Dashboard menyediakan fitur:

### Search Salesman

Pengguna dapat mencari salesman berdasarkan nama.

Contoh:

```text
Dimas
```

Maka tabel dan chart hanya akan menampilkan data salesman yang sesuai.

### Filter Area

Pengguna dapat melakukan filter berdasarkan area:

* Bandung Kota
* Bandung Barat
* Cimahi
* Bandung Timur
* Soreang

Tersedia juga pilihan:

```text
Semua Area
```

### Filtered Metrics

Summary card, chart, dan tabel akan mengikuti data yang sedang ditampilkan setelah pencarian atau filter diterapkan.

Contohnya, ketika memilih area tertentu, nilai:

* Total Visit
* Rata-rata Efektivitas Visit
* Total Order
* Chart
* Sales Table

akan otomatis menyesuaikan dengan data hasil filter.

---

## Performance Chart

Dashboard menyediakan visualisasi **Efektivitas Visit** menggunakan bar chart.

Chart membandingkan persentase efektivitas visit setiap salesman.

Contoh data:

```text
Dimas Rasyid   → 83%
Siti Aminah    → 100%
Andi Wijaya    → 67%
Rina Puspita   → 86%
Fajar Nugroho  → 75%
```

Chart menggunakan library:

```text
Recharts
```

---

## Sales Performance Table

Dashboard menampilkan detail performa setiap salesman dalam bentuk tabel.

Informasi yang ditampilkan:

* Nama salesman
* Area
* Planned visit
* Unplanned visit
* Realisasi visit
* Efektivitas visit
* Total order
* Jumlah OOS

Contoh:

| Salesman      | Area          | Planned | Unplanned | Realisasi | Efektivitas | Total Order | OOS |
| ------------- | ------------- | ------: | --------: | --------: | ----------: | ----------: | --: |
| Dimas Rasyid  | Bandung Kota  |      18 |         2 |        15 |         83% | Rp6.880.002 |   2 |
| Siti Aminah   | Bandung Barat |      20 |         0 |        20 |        100% | Rp9.250.000 |   0 |
| Andi Wijaya   | Cimahi        |      15 |         1 |        10 |         67% | Rp4.100.000 |   4 |
| Rina Puspita  | Bandung Timur |      22 |         3 |        19 |         86% | Rp7.600.000 |   1 |
| Fajar Nugroho | Soreang       |      16 |         1 |        12 |         75% | Rp5.300.000 |   3 |

---

## Performance Status

Efektivitas visit diberikan badge berdasarkan persentasenya.

Kategori yang digunakan:

| Percentage | Status          |
| ---------: | --------------- |
|   `>= 90%` | Excellent       |
|   `>= 80%` | Good            |
|   `>= 70%` | Fair            |
|    `< 70%` | Needs Attention |

Status digunakan untuk membantu pengguna melihat performa salesman secara lebih cepat.

---

## Authentication & Session

Data authentication disimpan pada browser menggunakan:

```text
localStorage
```

Storage key yang digunakan:

```text
distrilink_auth
```

Data yang disimpan meliputi:

* User ID
* Username
* First name
* Last name
* Access token

Saat pengguna melakukan logout:

```text
localStorage
    ↓
hapus distrilink_auth
    ↓
redirect ke /login
```

Jika pengguna mencoba mengakses Dashboard tanpa authentication session, aplikasi akan mengarahkan pengguna kembali ke halaman Login.

---

## Project Structure

Struktur utama project:

```text
distrilink-sap/
│
├── public/
│   ├── images/
│   │   └── image.png
│   
│
├── src/
│   │
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   │
│   │   ├── auth/
│   │   │   └── LoginForm.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── DashboardFilters.tsx
│   │   │   ├── PerformanceChart.tsx
│   │   │   ├── PerformanceBadge.tsx
│   │   │   ├── SalesTable.tsx
│   │   │   └── SummaryCard.tsx
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       └── Select.tsx
│   │
│   ├── data/
│   │   └── sales-performance.json
│   │
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── constants.ts
│   │   └── utils.ts
│   │
│   ├── services/
│   │   └── auth.service.ts
│   │
│   └── types/
│       ├── auth.ts
│       └── sales.ts
│
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

---

## Application Flow

```text
                         ┌───────────────┐
                         │     User      │
                         └───────┬───────┘
                                 │
                                 ▼
                       ┌──────────────────┐
                       │    Login Page    │
                       └────────┬─────────┘
                                │
                         Username + Password
                                │
                                ▼
                    ┌───────────────────────┐
                    │ DummyJSON Auth API    │
                    └───────────┬────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                 Failed                 Success
                    │                       │
                    ▼                       ▼
              Show Error             Save Session
                                            │
                                            ▼
                                    ┌──────────────┐
                                    │  Dashboard   │
                                    └──────┬───────┘
                                           │
                         ┌─────────────────┼─────────────────┐
                         │                 │                 │
                         ▼                 ▼                 ▼
                     Summary            Chart             Table
                         │                 │                 │
                         └─────────────────┼─────────────────┘
                                           │
                                      Search / Filter
                                           │
                                           ▼
                                       Logout
                                           │
                                           ▼
                                    Remove Session
                                           │
                                           ▼
                                      Login Page
```

---

## Responsive Design

Dashboard dirancang responsive untuk desktop dan tablet.

Breakpoints utama menggunakan responsive utility dari Tailwind CSS.

Pada layar yang lebih kecil:

* Summary cards menyesuaikan jumlah kolom.
* Filter berubah menjadi layout yang lebih fleksibel.
* Chart menyesuaikan ukuran container.
* Tabel dapat di-scroll secara horizontal.
* Header menyesuaikan informasi user dan tombol logout.

Tujuannya adalah menjaga seluruh informasi tetap dapat digunakan tanpa merusak struktur dashboard.

---

## Code Organization

Project menggunakan pemisahan tanggung jawab yang sederhana dan proporsional terhadap kebutuhan assessment.

### `app/`

Digunakan untuk routing dan halaman utama Next.js.

### `components/`

Berisi komponen UI yang digunakan oleh halaman aplikasi.

### `data/`

Berisi dataset performa salesman dalam format JSON lokal.

### `services/`

Berisi komunikasi dengan API eksternal.

Contoh:

```text
src/services/auth.service.ts
```

### `types/`

Berisi TypeScript interface untuk menjaga struktur data tetap konsisten.

### `lib/`

Berisi helper dan utility seperti:

* Authentication helper
* Constants
* Currency formatter
* Performance status

---

## Code Quality

Beberapa prinsip yang diterapkan dalam project:

* TypeScript untuk type safety.
* Komponen dibuat berdasarkan tanggung jawabnya.
* Penamaan file, komponen, function, dan variable dibuat konsisten.
* API logic dipisahkan ke dalam `services`.
* Data model dipisahkan ke dalam `types`.
* Utility function dipisahkan ke dalam `lib`.
* Dataset studi kasus dipisahkan dari component.
* Tidak menggunakan state management library yang tidak diperlukan.
* Tidak menggunakan abstraction layer berlebihan untuk kebutuhan aplikasi sederhana.

Struktur dibuat sederhana agar mudah dipahami, dikembangkan, dan dipelihara.

---

## Available Scripts

### Development

Menjalankan development server:

```bash
npm run dev
```

### Build

Membuat production build:

```bash
npm run build
```

### Start

Menjalankan hasil production build:

```bash
npm run start
```

### Lint

Melakukan pengecekan kode:

```bash
npm run lint
```

---

## Production Build

Untuk memastikan aplikasi dapat dibuat dalam production mode:

```bash
npm run build
```

Jika build berhasil, jalankan:

```bash
npm run start
```

Kemudian akses:

```text
http://localhost:3000
```

---

## Repository

Source code project tersedia di GitHub:

```text
https://github.com/rayhan204/Distrilink-SAP
```

---

## Author

**Rayhan**

Frontend Web Test Case — DISTRILINK
