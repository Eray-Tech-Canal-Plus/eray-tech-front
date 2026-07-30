import axios, { AxiosAdapter, InternalAxiosRequestConfig } from 'axios';

// Interface Types
export interface Product {
  id: string;
  nom: string;
  prix: number;
  description: string;
  image: string;
  stock: number;
}

export interface Post {
  id: string;
  titre: string;
  contenu: string;
  image: string;
  date: string;
}

export interface Service {
  id: string;
  nom: string;
  description: string;
  prix: number;
}

export interface Reservation {
  id: string;
  nomClient: string;
  serviceChoisi: string;
  date: string;
  heure: string;
  adresse: string;
  statut: 'pending' | 'confirmed' | 'cancelled';
}

// Initial Mock Seed Data
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    nom: 'iPhone 15 Pro Max 256GB',
    prix: 850000,
    description: 'Puce A17 Pro, design en titane, écran Super Retina XDR 6.7 pouces.',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    stock: 12,
  },
  {
    id: 'prod-2',
    nom: 'Samsung Galaxy S24 Ultra',
    prix: 790000,
    description: 'Galaxy AI intégré, appareil photo 200 MP, S Pen inclus.',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
    stock: 8,
  },
  {
    id: 'prod-3',
    nom: 'Décodeur Canal+ HD Dual',
    prix: 25000,
    description: 'Décodeur haute définition avec enregistreur et accès myCANAL.',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80',
    stock: 25,
  },
  {
    id: 'prod-4',
    nom: 'Écouteurs AirPods Pro 2',
    prix: 145000,
    description: 'Réduction active du bruit jusqu’à 2x plus efficace et audio spatial.',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80',
    stock: 4,
  },
];

const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    titre: 'Nouveaux bouquets Canal+ disponibles ce mois-ci',
    contenu: 'Découvrez les toutes nouvelles chaînes de divertissement et de sport incluses dans les offres de réabonnement Canal+ d’Eray Tech.',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=600&q=80',
    date: '2026-07-28',
  },
  {
    id: 'post-2',
    titre: 'Comment bien choisir son smartphone en 2026',
    contenu: 'Guide d’achat complet entre iOS et Android : autonomie, puissance photo et rapport qualité-prix.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    date: '2026-07-25',
  },
  {
    id: 'post-3',
    titre: 'Installation parabole : Conseils pour une réception optimale',
    contenu: 'Nos techniciens vous expliquent les meilleures pratiques d’orientation et de réglage pour éviter toute perte de signal.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    date: '2026-07-20',
  },
];

const INITIAL_SERVICES: Service[] = [
  {
    id: 'serv-1',
    nom: 'Installation & Réglage Parabole Canal+',
    description: 'Pose complète de parabole, câblage professionnel et pointage du signal HD.',
    prix: 15000,
  },
  {
    id: 'serv-2',
    nom: 'Réparation & Diagnostic Smartphone',
    description: 'Remplacement d’écran, batterie, connecteur de charge avec pièces d’origine.',
    prix: 10000,
  },
  {
    id: 'serv-3',
    nom: 'Réabonnement Express Canal+',
    description: 'Activation immédiate de vos formules Canal+ sans interruption de service.',
    prix: 5000,
  },
  {
    id: 'serv-4',
    nom: 'Maintenance Réseau & Smart TV',
    description: 'Configuration Wi-Fi, paramétrage IPTV/Smart TV et optimisation à domicile.',
    prix: 20000,
  },
];

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-1',
    nomClient: 'Mamadou Diallo',
    serviceChoisi: 'Installation & Réglage Parabole Canal+',
    date: '2026-08-02',
    heure: '10:30',
    adresse: 'Dakar, Mermoz Pyrotechnie villa 42',
    statut: 'pending',
  },
  {
    id: 'res-2',
    nomClient: 'Aïssatou Ndiaye',
    serviceChoisi: 'Réparation & Diagnostic Smartphone',
    date: '2026-08-01',
    heure: '14:00',
    adresse: 'Dakar, Sacré-Cœur 3',
    statut: 'confirmed',
  },
  {
    id: 'res-3',
    nomClient: 'Ousmane Sow',
    serviceChoisi: 'Maintenance Réseau & Smart TV',
    date: '2026-07-31',
    heure: '16:15',
    adresse: 'Dakar, Almadies Route des Almadies',
    statut: 'cancelled',
  },
];

// Helper Storage Manager
function getStorage<T>(key: string, initialData: T): T {
  if (typeof window === 'undefined') return initialData;
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return initialData;
  }
}

function setStorage<T>(key: string, data: T): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

// Axios Mock Custom Adapter Implementation
const customMockAdapter: AxiosAdapter = async (config: InternalAxiosRequestConfig) => {
  const { url = '', method = 'get', data } = config;
  const parsedData = data ? (typeof data === 'string' ? JSON.parse(data) : data) : null;
  
  // Simulate network latency (300ms)
  await new Promise((resolve) => setTimeout(resolve, 350));

  const cleanUrl = url.replace(/^(?:https?:\/\/[^\/]+)?/, '');

  // 1. PRODUCTS ENDPOINTS (/api/products)
  if (cleanUrl.startsWith('/api/products')) {
    let products = getStorage<Product[]>('eray_admin_products', INITIAL_PRODUCTS);
    const idMatch = cleanUrl.match(/\/api\/products\/([^\/]+)/);
    const targetId = idMatch ? idMatch[1] : null;

    if (method.toLowerCase() === 'get') {
      return {
        data: products,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    }

    if (method.toLowerCase() === 'post') {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        nom: parsedData.nom || 'Nouveau Produit',
        prix: Number(parsedData.prix) || 0,
        description: parsedData.description || '',
        image: parsedData.image || 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=600&q=80',
        stock: Number(parsedData.stock) || 0,
      };
      products = [newProduct, ...products];
      setStorage('eray_admin_products', products);
      return { data: newProduct, status: 201, statusText: 'Created', headers: {}, config };
    }

    if ((method.toLowerCase() === 'put' || method.toLowerCase() === 'patch') && targetId) {
      products = products.map((p) => (p.id === targetId ? { ...p, ...parsedData, prix: Number(parsedData.prix ?? p.prix), stock: Number(parsedData.stock ?? p.stock) } : p));
      setStorage('eray_admin_products', products);
      const updated = products.find((p) => p.id === targetId);
      return { data: updated, status: 200, statusText: 'OK', headers: {}, config };
    }

    if (method.toLowerCase() === 'delete' && targetId) {
      products = products.filter((p) => p.id !== targetId);
      setStorage('eray_admin_products', products);
      return { data: { success: true, id: targetId }, status: 200, statusText: 'OK', headers: {}, config };
    }
  }

  // 2. BLOG POSTS ENDPOINTS (/api/posts)
  if (cleanUrl.startsWith('/api/posts')) {
    let posts = getStorage<Post[]>('eray_admin_posts', INITIAL_POSTS);
    const idMatch = cleanUrl.match(/\/api\/posts\/([^\/]+)/);
    const targetId = idMatch ? idMatch[1] : null;

    if (method.toLowerCase() === 'get') {
      return { data: posts, status: 200, statusText: 'OK', headers: {}, config };
    }

    if (method.toLowerCase() === 'post') {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        titre: parsedData.titre || 'Nouvel Article',
        contenu: parsedData.contenu || '',
        image: parsedData.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80',
        date: new Date().toISOString().split('T')[0],
      };
      posts = [newPost, ...posts];
      setStorage('eray_admin_posts', posts);
      return { data: newPost, status: 201, statusText: 'Created', headers: {}, config };
    }

    if ((method.toLowerCase() === 'put' || method.toLowerCase() === 'patch') && targetId) {
      posts = posts.map((post) => (post.id === targetId ? { ...post, ...parsedData } : post));
      setStorage('eray_admin_posts', posts);
      const updated = posts.find((p) => p.id === targetId);
      return { data: updated, status: 200, statusText: 'OK', headers: {}, config };
    }

    if (method.toLowerCase() === 'delete' && targetId) {
      posts = posts.filter((post) => post.id !== targetId);
      setStorage('eray_admin_posts', posts);
      return { data: { success: true, id: targetId }, status: 200, statusText: 'OK', headers: {}, config };
    }
  }

  // 3. SERVICES ENDPOINTS (/api/services)
  if (cleanUrl.startsWith('/api/services')) {
    let services = getStorage<Service[]>('eray_admin_services', INITIAL_SERVICES);
    const idMatch = cleanUrl.match(/\/api\/services\/([^\/]+)/);
    const targetId = idMatch ? idMatch[1] : null;

    if (method.toLowerCase() === 'get') {
      return { data: services, status: 200, statusText: 'OK', headers: {}, config };
    }

    if (method.toLowerCase() === 'post') {
      const newService: Service = {
        id: `serv-${Date.now()}`,
        nom: parsedData.nom || 'Nouveau Service',
        description: parsedData.description || '',
        prix: Number(parsedData.prix) || 0,
      };
      services = [newService, ...services];
      setStorage('eray_admin_services', services);
      return { data: newService, status: 201, statusText: 'Created', headers: {}, config };
    }

    if ((method.toLowerCase() === 'put' || method.toLowerCase() === 'patch') && targetId) {
      services = services.map((serv) => (serv.id === targetId ? { ...serv, ...parsedData, prix: Number(parsedData.prix ?? serv.prix) } : serv));
      setStorage('eray_admin_services', services);
      const updated = services.find((s) => s.id === targetId);
      return { data: updated, status: 200, statusText: 'OK', headers: {}, config };
    }

    if (method.toLowerCase() === 'delete' && targetId) {
      services = services.filter((serv) => serv.id !== targetId);
      setStorage('eray_admin_services', services);
      return { data: { success: true, id: targetId }, status: 200, statusText: 'OK', headers: {}, config };
    }
  }

  // 4. RESERVATIONS ENDPOINTS (/api/reservations)
  if (cleanUrl.startsWith('/api/reservations')) {
    let reservations = getStorage<Reservation[]>('eray_admin_reservations', INITIAL_RESERVATIONS);
    const idMatch = cleanUrl.match(/\/api\/reservations\/([^\/]+)/);
    const targetId = idMatch ? idMatch[1] : null;

    if (method.toLowerCase() === 'get') {
      return { data: reservations, status: 200, statusText: 'OK', headers: {}, config };
    }

    if (method.toLowerCase() === 'post') {
      const newRes: Reservation = {
        id: `res-${Date.now()}`,
        nomClient: parsedData.nomClient || 'Client',
        serviceChoisi: parsedData.serviceChoisi || 'Service',
        date: parsedData.date || new Date().toISOString().split('T')[0],
        heure: parsedData.heure || '12:00',
        adresse: parsedData.adresse || 'Dakar',
        statut: parsedData.statut || 'pending',
      };
      reservations = [newRes, ...reservations];
      setStorage('eray_admin_reservations', reservations);
      return { data: newRes, status: 201, statusText: 'Created', headers: {}, config };
    }

    if ((method.toLowerCase() === 'put' || method.toLowerCase() === 'patch') && targetId) {
      reservations = reservations.map((res) => (res.id === targetId ? { ...res, ...parsedData } : res));
      setStorage('eray_admin_reservations', reservations);
      const updated = reservations.find((r) => r.id === targetId);
      return { data: updated, status: 200, statusText: 'OK', headers: {}, config };
    }

    if (method.toLowerCase() === 'delete' && targetId) {
      reservations = reservations.filter((res) => res.id !== targetId);
      setStorage('eray_admin_reservations', reservations);
      return { data: { success: true, id: targetId }, status: 200, statusText: 'OK', headers: {}, config };
    }
  }

  // Fallback for non-mocked requests
  return {
    data: { message: 'Not found' },
    status: 404,
    statusText: 'Not Found',
    headers: {},
    config,
  };
};

// Create & Export Centralized Axios Instance
export const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
  adapter: customMockAdapter,
});

// Helper API Service Functions (Centralized Request Calls)
export const apiService = {
  // Products
  getProducts: () => api.get<Product[]>('/api/products'),
  createProduct: (data: Omit<Product, 'id'>) => api.post<Product>('/api/products', data),
  updateProduct: (id: string, data: Partial<Product>) => api.put<Product>(`/api/products/${id}`, data),
  deleteProduct: (id: string) => api.delete<{ success: boolean; id: string }>(`/api/products/${id}`),

  // Posts
  getPosts: () => api.get<Post[]>('/api/posts'),
  createPost: (data: Omit<Post, 'id' | 'date'>) => api.post<Post>('/api/posts', data),
  updatePost: (id: string, data: Partial<Post>) => api.put<Post>(`/api/posts/${id}`, data),
  deletePost: (id: string) => api.delete<{ success: boolean; id: string }>(`/api/posts/${id}`),

  // Services
  getServices: () => api.get<Service[]>('/api/services'),
  createService: (data: Omit<Service, 'id'>) => api.post<Service>('/api/services', data),
  updateService: (id: string, data: Partial<Service>) => api.put<Service>(`/api/services/${id}`, data),
  deleteService: (id: string) => api.delete<{ success: boolean; id: string }>(`/api/services/${id}`),

  // Reservations
  getReservations: () => api.get<Reservation[]>('/api/reservations'),
  createReservation: (data: Omit<Reservation, 'id'>) => api.post<Reservation>('/api/reservations', data),
  updateReservationStatus: (id: string, statut: Reservation['statut']) => api.patch<Reservation>(`/api/reservations/${id}`, { statut }),
  deleteReservation: (id: string) => api.delete<{ success: boolean; id: string }>(`/api/reservations/${id}`),
};

export default api;
