import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Database,
  ShieldCheck,
  Smartphone,
  WifiOff,
  Code2,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  Cpu,
  Building,
} from 'lucide-react';
import { AcademicLevel, AILearningMode } from '../types';

interface BuildForEthiopiaProps {
  studentLevel: AcademicLevel;
  onLaunchAIMode: (mode: AILearningMode, prompt: string) => void;
}

export const BuildForEthiopia: React.FC<BuildForEthiopiaProps> = ({
  studentLevel,
  onLaunchAIMode,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const ethiopianChallenges = [
    {
      id: 'eth-1',
      title: 'Kebele Resident Registry & Digital Verification Portal',
      domain: 'Public Sector & Governance',
      difficulty: 'Intermediate to Advanced',
      impact: 'Eliminates lost paper files and physical queuing for resident ID renewal.',
      summary:
        'A secure, lightweight citizen identity portal for Kebele administrations. Enables biometric or photo verification, family lineage tracking, and verifiable QR codes for residency proof.',
      keyArchitectures: [
        'PostgreSQL with UUID primary keys and temporal valid_from / valid_until validity timestamps',
        'HMAC-SHA256 signed JWT tokens embedded inside high-error-correction QR codes for offline police/bank verification',
        'Role-Based Access Control (RBAC): Clerk, Kebele Administrator, and Regional Auditor roles',
      ],
      sampleSchema: `-- Kebele Resident Schema
CREATE TABLE residents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    national_fayda_id VARCHAR(50) UNIQUE,
    kebele_number VARCHAR(10) NOT NULL,
    woreda VARCHAR(50) NOT NULL,
    subcity VARCHAR(50) NOT NULL,
    full_name_amharic VARCHAR(150) NOT NULL,
    full_name_english VARCHAR(150) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    house_number VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE id_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resident_id UUID REFERENCES residents(id),
    verification_hash TEXT NOT NULL,
    verified_by VARCHAR(100),
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`,
      starterPrompt:
        'Help me architect the backend for a Kebele Resident Registry in Ethiopia using Node.js, Express, and PostgreSQL, focusing on role-based security and QR code generation for offline validity verification.',
    },
    {
      id: 'eth-2',
      title: 'Merkato Merchant Wholesale Invoicing & Offline Sync',
      domain: 'Commerce & Logistics',
      difficulty: 'Intermediate',
      impact: 'Enables high-volume Merkato traders to record sales during 3G/4G network drops.',
      summary:
        'Addis Ababa’s Merkato processes massive daily commerce where connections often stall. This app stores transactions instantly in browser IndexedDB, prints Bluetooth receipts, and syncs to a central cloud server when online.',
      keyArchitectures: [
        'IndexedDB on the client with Dexie.js for lightning-fast zero-latency offline writes',
        'Service Worker Background Sync with exponential backoff retry queue',
        'PostgreSQL backend with idempotency keys to guarantee no double-counting of inventory or sales',
      ],
      sampleSchema: `// Client-side Offline Transaction Dispatcher
async function recordMerkatoSale(saleData) {
  const transactionId = crypto.randomUUID();
  const payload = {
    ...saleData,
    localId: transactionId,
    timestamp: new Date().toISOString(),
    synced: false
  };

  // 1. Save locally first (never block user)
  await db.localSales.add(payload);

  // 2. Attempt sync if navigator is online
  if (navigator.onLine) {
    try {
      await fetch('/api/sales/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      await db.localSales.update(transactionId, { synced: true });
    } catch (e) {
      console.log('Queued for background sync when network stabilizes.');
    }
  }
}`,
      starterPrompt:
        'Show me how to build an offline-first inventory and receipting app for a merchant in Merkato, Addis Ababa using React and Dexie.js IndexedDB with sync reconciliation.',
    },
    {
      id: 'eth-3',
      title: 'Telebirr & Chapa Webhook Idempotency & Reconciler',
      domain: 'FinTech & Payments',
      difficulty: 'Advanced / Production',
      impact: 'Guarantees bank-grade financial integrity for Ethiopian online apps.',
      summary:
        'When customers pay using Telebirr SuperApp, CBE Birr, or Chapa, payment confirmation webhooks can be retried due to mobile packet loss. This engine ensures every payment is verified cryptographically and processed exactly once.',
      keyArchitectures: [
        'HMAC SHA-256 signature verification on raw request buffers before JSON parsing',
        'PostgreSQL database transactions with SELECT ... FOR UPDATE or UNIQUE constraints on transaction references',
        'Immediate 200 OK acknowledgment to prevent gateway retry floods, followed by worker event dispatch',
      ],
      sampleSchema: `// Webhook Verification & Idempotency Handler
import crypto from 'crypto';

export async function handleChapaWebhook(req, res, db) {
  const signature = req.headers['x-chapa-signature'];
  const secretKey = process.env.CHAPA_SECRET_KEY;
  
  // Verify signature
  const hash = crypto.createHmac('sha256', secretKey)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash !== signature) {
    return res.status(401).json({ error: 'Tampered webhook payload' });
  }

  const { tx_ref, amount, status } = req.body;

  // Idempotent insertion
  const query = \`
    INSERT INTO payment_orders (tx_ref, amount_etb, status, verified_at)
    VALUES ($1, $2, $3, NOW())
    ON CONFLICT (tx_ref) DO NOTHING
    RETURNING id;
  \`;
  
  const result = await db.query(query, [tx_ref, amount, status]);
  return res.status(200).json({ received: true, inserted: result.rowCount > 0 });
}`,
      starterPrompt:
        'Explain step-by-step how to integrate Chapa and Telebirr payment webhooks in an Express.js backend with cryptographic verification and idempotency keys in PostgreSQL.',
    },
    {
      id: 'eth-4',
      title: 'Rural Health Center Patient Records (EHR) with P2P Mesh Sync',
      domain: 'Healthcare & Public Health',
      difficulty: 'Advanced / Capstone',
      impact: 'Maintains immunization and maternal records in clinics with zero internet access.',
      summary:
        'Woreda health posts often operate with days of total internet blackout. Nurses record patient visits on Android tablets or low-spec laptops, syncing locally over Wi-Fi direct or USB drives to district hospitals.',
      keyArchitectures: [
        'SQLite / Room Database on Android or SQLite via Electron/Node on PC',
        'Conflict-Free Replicated Data Types (CRDTs) to merge vaccination records without data loss',
        'End-to-End Encryption (AES-GCM-256) protecting sensitive medical history',
      ],
      sampleSchema: `-- Healthcare Offline Sync Ledger
CREATE TABLE patient_encounters (
    id UUID PRIMARY KEY,
    patient_mrn VARCHAR(50) NOT NULL,
    clinic_code VARCHAR(30) NOT NULL,
    encounter_type VARCHAR(50) NOT NULL,
    diagnosis_icd10 VARCHAR(20),
    vital_bp_systolic INT,
    vital_bp_diastolic INT,
    nurse_notes TEXT,
    device_version_vector JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL
);`,
      starterPrompt:
        'Architect a local-first electronic medical records system for rural health posts in Ethiopia that can sync patient encounters without continuous internet.',
    },
    {
      id: 'eth-5',
      title: 'ECX Agricultural Crop Pricing & Telegram Alert Bot',
      domain: 'Agriculture & Agritech',
      difficulty: 'Beginner to Intermediate',
      impact: 'Protects coffee, teff, sesame, and grain farmers from predatory broker markups.',
      summary:
        'Scrapes or receives daily commodity trading settlement prices from the Ethiopian Commodity Exchange (ECX) and distributes localized price updates in Amharic, Afaan Oromo, and Tigrinya via automated Telegram bot and SMS.',
      keyArchitectures: [
        'Python web scraper with BeautifulSoup / Playwright or automated RSS/API ingestion',
        'python-telegram-bot or grammY with multilingual command handlers',
        'Redis cache storing daily highest/lowest settlement prices per quintal',
      ],
      sampleSchema: `# ECX Daily Price Ingestion Pipeline
import httpx
from datetime import datetime

COMMODITIES = ['Jimma Coffee G5', 'Sidama Coffee G2', 'White Teff (Adaa)', 'Gondar Sesame']

def parse_commodity_update(raw_data):
    return {
        "timestamp": datetime.utcnow().isoformat(),
        "crop": raw_data["name"],
        "origin": raw_data["origin"],
        "price_per_quintal_etb": raw_data["settlement_price"],
        "change_percentage": raw_data["pct_change"]
    }
`,
      starterPrompt:
        'Help me create a Telegram bot using Node.js or Python that delivers daily Ethiopian agricultural commodity prices (ECX) in Amharic and English to farmers and traders.',
    },
    {
      id: 'eth-6',
      title: 'Amharic & Afaan Oromo Text Normalization & Sentiment Engine',
      domain: 'Artificial Intelligence & NLP',
      difficulty: 'Advanced / AI Lab',
      impact: 'Enables Ethiopian businesses to analyze customer support messages and social feedback.',
      summary:
        'Ethiopic script (Fidäl) features many homophonous characters (ሀ, ሐ, ኀ, ኻ or ሰ, ሠ). This Python/TypeScript library normalizes redundant characters, transliterates to Latin, and classifies sentiment for customer messages.',
      keyArchitectures: [
        'Fidäl character mapping tables for standard homophone reduction',
        'FastAPI microservice deploying fine-tuned AfroXLMR or modern Gemini embeddings',
        'Browser-side virtual keyboard with automatic phonetic transliteration',
      ],
      sampleSchema: `// Amharic Character Normalization Filter
export function normalizeAmharicText(input: string): string {
  return input
    // Normalize forms of Ha
    .replace(/[ሐኀኻ]/g, 'ሀ')
    .replace(/[ሑኁኹ]/g, 'ሁ')
    .replace(/[ሒኂኺ]/g, 'ሂ')
    .replace(/[ሓኃኻ]/g, 'ሃ')
    .replace(/[ሔኄኼ]/g, 'ሄ')
    .replace(/[ሕኅኽ]/g, 'ህ')
    .replace(/[ሖኆኾ]/g, 'ሆ')
    // Normalize forms of Sa
    .replace(/ሠ/g, 'ሰ')
    .replace(/ሡ/g, 'ሱ')
    .replace(/ሢ/g, 'ሲ')
    .replace(/ሣ/g, 'ሳ')
    .replace(/ሤ/g, 'ሴ')
    .replace(/ሥ/g, 'ስ')
    .replace(/ሦ/g, 'ሶ')
    // Normalize forms of A
    .replace(/ዐ/g, 'አ')
    .replace(/ዑ/g, 'ኡ')
    .replace(/ዒ/g, 'ኢ')
    .replace(/ዓ/g, 'ኣ')
    .replace(/ዔ/g, 'ኤ')
    .replace(/ዕ/g, 'እ')
    .replace(/ዖ/g, 'ኦ');
}`,
      starterPrompt:
        'Provide a complete Amharic and Afaan Oromo text normalization script in Python or TypeScript with character deduping and stopwords removal for Ethiopian NLP.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase tracking-wider">
              National Engineering Hub 🇪🇹
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            Build for Ethiopia — High-Impact Software Solutions
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Solve systemic problems across public administration, commerce, agriculture, healthcare, and payments with production-grade engineering.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              onLaunchAIMode(
                'project',
                `As a ${studentLevel} student in Ethiopia, analyze which local problem (Kebele, Merkato, Agriculture, FinTech) provides the strongest capstone or portfolio impact for my career.`
              )
            }
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Consult AI on Local Tech Ideas</span>
          </button>
        </div>
      </div>

      {/* Grid of Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ethiopianChallenges.map((item) => (
          <div
            key={item.id}
            className="p-5 sm:p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-bold">
                    {item.domain}
                  </span>
                  <h3 className="font-bold text-white text-base sm:text-lg mt-1.5">
                    {item.title}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                  {item.difficulty}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300/90">
                <strong className="block text-amber-400 mb-0.5">Real Ethiopian Impact:</strong>
                {item.impact}
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                {item.summary}
              </p>

              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400 block mb-1.5">
                  Core Engineering Architectural Pillars:
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {item.keyArchitectures.map((arch, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{arch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1 font-mono">
                  <span>Architecture & Schema Template</span>
                  <button
                    onClick={() => handleCopy(item.id, item.sampleSchema)}
                    className="hover:text-white flex items-center gap-1"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-48">
                  {item.sampleSchema}
                </pre>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
              <span className="text-[11px] text-neutral-500 font-mono">
                Ethio CSE AI Verified Blueprint
              </span>
              <button
                onClick={() => onLaunchAIMode('project', item.starterPrompt)}
                className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Launch in Project Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
