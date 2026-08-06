# Priorin

Priorin adalah konsep aplikasi **personal planning untuk mahasiswa** yang membantu mengubah waktu luang menjadi aktivitas yang lebih terarah. Produk ini dirancang untuk mengatasi pola penggunaan waktu yang tidak produktif selama liburan, seperti doomscrolling, burnout akademik, dan FOMO.

Repository ini berisi landing page produk, fondasi aplikasi authenticated, halaman dashboard awal, pengaturan akun, serta implementasi alur autentikasi modern berbasis Laravel Fortify.

> **Status project:** prototype / portfolio project. Landing page dan fondasi authentication sudah tersedia. Fitur AI planner, jadwal dinamis, integrasi kalender, serta sinkronisasi real-time masih berada dalam roadmap dan belum memiliki implementasi backend di repository ini.

## Daftar Isi

- [Tentang Produk](#tentang-produk)
- [Tujuan Project](#tujuan-project)
- [Fitur](#fitur)
- [Status Implementasi](#status-implementasi)
- [Tech Stack](#tech-stack)
- [Arsitektur](#arsitektur)
- [Struktur Folder](#struktur-folder)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Menjalankan Project](#menjalankan-project)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Autentikasi](#autentikasi)
- [Database](#database)
- [Testing](#testing)
- [Quality Checks](#quality-checks)
- [Route Utama](#route-utama)
- [Keamanan](#keamanan)
- [Pengembangan Lanjutan](#pengembangan-lanjutan)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## Tentang Produk

Priorin memposisikan diri sebagai **personal productivity companion** yang membantu pengguna merencanakan liburan secara seimbang antara:

- Belajar dan pengembangan skill
- Hobi dan hiburan
- Istirahat serta pemulihan energi

Konsep pengalaman pengguna yang ditampilkan di landing page:

1. Pengguna memasukkan preferensi, tingkat kelelahan, dan target.
2. Sistem menganalisis preferensi tersebut.
3. Sistem menghasilkan jadwal harian yang dapat menyesuaikan kondisi pengguna.

Narasi produk menggunakan pendekatan human-centered productivity: produktif tanpa mengabaikan kesehatan mental dan waktu istirahat.

## Tujuan Project

Project ini dibuat untuk menunjukkan kemampuan dalam:

- Membangun aplikasi Laravel modern dengan React dan Inertia.
- Mendesain landing page produk yang responsif dan memiliki identitas visual kuat.
- Mengintegrasikan authentication backend headless dengan UI React.
- Mengelola route yang membutuhkan autentikasi dan verifikasi email.
- Menerapkan two-factor authentication dan passkeys/WebAuthn.
- Menulis feature test untuk alur authentication dan pengaturan akun.
- Menyiapkan static analysis, linting, formatting, dan CI check.

## Fitur

### Landing Page Produk

- Hero section untuk positioning Priorin.
- Navigasi section: Cara Kerja, Fitur, Testimoni, dan FAQ.
- Penjelasan masalah pengguna:
  - Siklus scroll media sosial.
  - Burnout akademik.
  - FOMO berlebihan.
- Section cara kerja dengan tiga tahap:
  - Input preferensi.
  - Analisis AI.
  - Eksekusi dan monitoring.
- Testimonial section.
- FAQ section.
- CTA menuju authentication flow.
- Navigasi desktop dan mobile.
- Active section tracking ketika pengguna melakukan scroll.
- Header yang berubah saat halaman discroll.
- Cursor grid visual effect.
- Light mode dan dark mode.
- Responsive layout untuk mobile, tablet, dan desktop.
- Tipografi menggunakan Inter, Archivo Narrow, JetBrains Mono, serta Material Symbols.

### Authentication

- Login dan logout.
- Registrasi pengguna baru.
- Password hashing menggunakan Laravel cast `hashed`.
- Email verification.
- Resend verification notification.
- Forgot password.
- Reset password.
- Password confirmation.
- Custom password validation rules.
- Rate limiting untuk login.
- Rate limiting untuk two-factor challenge.
- Rate limiting untuk passkeys.

### Account Settings

- Melihat dan memperbarui profil.
- Mengubah password.
- Menghapus akun dengan konfirmasi password.
- Pengaturan appearance.
- Proteksi halaman security menggunakan password confirmation.

### Two-Factor Authentication

- TOTP-based two-factor authentication.
- Konfirmasi aktivasi 2FA.
- Recovery codes.
- Konfirmasi password sebelum mengelola 2FA.
- Halaman two-factor challenge saat login.

### Passkeys

- Dukungan passkey berbasis WebAuthn melalui Laravel Fortify.
- Registrasi dan pengelolaan passkey dari halaman security.
- Passkey login endpoints.
- Passkey confirmation endpoints.
- Well-known passkey endpoints.

## Status Implementasi

| Area | Status | Catatan |
| --- | --- | --- |
| Landing page | Selesai | Halaman produk dengan responsive layout dan dark mode |
| Login | Selesai | Laravel Fortify + Inertia React |
| Registrasi | Selesai | Validasi dan custom user creation action |
| Email verification | Selesai | Feature dan protected route tersedia |
| Password reset | Selesai | Request reset dan reset password tersedia |
| Password confirmation | Selesai | Digunakan untuk operasi sensitif |
| Two-factor authentication | Selesai | TOTP, recovery codes, challenge |
| Passkeys | Terintegrasi | Backend dan UI integration tersedia |
| Profile settings | Selesai | Update profile dan delete account |
| Appearance settings | Selesai | Light/dark/system appearance flow |
| Dashboard | Fondasi awal | UI masih berupa placeholder cards |
| AI planner | Belum tersedia | Belum ada model, service, API, atau persistence |
| Jadwal dinamis | Belum tersedia | Masih berupa product concept di landing page |
| Google Calendar | Belum tersedia | Belum ada OAuth atau calendar integration |
| Apple Calendar | Belum tersedia | Belum ada integration |
| AI/NLP processing | Belum tersedia | Belum ada provider atau pipeline AI |

## Tech Stack

### Backend

- PHP 8.4
- Laravel 13
- Laravel Fortify 1
- Laravel Wayfinder
- Inertia Laravel 3
- SQLite sebagai database default development
- PHPUnit 12
- Laravel Pint
- Larastan

### Frontend

- React 19
- TypeScript
- Inertia React 3
- Tailwind CSS 4
- Vite 8
- Radix UI primitives
- Lucide React
- Sonner untuk toast notification
- `@laravel/passkeys` untuk passkey integration

### Tooling

- ESLint 9
- Prettier 3
- TypeScript compiler
- Laravel Sail
- Laravel Pail
- GitHub Actions
- Dependabot

## Arsitektur

Priorin menggunakan pola **monolithic Laravel application dengan Inertia-powered React frontend**.

```text
Browser
   |
   v
Laravel Routes
   |
   +-- Inertia page response
   |       |
   |       v
   |   React page components
   |
   +-- Fortify authentication endpoints
   |
   v
Eloquent / SQLite
```

### Request Flow

1. Browser mengakses named route Laravel.
2. Laravel menjalankan middleware seperti `auth`, `verified`, atau `throttle`.
3. Laravel mengembalikan halaman melalui Inertia.
4. React merender page component dari `resources/js/pages`.
5. Form React mengirim request ke endpoint Laravel melalui Inertia.
6. Validation errors dan flash state dikembalikan sebagai page props/session data.

### Authentication Flow

Fortify digunakan sebagai backend authentication headless. View callback Fortify diarahkan ke page Inertia React berikut:

- `auth/login`
- `auth/register`
- `auth/forgot-password`
- `auth/reset-password`
- `auth/verify-email`
- `auth/two-factor-challenge`
- `auth/confirm-password`

Business logic yang dapat dikustomisasi diletakkan di:

- `app/Actions/Fortify/CreateNewUser.php`
- `app/Actions/Fortify/ResetUserPassword.php`

## Struktur Folder

```text
app/
├── Actions/Fortify/       # Custom user creation dan password reset logic
├── Concerns/              # Shared validation rules
├── Http/Controllers/      # Application dan settings controllers
├── Models/                # Eloquent models
└── Providers/             # Application dan Fortify configuration

database/
├── factories/             # Model factories untuk testing
├── migrations/            # Schema users, sessions, jobs, cache, 2FA, passkeys
├── seeders/               # Database seeders
└── database.sqlite        # SQLite development database

resources/js/
├── components/            # Reusable application dan UI components
├── hooks/                 # Reusable React hooks
├── layouts/               # Application layouts
├── lib/                   # Frontend utility functions
├── pages/                 # Inertia React pages
├── routes/                # Generated Wayfinder route functions
├── types/                 # Shared TypeScript types
└── app.tsx                # Frontend application bootstrap

routes/
├── web.php                # Home dan dashboard routes
├── settings.php           # Profile, security, appearance, passkey routes
└── console.php            # Artisan console routes

tests/
├── Feature/Auth/          # Authentication feature tests
├── Feature/Settings/     # Profile dan security feature tests
├── Feature/              # General feature tests
└── Unit/                 # Unit tests
```

## Prasyarat

Pastikan tools berikut sudah terpasang:

- PHP `^8.3` atau PHP 8.4.
- Composer.
- Node.js dengan npm.
- SQLite extension untuk PHP.
- Git.

Versi yang digunakan pada environment project:

```text
PHP       8.4
Laravel   13.23.0
React     19.2.8
Inertia   3.6.1
Tailwind  4.3.3
PHPUnit   12.5.33
```

## Instalasi

Clone repository:

```bash
cd priorin
```

### Instalasi Otomatis

Composer menyediakan script `setup` yang menjalankan instalasi backend, membuat `.env`, membuat application key, menjalankan migration, menginstal dependency frontend, dan melakukan production build.

```bash
composer run setup
```

### Instalasi Manual

Gunakan langkah berikut jika ingin mengontrol setiap proses:

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Pada Windows PowerShell, gunakan:

```powershell
Copy-Item .env.example .env
php artisan key:generate
```

Buat database SQLite jika belum tersedia:

```bash
touch database/database.sqlite
```

Pada Windows PowerShell:

```powershell
New-Item database/database.sqlite -ItemType File
```

Jalankan migration dan install frontend dependencies:

```bash
php artisan migrate
npm install
npm run build
```

## Menjalankan Project

### Development Mode

Perintah berikut menjalankan Laravel server, queue listener, dan Vite secara bersamaan:

```bash
composer run dev
```

Alternatif dengan proses terpisah:

```bash
php artisan serve
```

```bash
npm run dev
```

Aplikasi tersedia di:

```text
http://localhost:8000
```

### Production Build

```bash
npm run build
```

Untuk build dengan SSR:

```bash
npm run build:ssr
```

## Konfigurasi Environment

Konfigurasi minimum development pada `.env`:

```dotenv
APP_NAME=Priorin
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite

SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database

MAIL_MAILER=log
```

Catatan konfigurasi:

- `APP_KEY` wajib dibuat melalui `php artisan key:generate`.
- SQLite digunakan sebagai default database.
- `MAIL_MAILER=log` menulis email ke log aplikasi, cocok untuk development.
- Untuk email verification dan password reset production, gunakan mail provider nyata.
- Passkey menggunakan `APP_URL` sebagai basis relying party ID dan allowed origin.
- `PASSKEYS_USER_HANDLE_SECRET` dapat diisi sebagai secret terpisah. Jika kosong, konfigurasi menggunakan `APP_KEY`.
- Jangan commit `.env` atau secret ke repository.

## Autentikasi

### Endpoint Utama

| Fitur | Method | Endpoint |
| --- | --- | --- |
| Login | `POST` | `/login` |
| Logout | `POST` | `/logout` |
| Register | `POST` | `/register` |
| Request password reset | `POST` | `/forgot-password` |
| Reset password | `POST` | `/reset-password` |
| Email verification | `GET` | `/email/verify` |
| Resend verification | `POST` | `/email/verification-notification` |
| Confirm password | `POST` | `/user/confirm-password` |
| Two-factor challenge | `POST` | `/two-factor-challenge` |
| Passkey login options | `GET` | `/passkeys/login/options` |
| Passkey login | `POST` | `/passkeys/login` |
| Register passkey | `POST` | `/user/passkeys` |
| Delete passkey | `DELETE` | `/user/passkeys/{passkey}` |

### Proteksi Route

- Dashboard menggunakan `auth` dan `verified` middleware.
- Security settings menggunakan `auth`, `verified`, dan `RequirePassword`.
- Password update menggunakan throttle `6 requests per minute`.
- Login menggunakan limiter `5 requests per minute` berdasarkan email dan IP address.
- Two-factor challenge menggunakan limiter `5 requests per minute`.
- Passkey operations menggunakan limiter `10 requests per minute` berdasarkan credential/session dan IP address.

## Database

Schema inti terdiri dari:

- `users`: data pengguna, verifikasi email, password, dan data 2FA.
- `passkeys`: credential WebAuthn pengguna.
- `password_reset_tokens`: token reset password.
- `sessions`: session database driver.
- `cache` dan `cache_locks`: database cache driver.
- `jobs`, `job_batches`, dan `failed_jobs`: database queue driver.

Migration penting:

- `0001_01_01_000000_create_users_table.php`
- `2024_01_01_000000_create_passkeys_table.php`
- `2025_08_14_170933_add_two_factor_columns_to_users_table.php`

Reset database development:

```bash
php artisan migrate:fresh --seed
```

## Testing

Project menggunakan PHPUnit melalui Laravel test runner.

Jalankan seluruh test:

```bash
php artisan test --compact
```

Test suite mencakup:

- Landing page dan dashboard access.
- Login sukses dan login gagal.
- Logout.
- Login rate limiting.
- Registration.
- Password reset.
- Password confirmation.
- Email verification.
- Two-factor challenge.
- Profile update.
- Account deletion.
- Password update.
- Security settings dan feature toggles.

Jalankan satu file test:

```bash
php artisan test --compact tests/Feature/Auth/AuthenticationTest.php
```

Jalankan berdasarkan nama test:

```bash
php artisan test --compact --filter=test_users_can_authenticate_using_the_login_screen
```

## Quality Checks

Perintah yang tersedia:

```bash
npm run lint
npm run lint:check
npm run format
npm run format:check
npm run types:check
```

Untuk PHP:

```bash
vendor/bin/pint --format agent
vendor/bin/phpstan analyse
```

Composer menyediakan aggregate checks:

```bash
composer run ci:check
```

Perintah `ci:check` menjalankan lint check, format check, static analysis, TypeScript check, dan test suite.

## Route Utama

| Route | Name | Middleware | Kegunaan |
| --- | --- | --- | --- |
| `/` | `home` | - | Landing page |
| `/dashboard` | `dashboard` | `auth`, `verified` | Dashboard pengguna |
| `/settings/profile` | `profile.edit` | `auth` | Profile settings |
| `/settings/security` | `security.edit` | `auth`, `verified`, password confirmation | Security settings |
| `/settings/appearance` | `appearance.edit` | `auth`, `verified` | Appearance settings |
| `/.well-known/passkey-endpoints` | `well-known.passkeys` | - | Passkey endpoint metadata |

Route frontend menggunakan generated functions dari Laravel Wayfinder pada `resources/js/routes`.

## Keamanan

Implementasi security yang sudah tersedia:

- Password disimpan menggunakan hashing Laravel.
- Field sensitif pada `User` disembunyikan melalui `Hidden` attribute.
- Two-factor secret dan recovery codes tidak diekspos sebagai atribut model biasa.
- Email verification diwajibkan sebelum dashboard diakses.
- Operasi security memerlukan password confirmation.
- Login, 2FA, passkeys, dan password update memiliki rate limiting.
- Account deletion memerlukan password yang benar.
- Form validation dilakukan di server.
- Session dan queue menggunakan database driver pada development.

Untuk production:

- Set `APP_DEBUG=false`.
- Gunakan HTTPS.
- Gunakan mail provider production.
- Gunakan secret passkey khusus melalui `PASSKEYS_USER_HANDLE_SECRET`.
- Ganti SQLite dengan database production jika skala aplikasi membutuhkan.
- Jalankan queue worker yang dikelola process supervisor.
- Jangan gunakan credential development di environment production.

## Pengembangan Lanjutan

Roadmap implementasi Priorin:

1. Membuat model domain untuk goals, preferences, activities, schedules, dan energy logs.
2. Menambahkan onboarding untuk preferensi pengguna.
3. Membuat planner service untuk menghasilkan jadwal berdasarkan prioritas, durasi, dan energi.
4. Menambahkan AI provider abstraction untuk NLP dan rekomendasi aktivitas.
5. Menyimpan hasil rekomendasi agar jadwal dapat diedit dan dipantau.
6. Menambahkan daily check-in untuk membaca perubahan energi pengguna.
7. Menambahkan adaptive rescheduling berdasarkan check-in.
8. Mengintegrasikan Google Calendar menggunakan OAuth.
9. Menambahkan export atau integration untuk Apple Calendar.
10. Mengubah dashboard placeholder menjadi progress dashboard nyata.
11. Menambahkan observability, queue monitoring, dan production deployment pipeline.

## Kontribusi

1. Fork repository.
2. Buat branch fitur:

```bash
```

3. Implementasikan perubahan mengikuti struktur project.
4. Jalankan test dan quality checks.
5. Buat pull request dengan deskripsi perubahan dan bukti testing.

Sebelum pull request, minimal jalankan:

```bash
composer run ci:check
```

## Lisensi

Project menggunakan lisensi MIT sesuai konfigurasi Composer. Periksa file `composer.json` untuk metadata lisensi repository.

## Kredit

Priorin dibangun menggunakan ekosistem open-source Laravel, React, Inertia, Tailwind CSS, Radix UI, dan library pendukung lainnya.
