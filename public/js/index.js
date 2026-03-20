/* ═══════════════════════════════════════════════════════
   REAL ESTATE — Enhanced Smooth CSS
   Aesthetic: Luxury Dark Forest + Gold Accents
   Font: Cormorant Garamond (display) + DM Sans (body)
═══════════════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ─── CSS Variables ───────────────────────────────────── */
:root {
  --forest:        #1e2e28;
  --forest-mid:    #273d34;
  --forest-light:  #2f4a3e;
  --sage:          #4a7c59;
  --sage-light:    #6aaa82;
  --gold:          #c8a96e;
  --gold-light:    #e2c98a;
  --gold-dim:      rgba(200, 169, 110, 0.15);
  --cream:         #f5f0e8;
  --cream-dim:     rgba(245, 240, 232, 0.85);
  --white:         #ffffff;
  --glass:         rgba(255, 255, 255, 0.06);
  --glass-border:  rgba(255, 255, 255, 0.10);
  --shadow-lg:     0 20px 60px rgba(0, 0, 0, 0.4);
  --shadow-md:     0 8px 30px rgba(0, 0, 0, 0.25);
  --shadow-sm:     0 3px 12px rgba(0, 0, 0, 0.15);
  --radius-lg:     16px;
  --radius-md:     10px;
  --radius-sm:     6px;
  --transition:    0.35s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ─── Reset & Base ────────────────────────────────────── */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: var(--forest);
  background-image:
    radial-gradient(ellipse at 20% 0%, rgba(74, 124, 89, 0.12) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 100%, rgba(200, 169, 110, 0.08) 0%, transparent 50%);
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  color: var(--cream);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  line-height: 1.6;
}

h1, h2, h3, h4, h5 {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.02em;
}

::selection {
  background: var(--gold);
  color: var(--forest);
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--forest); }
::-webkit-scrollbar-thumb { background: var(--sage); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--gold); }

/* ─── Navbar ─────────────────────────────────────────── */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(30, 46, 40, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  padding: 0 2.5rem;
  min-height: 72px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: background var(--transition), box-shadow var(--transition), transform 0.4s cubic-bezier(0.4,0,0.2,1);
}

.navbar::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  opacity: 0.4;
}

.navbar .logo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.9rem;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 2px;
  text-shadow: 0 0 30px rgba(200, 169, 110, 0.3);
  transition: text-shadow var(--transition);
}

.navbar .logo:hover {
  text-shadow: 0 0 50px rgba(200, 169, 110, 0.6);
}

.navbar nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.navbar nav a {
  color: var(--cream-dim);
  padding: 0.45rem 0.9rem;
  font-size: 0.92rem;
  font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  text-decoration: none;
  letter-spacing: 0.04em;
  border-radius: var(--radius-sm);
  position: relative;
  transition: color var(--transition), background var(--transition);
}

.navbar nav a::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  right: 50%;
  height: 1.5px;
  background: var(--gold);
  transition: left var(--transition), right var(--transition);
  border-radius: 2px;
}

.navbar nav a:hover {
  color: var(--gold);
  background: var(--gold-dim);
}

.navbar nav a:hover::after {
  left: 12%;
  right: 12%;
}

/* ─── Main ───────────────────────────────────────────── */
main {
  flex: 1;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem 1.5rem 4rem;
}

header { text-align: center; }

header h1 {
  font-size: 2.8rem;
  color: var(--gold);
  letter-spacing: 3px;
  text-shadow: 0 2px 30px rgba(200, 169, 110, 0.25);
}

header p {
  margin-top: 0.4rem;
  color: rgba(245, 240, 232, 0.55);
  font-size: 1rem;
}

/* ─── Common Card ────────────────────────────────────── */
.card {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  backdrop-filter: blur(10px);
  transition: box-shadow var(--transition);
}

.card:hover { box-shadow: var(--shadow-lg); }

/* ─── Buttons ────────────────────────────────────────── */
button, .btn {
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
  color: var(--forest);
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.65rem 1.4rem;
  cursor: pointer;
  font-size: 0.92rem;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  letter-spacing: 0.05em;
  position: relative;
  overflow: hidden;
  transition: transform var(--transition-bounce), box-shadow var(--transition), filter var(--transition);
}

button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.15);
  opacity: 0;
  transition: opacity 0.2s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(200, 169, 110, 0.4);
  filter: brightness(1.05);
}

button:hover::before { opacity: 1; }
button:active { transform: translateY(0) scale(0.97); box-shadow: none; }

/* ─── Inputs ─────────────────────────────────────────── */
input, select, textarea {
  background: rgba(255, 255, 255, 0.05);
  color: var(--cream);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  padding: 0.65rem 0.9rem;
  margin-bottom: 1rem;
  width: 100%;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  transition: border-color var(--transition), box-shadow var(--transition), background var(--transition);
  outline: none;
}

input:focus, select:focus, textarea:focus {
  border-color: var(--gold);
  background: rgba(200, 169, 110, 0.07);
  box-shadow: 0 0 0 3px rgba(200, 169, 110, 0.15);
}

input::placeholder, textarea::placeholder {
  color: rgba(245, 240, 232, 0.35);
}

/* ─── Hero ───────────────────────────────────────────── */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, var(--forest-mid) 0%, var(--forest-light) 100%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 3rem 2.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-lg);
  width: 100%;
  flex-wrap: wrap;
  gap: 2rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(200, 169, 110, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.hero-content { flex: 1 1 280px; }

.hero-content h2 {
  font-size: 2.6rem;
  margin-bottom: 1rem;
  color: var(--gold);
  line-height: 1.15;
}

.hero-content p {
  font-size: 1.05rem;
  color: rgba(245, 240, 232, 0.65);
  margin-bottom: 2rem;
  line-height: 1.7;
}

.hero-img { flex: 1 1 220px; display: flex; justify-content: center; align-items: center; }

.hero-img img {
  width: 100%;
  max-width: 340px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition), box-shadow var(--transition);
}

.hero-img img:hover {
  transform: scale(1.02) rotate(0.5deg);
  box-shadow: 0 30px 70px rgba(0,0,0,0.5);
}

/* ─── Slider ─────────────────────────────────────────── */
.slider {
  position: relative;
  width: 100%;
  max-width: 760px;
  margin: 2rem auto;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  aspect-ratio: 16 / 9;
  background: var(--forest-mid);
}

.slider img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: translateX(100%);
  will-change: transform, opacity;
}

.slider img.active {
  display: block;
  opacity: 1;
  transform: translateX(0);
}

.slider-controls {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  pointer-events: none;
  padding: 0 1rem;
  z-index: 10;
}

.slider-controls button {
  background: rgba(30, 46, 40, 0.75);
  backdrop-filter: blur(8px);
  color: var(--gold);
  border: 1px solid rgba(200, 169, 110, 0.3);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  padding: 0;
  font-size: 1.3rem;
  cursor: pointer;
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition), transform var(--transition-bounce), box-shadow var(--transition);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.slider-controls button:hover {
  background: rgba(200, 169, 110, 0.25);
  transform: scale(1.12);
  box-shadow: 0 6px 20px rgba(200, 169, 110, 0.3);
}

/* ─── Featured Properties ────────────────────────────── */
.featured { margin: 2rem 0; width: 100%; }

.featured h3 {
  font-family: 'Cormorant Garamond', serif;
  color: var(--gold);
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 1px;
}

.property-list {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.property-card {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  width: 270px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-bounce), box-shadow var(--transition), border-color var(--transition);
}

.property-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: var(--shadow-lg);
  border-color: rgba(200, 169, 110, 0.3);
}

.property-card img {
  width: 100%;
  height: 175px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.property-card:hover img { transform: scale(1.06); }

.property-card .info { padding: 1.2rem; flex: 1; }
.property-card .info h4 { margin: 0 0 0.5rem 0; color: var(--cream); font-size: 1.05rem; }
.property-card .info p { color: rgba(245, 240, 232, 0.55); font-size: 0.92rem; margin-bottom: 0.8rem; }
.property-card .info .price { color: var(--gold); font-weight: 600; font-size: 1.1rem; }

/* ─── Premium Properties ─────────────────────────────── */
.enhanced-properties { margin-top: 2rem; width: 100%; }

.enhanced-properties h3 {
  font-family: 'Cormorant Garamond', serif;
  text-align: center;
  margin-bottom: 2.5rem;
  color: var(--gold);
  font-size: 2rem;
  letter-spacing: 1px;
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.premium-property-card {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-bounce), box-shadow var(--transition), border-color var(--transition);
  transform-style: preserve-3d;
  will-change: transform;
}

.premium-property-card:hover {
  border-color: rgba(200, 169, 110, 0.35);
  box-shadow: var(--shadow-lg), 0 0 0 1px rgba(200, 169, 110, 0.1);
}

.property-image-container { position: relative; overflow: hidden; }

.property-image {
  width: 100%;
  height: 210px;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-property-card:hover .property-image { transform: scale(1.07); }

.property-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 0.3rem 0.85rem;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
}

.badge-premium { background: rgba(200, 169, 110, 0.9); color: var(--forest); }
.badge-new     { background: rgba(74, 200, 110, 0.9);  color: var(--forest); }
.badge-popular { background: rgba(59, 130, 246, 0.9);  color: #fff; }

.property-content { padding: 1.5rem; }
.property-content h4 { color: var(--cream); margin-bottom: 0.5rem; font-size: 1.1rem; }
.property-content p { margin-bottom: 1rem; color: rgba(245, 240, 232, 0.55); font-size: 0.93rem; line-height: 1.6; }

.property-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.property-price {
  color: var(--gold);
  font-size: 1.15rem;
  font-weight: 600;
  font-family: 'Cormorant Garamond', serif;
}

/* ─── Project Profile ────────────────────────────────── */
.project-profile {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  width: 100%;
}

.project-profile h3 { color: var(--gold); margin-bottom: 1rem; font-size: 1.7rem; }

.project-profile ul {
  margin: 1rem auto 0;
  padding: 0;
  list-style: none;
  max-width: 520px;
}

.project-profile li {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--glass-border);
  margin-bottom: 0.6rem;
  padding: 0.8rem 1.2rem;
  border-radius: var(--radius-sm);
  color: rgba(245, 240, 232, 0.75);
  font-size: 1rem;
  text-align: left;
  transition: background var(--transition), border-color var(--transition);
}

.project-profile li:hover {
  background: var(--gold-dim);
  border-color: rgba(200, 169, 110, 0.3);
}

/* ─── Statistics ─────────────────────────────────────── */
.statistics-section { text-align: center; margin-top: 2rem; width: 100%; }

.statistics-section h3 {
  font-family: 'Cormorant Garamond', serif;
  color: var(--gold);
  font-size: 2rem;
  margin-bottom: 2rem;
}

.stats-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem 1rem;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  min-width: 120px;
  flex: 1 1 120px;
  transition: transform var(--transition-bounce), box-shadow var(--transition), border-color var(--transition);
  position: relative;
  overflow: hidden;
}

.stat-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--gold-dim), transparent);
  opacity: 0;
  transition: opacity var(--transition);
}

.stat-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-md);
  border-color: rgba(200, 169, 110, 0.4);
}

.stat-item:hover::before { opacity: 1; }

.stat-number {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--gold);
  margin-bottom: 0.4rem;
  line-height: 1;
}

.stat-label {
  color: rgba(245, 240, 232, 0.6);
  font-size: 0.88rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* ─── Awards ─────────────────────────────────────────── */
.awards-section { text-align: center; margin-top: 2rem; width: 100%; }

.awards-section h3 {
  font-family: 'Cormorant Garamond', serif;
  color: var(--gold);
  font-size: 2rem;
  margin-bottom: 2rem;
}

.awards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.award-item {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  padding: 1.5rem 1.2rem;
  border-radius: var(--radius-md);
  min-width: 170px;
  flex: 1 1 170px;
  transition: transform var(--transition-bounce), box-shadow var(--transition), border-color var(--transition);
}

.award-item:hover {
  transform: scale(1.06) translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: rgba(200, 169, 110, 0.4);
}

.award-item i {
  font-size: 2.2rem;
  color: var(--gold);
  margin-bottom: 0.6rem;
  display: block;
  transition: transform var(--transition-bounce);
}

.award-item:hover i { transform: scale(1.15) rotate(-5deg); }
.award-item h4 { margin: 0.4rem 0; color: var(--cream); font-size: 1rem; }
.award-item p { margin: 0; color: rgba(245, 240, 232, 0.5); font-size: 0.88rem; }

/* ─── Testimonials ───────────────────────────────────── */
.testimonial-item {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem 2rem;
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow var(--transition);
}

.testimonial-item:hover {
  box-shadow: var(--shadow-md);
  border-color: rgba(200, 169, 110, 0.25);
}

/* ─── Dashboard ──────────────────────────────────────── */
.dashboard-main { padding-top: 1.5rem; }
.dashboard-welcome { margin-bottom: 2rem; }

.dashboard-welcome h2 {
  font-family: 'Cormorant Garamond', serif;
  color: var(--gold);
  font-size: 1.9rem;
  margin-bottom: 0.3rem;
}

.dashboard-welcome p { color: rgba(245, 240, 232, 0.55); }

.dashboard-cards {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  width: 100%;
}

.dashboard-card {
  flex: 1 1 200px;
  min-width: 185px;
  max-width: 270px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 2rem 1.5rem 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: transform var(--transition-bounce), box-shadow var(--transition);
  position: relative;
  overflow: hidden;
}

.dashboard-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.08);
  opacity: 0;
  transition: opacity 0.2s;
}

.dashboard-card:hover { transform: translateY(-10px) scale(1.03); box-shadow: var(--shadow-lg); }
.dashboard-card:hover::after { opacity: 1; }

.dashboard-card-green  { background: linear-gradient(135deg, #2d7a4f, #43e97b); color: #fff; }
.dashboard-card-blue   { background: linear-gradient(135deg, #1a3a8a, #396afc); color: #fff; }
.dashboard-card-orange { background: linear-gradient(135deg, #8a5010, #f7971e); color: #fff; }

.dashboard-card-icon { font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.9; }
.dashboard-card-title { font-size: 1rem; font-weight: 500; margin-bottom: 0.5rem; opacity: 0.9; }
.dashboard-card-value { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 700; }

.dashboard-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  padding: 0.7rem 1.2rem;
  border-radius: var(--radius-sm);
  font-family: 'DM Sans', sans-serif;
}

.dashboard-list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  flex-wrap: wrap;
  transition: background var(--transition), padding var(--transition);
}

.dashboard-list-item:last-child { border-bottom: none; }

.dashboard-list-item:hover {
  background: var(--glass);
  border-radius: var(--radius-sm);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.dashboard-list-item img {
  width: 72px;
  height: 56px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
  transition: transform var(--transition);
}

.dashboard-list-item:hover img { transform: scale(1.05); }

.dashboard-list-info { flex: 1; min-width: 150px; }
.dashboard-list-info h4 { margin-bottom: 0.2rem; color: var(--cream); }
.dashboard-list-info p { font-size: 0.88rem; color: rgba(245, 240, 232, 0.5); }

.enquiry-avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--sage), var(--gold));
  color: var(--forest);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  flex-shrink: 0;
}

.status-badge {
  padding: 0.3rem 0.85rem;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.status-available { background: rgba(67, 233, 123, 0.2); color: #43e97b; border: 1px solid rgba(67,233,123,0.3); }
.status-sold      { background: rgba(239, 68, 68, 0.2);  color: #f87171; border: 1px solid rgba(239,68,68,0.3); }
.status-rented    { background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); }

/* ─── Auth Pages ─────────────────────────────────────── */
.auth-main { padding-top: 2rem; }

.auth-container {
  display: flex;
  gap: 2rem;
  align-items: stretch;
  flex-wrap: wrap;
  padding-top: 2rem;
}

.auth-form-card { flex: 1; min-width: 290px; }
.auth-form-card h2 { font-family: 'Cormorant Garamond', serif; color: var(--gold); margin-bottom: 0.4rem; }
.auth-form-card .subtitle { margin-bottom: 1.5rem; color: rgba(245, 240, 232, 0.5); }
.auth-form-card .footer-link { margin-top: 1rem; text-align: center; color: rgba(245, 240, 232, 0.55); }

.auth-form-card .footer-link a {
  color: var(--gold);
  font-weight: 600;
  text-decoration: none;
  transition: color var(--transition);
}

.auth-form-card .footer-link a:hover { color: var(--gold-light); }
.auth-submit-btn { width: 100%; margin-top: 0.5rem; }

.auth-features-card {
  flex: 1;
  min-width: 290px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
}

.auth-feature-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
  border-radius: var(--radius-sm);
  transition: background var(--transition);
}

.auth-feature-item:hover { background: var(--gold-dim); }
.auth-feature-icon { font-size: 2rem; flex-shrink: 0; }
.auth-feature-item h4 { margin-bottom: 0.2rem; color: var(--cream); }
.auth-feature-item p { color: rgba(245, 240, 232, 0.5); font-size: 0.93rem; }

/* ─── Messages ───────────────────────────────────────── */
.error-msg   { color: #f87171; display: none; margin-bottom: 0.5rem; font-size: 0.9rem; }
.success-msg { color: #4ade80; display: none; margin-bottom: 0.5rem; font-size: 0.9rem; }

/* ─── Contact Form ───────────────────────────────────── */
.form-contact-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
  margin: 2rem auto;
  max-width: 920px;
  width: 100%;
  flex-wrap: wrap;
}

.form-section, .get-in-touch-section { flex: 1 1 300px; }

/* ─── About Images ───────────────────────────────────── */
.about-images {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.about-images img {
  width: 100%;
  max-width: 290px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition), box-shadow var(--transition);
}

.about-images img:hover {
  transform: scale(1.03) translateY(-6px);
  box-shadow: 0 30px 70px rgba(0,0,0,0.5);
}

/* ─── Modal ──────────────────────────────────────────── */
.modal-overlay {
  display: none;
  position: fixed;
  z-index: 2000;
  left: 0; top: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.modal-overlay.active { display: flex; }

.modal-content {
  background: var(--forest-mid);
  border: 1px solid rgba(200, 169, 110, 0.25);
  color: var(--cream);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
  max-width: 420px;
  width: 100%;
  position: relative;
  text-align: center;
  animation: modalPopIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalPopIn {
  0%   { transform: scale(0.85); opacity: 0; }
  100% { transform: scale(1);    opacity: 1; }
}

.close-modal {
  position: absolute;
  top: 14px; right: 18px;
  font-size: 1.8rem;
  color: rgba(245, 240, 232, 0.5);
  cursor: pointer;
  font-weight: 300;
  transition: color var(--transition), transform var(--transition);
  line-height: 1;
}

.close-modal:hover { color: var(--gold); transform: rotate(90deg); }

.modal-content ul { list-style: none; padding: 0; margin: 1rem 0 0; text-align: left; }

.modal-content li {
  margin-bottom: 0.7rem;
  color: rgba(245, 240, 232, 0.8);
  font-size: 1rem;
  padding: 0.5rem 0.7rem;
  border-radius: var(--radius-sm);
  background: var(--glass);
}

/* ─── Footer ─────────────────────────────────────────── */
footer {
  background: linear-gradient(135deg, #111c17 0%, var(--forest-mid) 100%);
  border-top: 1px solid var(--glass-border);
  color: var(--cream);
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

.footer-map { grid-column: 1 / -1; }

.footer-map iframe {
  border: 1px solid rgba(200, 169, 110, 0.2);
  border-radius: var(--radius-md);
  width: 100%;
  height: 280px;
  box-shadow: var(--shadow-md);
  transition: border-color var(--transition);
}

.footer-map iframe:hover { border-color: rgba(200, 169, 110, 0.4); }

.footer-contact { font-size: 0.95rem; display: flex; flex-direction: column; gap: 0.6rem; }

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: rgba(245, 240, 232, 0.65);
  font-size: 0.95rem;
  transition: color var(--transition);
  cursor: pointer;
}

.contact-item:hover { color: var(--gold); }

.footer-social {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  font-size: 1.8rem;
  flex-wrap: wrap;
}

.footer-social a {
  color: rgba(245, 240, 232, 0.6);
  transition: transform var(--transition-bounce), color var(--transition);
  display: block;
}

.footer-social a:hover {
  color: var(--gold);
  transform: scale(1.25) translateY(-3px);
}

.footer-social a[aria-label="WhatsApp"]:hover { color: #25D366; }

#copy {
  grid-column: 1 / -1;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.88rem;
  color: rgba(245, 240, 232, 0.35);
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.07);
  letter-spacing: 0.04em;
}

/* ─── Header hidden state ────────────────────────────── */
.header-hidden { transform: translateY(-100%) !important; }

/* ─── Scroll Animations ──────────────────────────────── */
.anim-hidden {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.65s cubic-bezier(0.4,0,0.2,1);
}
.anim-hidden.animate-in { opacity: 1; transform: translateY(0); }
.anim-hidden.delay-1 { transition-delay: 0.1s; }
.anim-hidden.delay-2 { transition-delay: 0.2s; }
.anim-hidden.delay-3 { transition-delay: 0.3s; }
.anim-hidden.delay-4 { transition-delay: 0.4s; }

/* ─── Responsive — Tablet ────────────────────────────── */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 1.5rem;
    gap: 0.75rem;
    min-height: auto;
  }
  .navbar .logo { font-size: 1.6rem; }
  .navbar nav { flex-wrap: wrap; gap: 0.3rem; }
  .navbar nav a {
    font-size: 0.85rem;
    padding: 0.35rem 0.75rem;
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
  }
  .hero { flex-direction: column; text-align: center; padding: 2rem 1.5rem; }
  .hero-content h2 { font-size: 2rem; }
  .hero-img img { max-width: 100%; }
  .property-card { width: 100%; max-width: 360px; }
  .dashboard-cards { flex-direction: column; align-items: center; }
  .dashboard-card { width: 100%; max-width: 100%; }
  .form-contact-container { flex-direction: column; }
  .stat-number { font-size: 2.2rem; }
  footer { grid-template-columns: 1fr; }
  main { gap: 2rem; padding: 1.5rem 1rem 3rem; }
}

/* ─── Responsive — Mobile ────────────────────────────── */
@media (max-width: 480px) {
  .navbar .logo { font-size: 1.4rem; }
  .hero-content h2 { font-size: 1.7rem; }
  .hero-content p { font-size: 0.95rem; }
  .card { padding: 1.2rem; }
  .property-grid { grid-template-columns: 1fr; }
  header h1 { font-size: 2rem; }
  .about-images { flex-direction: column; align-items: center; }
  .about-images img { max-width: 100%; }
  .awards-container { flex-direction: column; align-items: center; }
  .modal-content { padding: 1.5rem 1.2rem; }
  .stat-number { font-size: 2rem; }
  .dashboard-card-value { font-size: 1.7rem; }
  footer { padding: 2rem 1rem; }
}

@media print {
  .navbar, .slider-controls, footer { display: none; }
  body { background: #fff; color: #000; }
}