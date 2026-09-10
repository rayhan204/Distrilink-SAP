export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  accessToken: string;
}

export interface SalesPerformance {
  nama_sales: string;
  area: string;
  kunjungan_planned: number;
  kunjungan_unplanned: number;
  kunjungan_realisasi: number;
  total_order_rp: number;
  jumlah_order_oos: number;
}
