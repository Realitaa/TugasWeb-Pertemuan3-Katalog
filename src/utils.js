/**
 * utils.js
 * Kumpulan fungsi utilitas yang digunakan di seluruh aplikasi
 */

/**
 * Mengambil item dari localStorage dengan nilai default fallback jika tidak ditemukan
 * @param {string} key - Kunci localStorage
 * @param {*} defaultValue - Nilai default jika key tidak ditemukan atau terjadi error
 * @returns {*}
 */
export function getStorage(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key)
    return value !== null ? value : defaultValue
  } catch (error) {
    console.warn(`Gagal membaca localStorage key "${key}":`, error)
    return defaultValue
  }
}

/**
 * Menyimpan item ke localStorage secara aman
 * @param {string} key - Kunci localStorage
 * @param {string} value - Nilai yang disimpan
 */
export function setStorage(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.warn(`Gagal menulis localStorage key "${key}":`, error)
  }
}

/**
 * Memformat angka menjadi format mata uang Rupiah (IDR)
 * @param {number|string} amount 
 * @returns {string} Contoh: "Rp 176.783"
 */
export function formatRupiah(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return ''
  return `Rp ${Math.round(Number(amount)).toLocaleString('id-ID')}`
}

/**
 * Menghitung harga asli sebelum diskon
 * @param {number} price - Harga setelah diskon
 * @param {number} discountPercentage - Persentase diskon
 * @returns {number|null} Harga asli atau null jika tidak ada diskon
 */
export function calculateOriginalPrice(price, discountPercentage) {
  if (!discountPercentage || discountPercentage <= 0) return null
  return Math.round(price / (1 - discountPercentage / 100))
}

/**
 * Memodifikasi string SVG bintang agar terisi warna kuning (filled amber)
 * @param {string} rawSvg - Konten raw SVG
 * @returns {string} SVG yang telah disesuaikan styling class & fill-nya
 */
export function createFilledStarIcon(rawSvg) {
  return rawSvg
    .replace('fill="none"', 'fill="currentColor"')
    .replace('class="lucide lucide-star-icon lucide-star"', 'class="size-3.5 fill-amber-400 text-amber-400 shrink-0"')
}

/**
 * Mengatur teks elemen berdasarkan atribut [init-name]
 * @param {string} name - Nama yang ingin ditampilkan
 */
export function initDisplayName(name = 'Reza') {
  document.querySelectorAll('[init-name]').forEach(el => {
    el.textContent = name
  })
}
