export const site = {
  name: "Hiba Malik",
  role: "Software engineer",
  email: "hibamalik_99@outlook.com",
  phone: "+92 301 3339111 | +966 57 0572987",
  linkedin: "https://www.linkedin.com/in/hiba-malik-019/",
  github: "https://github.com/Hiba-Malik",
  location: "Pakistan · open to remote & relocation",
  cv: "/Hiba_Malik_SE_CV.pdf",
}

export const hero = {
  kicker: "A chronicle",
  title: "Hiba Malik",
  lines: [
    "I architect new technology from scratch.",
    "Four years in blockchain, now building with AI.",
  ],
  lede: "Software engineer. Traditional problem-solver. Currently crossing from blockchain systems into AI — with dark coffee, fantasy novels, and a heterochromatic cat named Prince.",
}

export const nav = [
  { href: "#prologue", label: "Prologue" },
  { href: "#chronicle", label: "Chronicle" },
  { href: "#artifacts", label: "Work" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#companion", label: "Prince" },
  { href: "#summon", label: "Contact" },
]

export const about = {
  heading: "Prologue",
  body: [
    "I like hard problems, a compiler that does not lie, and the satisfaction of a clean design that survives contact with production. Four years of that instinct went into ledgers, contracts, and distributed systems.",
    "The work taught me how to own a domain end-to-end — research, architecture, implementation, production. I am pointing that same instinct at AI now: agents, LLMs, RAG, systems that reason as well as settle.",
    "Off-screen I drink too much coffee, disappear into fantasy books, and share a desk with Prince — a white cat with one blue eye and one hazel. He is not a pet. He knows.",
  ],
  facts: [
    { label: "Origin", value: "COMSATS · Silver Medalist" },
    { label: "Craft", value: "4 years full-stack & systems" },
    { label: "Chapter", value: "Blockchain → AI" },
    { label: "Companion", value: "Prince, the editor-in-chief" },
  ],
}

export const chapters = [
  {
    id: "origin",
    roman: "I",
    title: "The forge",
    years: "2018 — 2022",
    place: "COMSATS University, Pakistan",
    image: "/portraits/graduation.jpeg",
    imageAlt: "Graduation at COMSATS University Islamabad, 2022",
    summary:
      "Bachelor’s in Software Engineering. Silver medal. My final-year project put health records on a blockchain, and I was hooked by the security and ownership it offered. Building it on Hyperledger, with almost no guidance online, taught me I could take on problems no one had mapped out.",
    beats: [
      "Learned to hold a whole system in my head, not just a feature.",
      "Left with a medal, a thesis, and a taste for problems that do not have Stack Overflow answers.",
    ],
  },
  {
    id: "ledger",
    roman: "II",
    title: "The ledger",
    years: "2022 — 2025",
    place: "ArgonTech · Lahore",
    image: "/portraits/red-night.jpeg",
    imageAlt: "Hiba at night, coffee in hand",
    summary:
      "Blockchain and backend engineer. Marketplaces, wallets, retries, gas, audits. Traditional engineering under a Web3 costume — cron jobs, Postgres, and making flaky networks behave.",
    beats: [
      "Off-chain signing that cut on-chain gas costs by 30%.",
      "Account abstraction so crypto and non-crypto users could transact without gas — adoption up 60%.",
      "A retry system for failed chain transactions that lifted marketplace reliability by 95%.",
      "Smart contracts scored 97% on a Hacken audit.",
      "DevOps on AWS and Google Cloud, because the chain is only as good as the box it runs on.",
    ],
  },
  {
    id: "crossing",
    roman: "III",
    title: "The crossing",
    years: "2025 — 2026",
    place: "DroppGroup · Dubai",
    image: "/portraits/snow.jpeg",
    imageAlt: "Hiba in a blood-red coat against snow",
    summary:
      "Tokens, vaults, a sovereign ledger, and the first real overlap with AI. This is where the plot turns.",
    beats: [
      "Led the D-GN token launch on PumpFund — 30,000+ transfers in the first weeks.",
      "Designed Solana vesting for ~600M tokens, Fireblocks vaults, and a Next.js dashboard that claimed against live contract state.",
      "Built a dual-chain Substrate network with custom consensus, DIDs for AI agents, and a chain explorer.",
      "droppRWA: compliance-aware tokenization. Contributed to Saudi Arabia's first tokenized property title-deed transfer (Feb 2026).",
      "droppOne: agentic workflows that execute, settle, and govern tokenized assets on-chain. The chain started talking to models.",
    ],
  },
  {
    id: "new-page",
    roman: "IV",
    title: "The new page",
    years: "Now",
    place: "Independent · AI engineering",
    image: "/portraits/build.jpeg",
    imageAlt: "Hiba in front of a BUILD TOGETHER mural",
    summary:
      "I am not abandoning the ledger. I am taking everything it taught me — distributed systems, adversarial environments, production ownership — and writing the AI chapter on purpose.",
    beats: [
      "Stack I am deepening: Python, FastAPI, LLM APIs, RAG, agents, generative systems.",
      "Certifications so far: Hugging Face and Anthropic — the paper trail for the chapter I am writing.",
      "What I keep: TypeScript, Nest, React/Next, Postgres, the habit of shipping.",
      "The thesis: the interesting work is at the seam — models that act, systems that settle, software you can still debug at 2 a.m. with coffee.",
    ],
  },
]

export const experience = [
  {
    company: "DroppGroup",
    role: "Blockchain / Full-stack",
    dates: "May 2025 — May 2026",
    place: "Dubai, UAE",
  },
  {
    company: "ArgonTech",
    role: "Blockchain / Backend",
    dates: "Jul 2022 — Apr 2025",
    place: "Lahore, Pakistan",
  },
]

export const artifacts = [
  {
    title: "droppRWA",
    tag: "The sovereign ledger",
    era: "Crossing",
    href: "https://dropprwa.com/",
    stack: ["Substrate", "NestJS", "Next.js", "AI agents"],
    body: "Dual-layer chain for tokenized real-world assets. Compliance in the contract. Agentic settlement on droppOne. Used in Saudi Arabia's first tokenized property title-deed transfer.",
  },
  {
    title: "Vesting dashboard",
    tag: "The vault",
    era: "Crossing",
    stack: ["Next.js", "Solana", "Fireblocks", "MongoDB"],
    body: "Indexers, live contract reads, role-aware Fireblocks auth, and claim flows that refresh only what changed. Built for distributing ~600M DGN.",
  },
  {
    title: "Galileo Protocol",
    tag: "The marketplace",
    era: "Ledger",
    href: "https://www.galileoprotocol.io/",
    stack: ["PostgreSQL", "GraphQL", "React", "Ethers"],
    body: "Physical NFT marketplace. Postgres as source of truth, cron retries for flaky chain writes, MetaMask and Magic wallets on the frontend.",
  },
  {
    title: "Katana Inu",
    tag: "The game economy",
    era: "Ledger",
    href: "https://www.katanainu.com/",
    stack: ["Solidity", "WebSockets", "MongoDB", "Electron"],
    body: "In-game NFT marketplace with staking, factory ERC-721s, EIP-712 listings, affiliate tracking, and a live wallet bridge between Electron and React.",
  },
]

export const skills = {
  keep: ["TypeScript", "JavaScript", "Go", "Rust", "Solidity", "Python"],
  systems: ["Node.js", "NestJS", "React", "Next.js", "FastAPI", "GraphQL", "PostgreSQL", "MongoDB"],
  infra: ["AWS", "Google Cloud", "Docker", "Linux"],
  chain: ["Ethereum", "Solana", "Substrate", "Hyperledger"],
  next: ["LLM APIs", "RAG", "AI agents", "Generative AI"],
}

export const companion = {
  heading: "The companion",
  name: "Prince",
  species: "White cat · editor-in-chief",
  eyes: "One blue. One hazel. He will not explain this.",
  body: "Prince: occupant, critic, and the reason the chair is never empty. He does not sit for portraits — reputation to maintain — so the pixel version in game mode is the canonical likeness until he cooperates.",
}

export const contact = {
  heading: "Summon",
  body: "If you are building something at the seam of systems and intelligence — or you just want to talk books and backends — write to me.",
  cta: "Write to me",
  finis: "The rest is unwritten.",
}

export const gameCopy = {
  toggle: "Quest mode",
  how: "How to play",
  move: "move",
  jump: "jump",
  drop: "drop through",
  explore: "explore",
  goal: "Help Prince collect five coffees along the chronicle.",
  hud: "coffees",
  winTitle: "Fully caffeinated",
  winBody: "Prince approves. Time to ship.",
  deadTitle: "The coffee went cold",
  deadBody: "Prince missed the ledge.",
  retry: "Try again",
  hint: "or press space",
}
