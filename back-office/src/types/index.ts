export interface Marque {
  id: number;
  nom: string;
  created_at?: string;
  updated_at?: string;
}

export interface Categorie {
  id: number;
  nom: string;
  created_at?: string;
  updated_at?: string;
}

export interface Phone {
  id: number;
  name: string;
  couleur: string | null;
  prix: number | string | null;
  stockage: string | null;
  etat: string | null;
  id_marque: number | null;
  id_categorie: number | null;
  disponibilite: string;
  created_at?: string;
  updated_at?: string;
  marque?: Marque | null;
  categorie?: Categorie | null;
}

export interface Service {
  id: number;
  nom: string;
  description: string | null;
  prix: number | string | null;
  disponible: boolean | number;
  avantages: string | null;
  created_at?: string;
  updated_at?: string;
  promotion: string | null;
}

export interface Client {
  id: number;
  nom: string | null;
  telephone: string | null;
  email: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Reservation {
  id: number;
  id_service: number | null;
  id_client: number | null;
  date: string | null;
  statut: string;
  created_at?: string;
  updated_at?: string;
    client?: {
    id: number;
    nom: string;
  };

  service?: {
    id: number;
    nom: string;
  };
}

export interface ReservationService {
  id: number;
  name: string;
  telephone: string;
  created_at?: string;
  updated_at?: string;
}

export interface Blog {
  id: number;
  titre: string;
  auteur: string | null;
  contenu: string | null;
  image: string | null;
  date_publication: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Contact {
  id: number;
  nom: string | null;
  email: string | null;
  telephone: string | null;
  adresse: string;
  created_at?: string;
  updated_at?: string;
}

export interface DashboardStats {
  phones_count: number;
  reservations_count: number;
  contacts_count: number;
  services_count: number;
  blogs_count: number;
}
