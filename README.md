# 🏗️ Appaltra - Marketplace Edilizia & Artigianato

> **App mobile per collegare privati, aziende e professionisti nel settore edilizia, impiantistica e artigianato**

[![React Native](https://img.shields.io/badge/React%20Native-0.79.4-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53.0.12-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📱 Anteprima App

**Flusso completo implementato:**
- ✅ **Splash Screen** animata con logo e transizioni fluide
- ✅ **Onboarding** con selezione ruolo (Privato/Azienda/Professionista)  
- ✅ **Context API + AsyncStorage** per gestione stato globale
- ✅ **Dashboard personalizzate** per ogni tipo di utente

---

## 🚀 Funzionalità Attuali

### 🎬 **Splash Screen Professionale**
- Animazioni elastiche simmetriche (entrance/exit)
- Logo 160x160 con layout Upper Third Rule ottimizzato
- Transizione background fluida senza stacco colori
- Typography con text shadows e spacing perfetto
- Timing ~2.8 secondi con sequenza Logo → Testo → Transizione

### 🔐 **Sistema Autenticazione MVP**
- **Context API** completo con TypeScript per gestione stato globale
- **AsyncStorage** integrato per persistenza locale automatica
- **Mock Authentication** (login sempre successo per sviluppo)
- **Selezione ruolo** all'onboarding con salvataggio automatico
- **Restore session** automatico al riavvio app

### 📊 **Dashboard Personalizzate**
- **Dashboard Privato** 🏠 - Per utenti privati
- **Dashboard Azienda** 🏢 - Per aziende e imprese  
- **Dashboard Professionista** 👨‍💼 - Per artigiani e professionisti
- Animazioni professionali coerenti con splash/onboarding
- Header navigazione con back button funzionanti
- Welcome sections personalizzate per ogni ruolo

---

## 🛠️ Stack Tecnologico

| Componente | Tecnologia | Versione |
|------------|------------|----------|
| **Frontend** | React Native + Expo | RN 0.79.4, Expo 53.0.12 |
| **Linguaggio** | TypeScript | 5.x |
| **Navigazione** | React Navigation | 6.x |
| **Stato** | Context API + AsyncStorage | Built-in + 2.2.0 |
| **Animazioni** | React Native Animated API | Built-in |
| **UI** | Custom Design System | TailwindCSS-inspired |

---

## 🏃‍♂️ Quick Start

### Prerequisiti
- Node.js 18+ 
- npm o yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app su dispositivo mobile

### Installazione
```bash
# Clona la repository
git clone https://github.com/[username]/appaltra-clean.git
cd appaltra-clean/AppaltraClean

# Installa dipendenze
npm install

# Avvia il server di sviluppo
npm start
```

### Test su Dispositivo
1. Scansiona il QR code con Expo Go
2. **iOS:** Se touch non funziona, usa gesto 3 dita per attivare (bug noto Expo Go + RN 0.79)
3. Testa il flusso: Splash → Onboarding → Dashboard

---

## 📁 Struttura Progetto

```
AppaltraClean/
├── src/
│   ├── components/          # Componenti riutilizzabili
│   │   ├── DashboardHeader.tsx
│   │   └── JobCard.tsx
│   ├── constants/           # Costanti e configurazioni
│   │   ├── colors.ts        # Palette colori app
│   │   └── styles.ts        # Stili globali
│   ├── contexts/            # Context API
│   │   └── UserContext.tsx  # Gestione stato utente globale
│   ├── navigation/          # Navigazione app
│   │   └── AppNavigator.tsx # Stack navigator principale
│   ├── screens/             # Schermate principali
│   │   ├── SplashScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── DashboardPrivatoScreen.tsx
│   │   ├── DashboardAziendaScreen.tsx
│   │   └── DashboardProScreen.tsx
│   └── types/               # Definizioni TypeScript
│       └── navigation.ts
├── assets/                  # Risorse statiche
└── docs/
    └── Appaltra_plan_REBUILT_TODO.md  # Documentazione completa
```

---

## 🎨 Design System

### 🌈 Palette Colori
```typescript
// Colori principali
PRIMARY: '#2563EB'        // Blu professionale
SECONDARY: '#F59E0B'      // Arancione
BACKGROUND: '#F8FAFC'     // Sfondo chiaro
TEXT_DARK: '#1E293B'      // Testo scuro
TEXT_LIGHT: '#64748B'     // Testo chiaro
WHITE: '#FFFFFF'          // Bianco
```

### 🎭 Principi Design
- **Animazioni elastiche** con bounce naturale
- **Typography ottimizzata** con shadows e spacing
- **Layout Upper Third Rule** per splash e onboarding
- **Feedback visivo** su tutti gli elementi interattivi
- **Coerenza visiva** tra tutte le schermate

---

## 🗺️ Roadmap Sviluppo

### 🔥 **STEP 1: Context API + AsyncStorage** ✅ **COMPLETATO**
- ✅ UserContext con TypeScript completo
- ✅ AsyncStorage per persistenza locale
- ✅ Mock authentication funzionante
- ✅ Integrazione OnboardingScreen + Dashboard

### 🎯 **STEP 2: LoginScreen** (Prossimo)
- LoginScreen.tsx con animazioni professionali
- Form email/password con validazioni UI
- Utilizzo mock authentication del Context
- Transizioni fluide da Onboarding

### 📱 **STEP 3: Tab Navigation** (In pianificazione)
- React Navigation Bottom Tabs
- Tab personalizzate per ogni ruolo:
  - **Privato:** Home, Lavori, Cerca, Chat, Settings
  - **Azienda:** Dashboard, Appalti, Team, Report, Settings
  - **Professionista:** Profilo, Lavori, Offerte, Chat, Stats

### 🔄 **STEP 4: Backend Reale** (Futuro)
- Firebase/Supabase integration
- Autenticazione reale con email/password
- Database profili utente
- Sistema password reset e email verification

---

## 🐛 Debug & Sviluppo

### 📊 **Sistema Log Integrato**
```typescript
// Esempi log disponibili
🎬 Starting splash animation sequence...
🎯 Ruolo selezionato: Privato
✅ Role set: Privato
👤 User data: {"user": {...}, "isLoggedIn": false}
```

### 🧪 **Modalità Sviluppo**
- **Expo Go:** Funzionante con workaround iOS (gesto 3 dita)
- **Hot Reload:** Supportato con navigazione corretta
- **Development Build:** Raccomandato per produzione

### ⚠️ **Limitazioni Note**
- **iOS + Expo Go:** Occasionalmente richiede gesto 3 dita per touch
- **New Architecture:** Sempre attiva in Expo Go (limitazione nota)

---

## 🤝 Contributi

Questo è un progetto in sviluppo attivo. Per contribuire:

1. Fork del progetto
2. Crea feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Apri Pull Request

---

## 📄 Licenza

Distribuito sotto licenza MIT. Vedi `LICENSE` per maggiori informazioni.

---

## 📞 Contatti

**Progetto Link:** [https://github.com/[username]/appaltra-clean](https://github.com/[username]/appaltra-clean)

---

## 🙏 Ringraziamenti

- [React Native](https://reactnative.dev/) per il framework mobile
- [Expo](https://expo.dev/) per il tooling di sviluppo
- [React Navigation](https://reactnavigation.org/) per la navigazione
- Community React Native per il supporto e le risorse

---

<div align="center">
  <strong>Costruito con ❤️ per il settore edilizia e artigianato</strong>
</div> 