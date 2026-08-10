export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export interface PhoneApiData {
  id: number;
  image: string;
  name: string;
  couleur: string;
  prix: number | string;
  stockage: number | string;
  etat: string;
  id_marque: number;
  id_categorie: number;
  disponibilite: string;
  created_at?: string;
  updated_at?: string;
  marque?: MarqueApiData;
  categorie?: CategorieApiData;
}

export interface MarqueApiData {
  id: number;
  nom: string;
  created_at?: string;
  updated_at?: string;
}

export interface CategorieApiData {
  id: number;
  nom: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogApiData {
  id: number;
  titre: string;
  type: string;
  contenu: string;
  image?: string;
  auteur: string;
  date_publication: string;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceApiData {
  id: number;
  nom: string;
  prix: number | string;
  description: string;
  avantages?: string;
  populaire?: number;
  promotion?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ClientApiData {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  code_post: string;
  ville: string;
  created_at?: string;
  updated_at?: string;
}

export interface ReservationPayload {
  id_service: number;
  id_client: number;
  date: string;
  statut: string;
}

export interface ReservationApiData extends ReservationPayload {
  id: number;
  created_at?: string;
  updated_at?: string;
  client?: ClientApiData;
  service?: ServiceApiData;
}

export interface ContactPayload {
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  email: string;
}

export interface ContactApiData extends ContactPayload {
  id: number;
  created_at?: string;
  updated_at?: string;
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || `Erreur API: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  return response.json();
}

export const api = {
  // Phones
  getPhones: () => request<PhoneApiData[]>("/phones"),
  getPhone: (id: number) => request<PhoneApiData>(`/phones/${id}`),

  // Categories & Marques
  getCategories: () => request<CategorieApiData[]>("/categories"),
  getMarques: () => request<MarqueApiData[]>("/marques"),

  // Blogs
  getBlogs: () => request<BlogApiData[]>("/blogs"),
  getBlog: (id: number) => request<BlogApiData>(`/blogs/${id}`),

  // Services
  getServices: () => request<ServiceApiData[]>("/services"),
  getService: (id: number) => request<ServiceApiData>(`/services/${id}`),

  // Clients & Reservations
  createClient: (data: Omit<ClientApiData, "id">) =>
    request<{ message: string; data: ClientApiData }>("/clients", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  createReservation: (data: ReservationPayload) =>
    request<{ message: string; data: ReservationApiData }>("/reservations", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Contact
  sendContact: (data: ContactPayload) =>
    request<{ message: string; data: ContactApiData }>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
