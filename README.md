# DISTRILINK — Sales Performance Dashboard

Dashboard analisa performa salesman yang dikembangkan untuk **Frontend Web Test Case** studi kasus DISTRILINK.

Aplikasi membantu supervisor memantau performa harian tim sales melalui metrik kunjungan, efektivitas visit, nilai order, dan order yang gagal karena **Out of Stock (OOS)**.

---

## 1. Overview

DISTRILINK memiliki dua alur utama:

1. **Login**
   - Username dan password.
   - Terhubung ke API autentikasi DummyJSON.
   - Menampilkan error ketika login gagal.
   - Menyimpan session user pada `localStorage`.
   - Mengarahkan user ke Dashboard setelah login berhasil.

2. **Dashboard**
   - Menampilkan nama user yang sedang login.
   - Menampilkan summary performa.
   - Menampilkan tabel detail salesman.
   - Menampilkan bar chart efektivitas visit.
   - Mendukung pencarian salesman.
   - Mendukung filter berdasarkan area.
   - Summary, tabel, dan chart mengikuti hasil filter.
   - Menyediakan Logout.
   - Responsive untuk desktop, tablet, dan layar kecil.

---

## 2. Tech Stack

| Teknologi | Penggunaan |
|---|---|
| Next.js | Framework aplikasi dan routing |
| TypeScript | Type safety dan kontrak data |
| Tailwind CSS | Styling dan responsive UI |
| Recharts | Visualisasi bar chart |
| Lucide React | Icon |
| DummyJSON | API autentikasi |
| Local JSON | Dataset performa salesman |

Project menggunakan **Next.js App Router** dengan pemisahan komponen berdasarkan tanggung jawab.

---

## 3. Requirements

Pastikan environment berikut tersedia:

- Node.js
- npm
- Git

Versi Node.js mengikuti compatibility requirement dari versi Next.js yang digunakan pada `package.json`.

---

## 4. Installation

Clone repository:

```bash
git clone https://github.com/rayhan204/Distrilink-SAP.git
```

Masuk ke project:

```bash
cd Distrilink-SAP
```

Install dependency:

```bash
npm install
```

---

## 5. Running the Application

Jalankan development server:

```bash
npm run dev
```

Buka:

```text
http://localhost:3000
```

Untuk menghentikan server:

```text
Ctrl + C
```

---

## 6. Demo Login

Aplikasi menggunakan DummyJSON Authentication API.

Endpoint upstream:

```text
POST https://dummyjson.com/auth/login
```

Aplikasi frontend tidak memanggil endpoint DummyJSON secara langsung. Request login diarahkan ke API route internal:

```text
POST /api/login
```

Kemudian route tersebut meneruskan request ke DummyJSON.

### Demo Account

```text
Username: emilys
Password: emilyspass
```

Setelah berhasil, response API menyediakan informasi user seperti:

- `id`
- `username`
- `firstName`
- `lastName`
- `accessToken`
- dan informasi user lainnya.

> Jangan commit token, password, atau credential pribadi ke repository.

---

# 7. Authentication Flow

Alur autentikasi:

```text
┌──────────────┐
│  Login Page  │
└──────┬───────┘
       │
       │ username + password
       ▼
┌────────────────┐
│ POST /api/login│
└──────┬─────────┘
       │
       ▼
┌──────────────────────────┐
│ DummyJSON Auth API       │
│ /auth/login              │
└──────────┬───────────────┘
           │
      ┌────┴─────┐
      │          │
    Failed     Success
      │          │
      ▼          ▼
 Show error   Save user
                │
                ▼
          localStorage
                │
                ▼
          /dashboard
```

### Mengapa menggunakan `/api/login`?

API route internal digunakan sebagai boundary antara UI dan external API.

Keuntungannya:

- Component login tidak perlu mengetahui detail endpoint external.
- Logic komunikasi API lebih terisolasi.
- Error dari upstream dapat dinormalisasi.
- Lebih mudah mengganti provider API pada masa depan.
- Struktur aplikasi lebih mudah dikembangkan ketika backend production tersedia.

---

# 8. Session Management

Untuk kebutuhan assessment, session user disimpan menggunakan browser `localStorage`.

Storage key:

```text
distrilink_auth
```

Helper authentication berada di:

```text
src/lib/auth.ts
```

Fungsi utama:

```text
setAuthUser()
getAuthUser()
removeAuthUser()
```

### Login

```text
API berhasil
     ↓
setAuthUser(user)
     ↓
localStorage.setItem(...)
     ↓
redirect /dashboard
```

### Refresh Dashboard

```text
Refresh browser
      ↓
useAuthUser()
      ↓
getAuthUser()
      ↓
baca localStorage
      ↓
session ditemukan
      ↓
tetap di /dashboard
```

### Logout

```text
Klik Keluar
    ↓
removeAuthUser()
    ↓
hapus distrilink_auth
    ↓
redirect /login
```

Jika user membuka Dashboard tanpa session, aplikasi akan mengarahkan kembali ke halaman Login.

### Production consideration

`localStorage` digunakan karena sesuai dengan kebutuhan prototype/assessment.

Untuk aplikasi production, session/token sebaiknya dipertimbangkan menggunakan **secure HttpOnly cookie** dan mekanisme autentikasi backend yang sesuai agar token tidak dapat diakses langsung oleh JavaScript.

---

# 9. Error Handling

Login menangani beberapa kondisi utama:

### Validation error

Jika username atau password kosong:

```text
Username dan password wajib diisi.
```

### Invalid credentials

Jika API mengembalikan credential tidak valid, user mendapatkan pesan error pada halaman Login.

### Network/server error

Jika API tidak dapat dihubungi, user mendapatkan pesan error yang dapat dipahami tanpa menampilkan detail teknis yang tidak diperlukan.

### Loading state

Saat request login berlangsung:

- Tombol Login berada dalam state loading.
- User tidak dapat melakukan submit berulang.
- Feedback visual diberikan kepada user.

### Prinsip error handling

Error yang ditampilkan ke user dibuat singkat dan actionable, sedangkan detail teknis untuk debugging ditangani pada sisi developer/server.

---

# 10. Dataset

Dataset performa salesman menggunakan **JSON statis lokal** karena data studi kasus diberikan langsung oleh assessment dan tidak tersedia pada API publik.

Lokasi dataset:

```text
src/data/sales.json
```

Struktur data:

| Field | Deskripsi |
|---|---|
| `nama_sales` | Nama salesman/canvasser |
| `area` | Wilayah kerja sales |
| `kunjungan_planned` | Jumlah outlet yang direncanakan dikunjungi |
| `kunjungan_unplanned` | Jumlah kunjungan di luar rencana, jika tersedia pada dataset |
| `kunjungan_realisasi` | Jumlah kunjungan yang benar-benar terjadi |
| `efektivitas_visit_persen` | Persentase efektivitas visit |
| `total_order_rp` | Total nilai order |
| `jumlah_order_oos` | Jumlah order yang gagal karena stok kosong |

> **Asumsi:** `kunjungan_unplanned` tidak digunakan dalam perhitungan summary karena contoh dataset utama pada soal tidak menyediakan nilai field tersebut secara konsisten. Field ini tetap didokumentasikan karena tercantum pada spesifikasi field assessment.

---

# 11. Dashboard Metrics

Dashboard menyediakan empat summary card:

1. Total Visit Hari Ini
2. Rata-rata Efektivitas
3. Total Order
4. Order OOS

Empat metric tersebut juga mengikuti data yang sedang ditampilkan setelah filter diterapkan.

## 11.1 Total Visit

Dihitung dari:

```text
SUM(kunjungan_realisasi)
```

Berdasarkan dataset awal:

```text
15 + 20 + 10 + 19 + 12 = 76
```

Hasil:

```text
76 visit
```

---

## 11.2 Rata-rata Efektivitas

Rata-rata dihitung dari nilai `efektivitas_visit_persen` setiap salesman yang sedang ditampilkan.

Formula:

```text
SUM(efektivitas_visit_persen) / jumlah_salesman
```

Berdasarkan dataset awal:

```text
(83 + 100 + 67 + 86 + 75) / 5 = 82.2%
```

Hasil:

```text
82.2%
```

> Perhitungan menggunakan rata-rata nilai persentase yang diberikan pada dataset assessment.

---

## 11.3 Total Order

Formula:

```text
SUM(total_order_rp)
```

Berdasarkan dataset awal:

```text
Rp6.880.002
+ Rp9.250.000
+ Rp4.100.000
+ Rp7.600.000
+ Rp5.300.000
= Rp33.130.002
```

Hasil:

```text
Rp33.130.002
```

---

## 11.4 Total Order OOS

Formula:

```text
SUM(jumlah_order_oos)
```

Berdasarkan dataset awal:

```text
2 + 0 + 4 + 1 + 3 = 10
```

Hasil:

```text
10 order OOS
```

---

# 12. Search & Filter

Dashboard menyediakan dua kontrol:

### Search

Pencarian berdasarkan:

```text
nama_sales
```

Contoh:

```text
Dimas
```

Hasil tabel dan chart hanya menampilkan salesman yang sesuai.

### Filter Area

Area yang tersedia berdasarkan dataset:

- Bandung Kota
- Bandung Barat
- Cimahi
- Bandung Timur
- Soreang

Tersedia pilihan:

```text
Semua Area
```

### Filter Behavior

Ketika search atau filter digunakan, komponen berikut ikut berubah:

```text
┌───────────────┐
│ Summary Cards │
└───────┬───────┘
        │
┌───────┴────────────┐
│ Filtered Sales     │
└───────┬────────────┘
        │
   ┌────┴─────┐
   ▼          ▼
 Table       Chart
```

Dengan demikian angka summary tidak menampilkan data yang berbeda dari data pada tabel.

---

# 13. Performance Chart

Dashboard menggunakan **bar chart** untuk memvisualisasikan:

```text
Efektivitas Visit per Salesman
```

Contoh:

| Salesman | Efektivitas |
|---|---:|
| Dimas Rasyid | 83% |
| Siti Aminah | 100% |
| Andi Wijaya | 67% |
| Rina Puspita | 86% |
| Fajar Nugroho | 75% |

Library:

```text
Recharts
```

Chart menggunakan data yang sama dengan tabel sehingga ketika filter diterapkan, chart ikut diperbarui.

---

# 14. Performance Status

Badge efektivitas digunakan untuk membantu supervisor membaca kondisi performa secara cepat.

| Efektivitas | Status |
|---:|---|
| `>= 90%` | Excellent |
| `>= 80%` | Good |
| `>= 70%` | Fair |
| `< 70%` | Needs Attention |

Status ini merupakan interpretasi UI untuk membantu visual scanning dan bukan perubahan terhadap nilai dataset asli.

---

# 15. Sales Performance Table

Tabel menampilkan detail performa salesman.

Informasi utama:

- Nama salesman
- Area
- Planned visit
- Realisasi visit
- Efektivitas visit
- Total order
- Jumlah OOS

Jika field `kunjungan_unplanned` tersedia pada dataset aktual, field tersebut dapat ditampilkan tanpa mengubah struktur metric utama.

Tabel dibuat responsive dengan horizontal scrolling pada layar yang lebih kecil sehingga data tidak dipaksa menjadi terlalu sempit.

---

# 16. UI / UX Decisions

Beberapa keputusan desain yang digunakan:

### Hierarchy

Informasi disusun dari:

```text
Header
  ↓
Page title
  ↓
Summary
  ↓
Filter
  ↓
Table + Chart
```

Tujuannya agar supervisor dapat melihat kondisi tim secara cepat sebelum masuk ke detail.

### Compact dashboard

Pada desktop, tabel dan chart ditempatkan berdampingan:

```text
┌──────────────────────────┬───────────────────┐
│ Filter + Sales Table     │ Performance Chart │
│                          │                   │
│                          │                   │
└──────────────────────────┴───────────────────┘
```

Pendekatan ini mengurangi vertical scrolling dan membuat informasi utama lebih mudah dipantau dalam satu layar.

### Responsive

Breakpoint Tailwind digunakan agar:

- Summary menjadi beberapa kolom pada desktop.
- Filter menyesuaikan lebar.
- Tabel dapat di-scroll horizontal.
- Chart mengikuti ukuran container.
- Header tetap usable pada tablet/mobile.
- Layout tabel dan chart dapat berubah menjadi stacked pada layar yang lebih kecil.

### Accessibility

Beberapa perhatian dasar diberikan pada:

- Label form.
- Focus state.
- Button type.
- Loading feedback.
- Error message.
- Kontras teks.
- Struktur heading.
- Ukuran area klik yang cukup.

---

# 17. Project Structure

Struktur project:

```text
distrilink-sap/
│
├── public/
│   └── images/
│
├── src/
│   │
│   ├── app/
│   │   ├── api/
│   │   │   └── login/
│   │   │       └── route.ts
│   │   │
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
|   |   ├── LoginForm.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── DashboardFilters.tsx
│   │   ├── PerformanceBadge.tsx
│   │   ├── PerformanceChart.tsx
│   │   ├── SalesTable.tsx
│   │   ├──SummaryCard.tsx
│   │   
│   │
│   ├── data/
│   │   └── sales.json
│   │
│   ├── hooks/
│   │   └── useAuthUser.ts
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
│       ├── index.ts
│     
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

# 18. Architecture & Responsibility

Project menggunakan **layered frontend structure** yang sederhana dan proporsional dengan scope assessment.

### `app/`

Menangani:

- Routing.
- Page.
- API Route Handler.

Contoh:

```text
app/dashboard/page.tsx
```

bertanggung jawab sebagai orchestration halaman Dashboard.

### `components/`

Berisi UI component yang memiliki tanggung jawab spesifik.

Contoh:

```text
SummaryCard
DashboardFilters
SalesTable
PerformanceChart
DashboardHeader
```

Tujuannya agar page tidak berisi seluruh markup UI.

### `services/`

Menangani komunikasi API.

Contoh:

```text
services/auth.service.ts
```

Component tidak perlu mengetahui detail request API.

### `hooks/`

Menangani reusable client-side state/behavior.

Contoh:

```text
hooks/useAuthUser.ts
```

digunakan untuk membaca session user dari browser setelah hydration.

### `lib/`

Berisi helper yang dapat digunakan lintas component.

Contoh:

```text
lib/auth.ts
lib/utils.ts
lib/constants.ts
```

### `types/`

Menjadi kontrak data TypeScript.

Contoh:

```text
AuthUser
SalesPerformance
```

### `data/`

Menyimpan mock dataset yang diberikan oleh assessment.

---

# 19. Architectural Principles

Project sengaja tidak menggunakan state management library tambahan karena kebutuhan aplikasi masih sederhana.

Prinsip yang digunakan:

- **Single Responsibility** — component memiliki tanggung jawab yang jelas.
- **Separation of Concerns** — UI, API, authentication helper, data, dan type dipisahkan.
- **Reusability** — komponen seperti `SummaryCard` digunakan untuk beberapa metric.
- **Type Safety** — data menggunakan TypeScript interface/type.
- **No unnecessary abstraction** — tidak membuat layer yang tidak diperlukan untuk prototype.
- **Derived data** — summary dihitung dari dataset/filter aktif, bukan disimpan sebagai state terpisah.
- **Consistent data source** — table dan chart menggunakan hasil filter yang sama.

Pendekatan ini menjaga codebase tetap mudah dibaca tanpa melakukan over-engineering.

---

# 20. Data Flow Dashboard

```text
sales.json
    │
    ▼
Dashboard Page
    │
    ├───────────────┐
    │               │
    ▼               ▼
Search / Area    Filtered Sales
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
       Summary    Table      Chart
```

Summary tidak memiliki state sendiri. Nilainya merupakan hasil kalkulasi dari `filteredSales`.

Hal ini mencegah kondisi di mana angka summary berbeda dengan data yang terlihat pada tabel.

---

# 21. Application Flow

```text
                         ┌──────────┐
                         │   User   │
                         └────┬─────┘
                              │
                              ▼
                       ┌─────────────┐
                       │ Login Page  │
                       └──────┬──────┘
                              │
                     Username + Password
                              │
                              ▼
                       ┌─────────────┐
                       │ /api/login  │
                       └──────┬──────┘
                              │
                              ▼
                       ┌─────────────┐
                       │ DummyJSON   │
                       └──────┬──────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                  Failed             Success
                    │                   │
                    ▼                   ▼
               Show Error          Save Session
                                        │
                                        ▼
                                  localStorage
                                        │
                                        ▼
                                  /dashboard
                                        │
                        ┌───────────────┼───────────────┐
                        │               │               │
                        ▼               ▼               ▼
                     Summary          Table           Chart
                        ▲               ▲               ▲
                        │               │               │
                        └──── Search / Filter ─────────┘
                                        │
                                        ▼
                                     Logout
                                        │
                                        ▼
                                Remove Session
                                        │
                                        ▼
                                   /login
```

---

# 22. Testing Checklist

Sebelum submission, lakukan pengecekan berikut.

### Login

- [ ] Halaman Login dapat dibuka.
- [ ] Username kosong menampilkan validation error.
- [ ] Password kosong menampilkan validation error.
- [ ] Credential valid berhasil login.
- [ ] Credential invalid menampilkan pesan error.
- [ ] Loading state muncul ketika request berlangsung.
- [ ] Login tidak melakukan submit berulang.

### Authentication

- [ ] Setelah login diarahkan ke Dashboard.
- [ ] Nama user berasal dari response API.
- [ ] Refresh Dashboard tetap mempertahankan session.
- [ ] Membuka Dashboard tanpa session diarahkan ke Login.
- [ ] Logout menghapus session.
- [ ] Setelah logout, user kembali ke Login.

### Dashboard

- [ ] Summary Total Visit tampil.
- [ ] Summary Efektivitas tampil.
- [ ] Summary Total Order tampil.
- [ ] Summary OOS tampil.
- [ ] Chart tampil.
- [ ] Tabel sales tampil.
- [ ] Search bekerja.
- [ ] Filter area bekerja.
- [ ] Reset filter bekerja.
- [ ] Summary mengikuti filter.
- [ ] Chart mengikuti filter.
- [ ] Tabel mengikuti filter.

### Responsive

- [ ] Desktop.
- [ ] Tablet.
- [ ] Mobile/basic small screen.
- [ ] Tidak ada horizontal overflow pada halaman utama.
- [ ] Tabel dapat di-scroll jika lebar layar tidak cukup.
- [ ] Tombol dan input tetap usable.

### Code Quality

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run start`

---

# 23. Available Scripts

Development:

```bash
npm run dev
```

Lint:

```bash
npm run lint
```

Production build:

```bash
npm run build
```

Production server:

```bash
npm run start
```

Recommended validation sebelum submission:

```bash
npm run lint
npm run build
```

---

# 24. Assumptions

Karena assessment merupakan prototype dengan mock dataset, beberapa asumsi digunakan:

1. Dataset performa salesman berasal dari JSON lokal sesuai instruksi assessment.
2. `kunjungan_unplanned` tidak digunakan dalam summary karena contoh dataset utama tidak menyediakan nilainya secara konsisten.
3. Rata-rata efektivitas dihitung sebagai rata-rata aritmetika nilai `efektivitas_visit_persen` yang tersedia.
4. Summary, chart, dan table mengikuti hasil pencarian/filter aktif agar informasi yang ditampilkan konsisten.
5. Session disimpan di `localStorage` karena assessment secara eksplisit memperbolehkannya.
6. Dashboard merupakan prototype monitoring dan belum terhubung ke database/backend performa sales.
7. Nilai OOS dianggap sebagai jumlah order yang gagal karena stok kosong sesuai definisi field assessment.
8. Status performa `Excellent`, `Good`, `Fair`, dan `Needs Attention` merupakan klasifikasi visual untuk membantu pembacaan dashboard.

---

# 25. Assessment Requirement Mapping

| Requirement | Implementasi |
|---|---|
| Next.js | Digunakan |
| TypeScript | Digunakan |
| Tailwind CSS | Digunakan |
| Login page | `app/login` |
| Real API login | DummyJSON |
| API route | `/api/login` |
| Error login | Ditampilkan pada form |
| User name | Diambil dari response API |
| Dashboard | `app/dashboard` |
| Local mock data | `src/data/sales.json` |
| Total visit | Summary card |
| Average effectiveness | Summary card |
| Total order | Summary card |
| Chart | Recharts bar chart |
| Search | Nama salesman |
| Filter | Area |
| Logout | Header dashboard |
| Responsive | Tailwind responsive layout |
| README | Dokumentasi project |

---

# 26. Production Improvement

Jika project dikembangkan lebih lanjut menjadi aplikasi production, beberapa improvement yang dapat dilakukan:

- Menggunakan backend/database untuk data performa.
- Menggunakan secure HttpOnly cookie untuk authentication session.
- Menambahkan role-based access control.
- Menambahkan pagination pada tabel ketika data besar.
- Menambahkan server-side filtering.
- Menambahkan unit test dan integration test.
- Menambahkan error monitoring.
- Menambahkan API schema validation.
- Menambahkan loading skeleton.
- Menambahkan empty state yang lebih detail.
- Menambahkan export laporan.
- Menambahkan date range untuk analisis historis.
- Menambahkan target KPI supervisor.

Improvement tersebut sengaja tidak dibuat sebagai bagian utama prototype agar scope tetap sesuai kebutuhan assessment dan tidak menjadi over-engineering.

---

# 27. Repository

GitHub:

```text
https://github.com/rayhan204/Distrilink-SAP
```

---

# 28. Author

**Rayhan**

Frontend Web Test Case — DISTRILINK
