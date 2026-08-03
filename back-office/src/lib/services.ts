import api from './api';
import type {
  Marque,
  Categorie,
  Phone,
  Service,
  Client,
  Reservation,
  ReservationService,
  Blog,
  Contact,
} from '@/types';

export const marquesApi = {
  list: () => api.get<Marque[]>('/marques').then((r) => r.data),
  get: (id: number) => api.get<Marque>(`/marques/${id}`).then((r) => r.data),
  create: (data: Partial<Marque>) => api.post<Marque>('/marques', data).then((r) => r.data),
  update: (id: number, data: Partial<Marque>) => api.put<Marque>(`/marques/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete(`/marques/${id}`).then((r) => r.data),
};

export const categoriesApi = {
  list: () => api.get<Categorie[]>('/categories').then((r) => r.data),
  get: (id: number) => api.get<Categorie>(`/categories/${id}`).then((r) => r.data),
  create: (data: Partial<Categorie>) => api.post<Categorie>('/categories', data).then((r) => r.data),
  update: (id: number, data: Partial<Categorie>) => api.put<Categorie>(`/categories/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete(`/categories/${id}`).then((r) => r.data),
};

export const phonesApi = {
  list: () => api.get<Phone[]>('/phones').then((r) => r.data),
  get: (id: number) => api.get<Phone>(`/phones/${id}`).then((r) => r.data),
  create: (data: Partial<Phone>) => api.post<Phone>('/phones', data).then((r) => r.data),
  update: (id: number, data: Partial<Phone>) => api.put<Phone>(`/phones/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete(`/phones/${id}`).then((r) => r.data),
};

export const servicesApi = {
  list: () => api.get <Service[]>('/services').then((r) => r.data),
  get: (id: number) => api.get <Service>(`/services/${id}`).then((r) => r.data),
  create: (data: Partial <Service>) => api.post <Service>('/services', data).then((r) => r.data),
  update: (id: number, data: Partial <Service>) => api.put <Service>(`/services/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete(`/services/${id}`).then((r) => r.data),
};

export const clientsApi = {
  list: () => api.get<Client[]>('/clients').then((r) => r.data),
  get: (id: number) => api.get<Client>(`/clients/${id}`).then((r) => r.data),
  create: (data: Partial<Client>) => api.post<Client>('/clients', data).then((r) => r.data),
  update: (id: number, data: Partial<Client>) => api.put<Client>(`/clients/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete(`/clients/${id}`).then((r) => r.data),
};

export const reservationsApi = {
  list: () => api.get<Reservation[]>('/reservations').then((r) => r.data),
  get: (id: number) => api.get<Reservation>(`/reservations/${id}`).then((r) => r.data),
  create: (data: Partial<Reservation>) => api.post<Reservation>('/reservations', data).then((r) => r.data),
  update: (id: number, data: Partial<Reservation>) => api.put<Reservation>(`/reservations/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete(`/reservations/${id}`).then((r) => r.data),
};

export const reservationServiceApi = {
  list: () => api.get<ReservationService[]>('/reservation-service').then((r) => r.data),
  get: (id: number) => api.get<ReservationService>(`/reservation-service/${id}`).then((r) => r.data),
  remove: (id: number) => api.delete(`/reservation-service/${id}`).then((r) => r.data),
};

export const blogsApi = {
  list: () => api.get<Blog[]>('/blogs').then((r) => r.data),
  get: (id: number) => api.get<Blog>(`/blogs/${id}`).then((r) => r.data),
  create: (data: Partial<Blog>) => api.post<Blog>('/blogs', data).then((r) => r.data),
  update: (id: number, data: Partial<Blog>) => api.put<Blog>(`/blogs/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete(`/blogs/${id}`).then((r) => r.data),
};

export const contactsApi = {
  list: () => api.get<Contact[]>('/contact').then((r) => r.data),
  get: (id: number) => api.get<Contact>(`/contact/${id}`).then((r) => r.data),
  remove: (id: number) => api.delete(`/contact/${id}`).then((r) => r.data),
};

export const dashboardApi = {
  stats: () => api.get('/dashboard').then((r) => r.data),
  recentPhones: () => api.get<Phone[]>('/phones?sort=recent&limit=5').then((r) => r.data),
  recentReservations: () => api.get<Reservation[]>('/reservations?sort=recent&limit=5').then((r) => r.data),
  recentContacts: () => api.get<Contact[]>('/contacts?sort=recent&limit=5').then((r) => r.data),
};
