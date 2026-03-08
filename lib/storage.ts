import type { VAUser, QuoteResult, PreQuoteForm } from "./types"

const KEYS = {
  currentUser: "lava_current_user",
  currentEmail: "lava_current_email",
  currentRole: "lava_current_role",
  users: "lava_users",
  quotes: "lava_quotes",
  preQuoteForms: "lava_pre_quote_forms",
}

// --- Current User ---
export function getCurrentUser(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(KEYS.currentUser)
}

export function getCurrentEmail(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(KEYS.currentEmail)
}

export function getUserRole(): "student" | "trainer" {
  if (typeof window === "undefined") return "student"
  const role = localStorage.getItem(KEYS.currentRole)
  return role === "trainer" ? "trainer" : "student"
}

export function setUserRole(role: "student" | "trainer"): void {
  localStorage.setItem(KEYS.currentRole, role)
}

export function setCurrentUser(name: string, email?: string): void {
  localStorage.setItem(KEYS.currentUser, name)
  if (email) {
    localStorage.setItem(KEYS.currentEmail, email)
  }
  // Upsert VA user record
  const users = getUsers()
  const existing = users.find((u) => u.name === name || u.email === email)
  if (existing) {
    existing.loginCount += 1
    existing.lastLogin = new Date().toISOString()
    if (email) existing.email = email
  } else {
    users.push({
      name,
      email: email || "",
      loginCount: 1,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    })
  }
  localStorage.setItem(KEYS.users, JSON.stringify(users))
}

export function clearCurrentUser(): void {
  localStorage.removeItem(KEYS.currentUser)
  localStorage.removeItem(KEYS.currentEmail)
  localStorage.removeItem(KEYS.currentRole)
}

// --- VA Users ---
export function getUsers(): VAUser[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEYS.users)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// --- Quotes ---
export function getQuotes(): QuoteResult[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEYS.quotes)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function getQuotesByUser(vaName: string): QuoteResult[] {
  return getQuotes().filter((q) => q.vaName === vaName)
}

export function getAllQuotes(): QuoteResult[] {
  return getQuotes()
}

export function saveQuote(quote: QuoteResult): void {
  const quotes = getQuotes()
  quotes.unshift(quote)
  localStorage.setItem(KEYS.quotes, JSON.stringify(quotes))
}

export function getQuoteById(id: string): QuoteResult | null {
  return getQuotes().find((q) => q.id === id) || null
}

export function generateQuoteId(): string {
  return `Q-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
}

// --- Pre-Quote Forms ---
export function getPreQuoteForms(): PreQuoteForm[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEYS.preQuoteForms)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function savePreQuoteForm(form: PreQuoteForm): void {
  const forms = getPreQuoteForms()
  forms.unshift(form)
  localStorage.setItem(KEYS.preQuoteForms, JSON.stringify(forms))
}

export function getCurrentPreQuoteForm(): PreQuoteForm | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem("lava_current_pre_quote")
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setCurrentPreQuoteForm(form: PreQuoteForm): void {
  localStorage.setItem("lava_current_pre_quote", JSON.stringify(form))
}

export function clearCurrentPreQuoteForm(): void {
  localStorage.removeItem("lava_current_pre_quote")
}
