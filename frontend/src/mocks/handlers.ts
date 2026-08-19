import { http, HttpResponse } from 'msw';
import { API_URL } from '../config/env';
import { computeDashboardSummary, db, generateId, timestamps } from './data';
import type { Farm, Harvest, PlantedCrop, Producer } from '../types/domain';

const url = (path: string) => `${API_URL}${path}`;

export const handlers = [
  http.get(url('/producers'), () => HttpResponse.json(db.producers)),

  http.post(url('/producers'), async ({ request }) => {
    const body = (await request.json()) as { document: string; name: string };
    const producer: Producer = { id: generateId(), ...body, ...timestamps() };
    db.producers.push(producer);
    return HttpResponse.json(producer, { status: 201 });
  }),

  http.get(url('/producers/:id'), ({ params }) => {
    const producer = db.producers.find((item) => item.id === params.id);
    if (!producer) return HttpResponse.json({ message: 'Produtor não encontrado' }, { status: 404 });
    return HttpResponse.json(producer);
  }),

  http.patch(url('/producers/:id'), async ({ params, request }) => {
    const producer = db.producers.find((item) => item.id === params.id);
    if (!producer) return HttpResponse.json({ message: 'Produtor não encontrado' }, { status: 404 });
    const body = (await request.json()) as Partial<Producer>;
    Object.assign(producer, body, { updatedAt: new Date().toISOString() });
    return HttpResponse.json(producer);
  }),

  http.delete(url('/producers/:id'), ({ params }) => {
    const index = db.producers.findIndex((item) => item.id === params.id);
    if (index === -1) return HttpResponse.json({ message: 'Produtor não encontrado' }, { status: 404 });
    db.producers.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  http.get(url('/farms'), ({ request }) => {
    const producerId = new URL(request.url).searchParams.get('producerId');
    const farms = producerId ? db.farms.filter((farm) => farm.producerId === producerId) : db.farms;
    return HttpResponse.json(farms);
  }),

  http.post(url('/farms'), async ({ request }) => {
    const body = (await request.json()) as Omit<Farm, 'id' | 'createdAt' | 'updatedAt'>;
    if (body.agricultableArea + body.vegetationArea > body.totalArea) {
      return HttpResponse.json(
        { message: 'A soma da área agricultável com a área de vegetação não pode ser maior que a área total.' },
        { status: 400 },
      );
    }
    const farm: Farm = { id: generateId(), ...body, ...timestamps() };
    db.farms.push(farm);
    return HttpResponse.json(farm, { status: 201 });
  }),

  http.get(url('/farms/:id'), ({ params }) => {
    const farm = db.farms.find((item) => item.id === params.id);
    if (!farm) return HttpResponse.json({ message: 'Fazenda não encontrada' }, { status: 404 });
    return HttpResponse.json(farm);
  }),

  http.patch(url('/farms/:id'), async ({ params, request }) => {
    const farm = db.farms.find((item) => item.id === params.id);
    if (!farm) return HttpResponse.json({ message: 'Fazenda não encontrada' }, { status: 404 });
    const body = (await request.json()) as Partial<Farm>;
    const merged = { ...farm, ...body };
    if (merged.agricultableArea + merged.vegetationArea > merged.totalArea) {
      return HttpResponse.json(
        { message: 'A soma da área agricultável com a área de vegetação não pode ser maior que a área total.' },
        { status: 400 },
      );
    }
    Object.assign(farm, body, { updatedAt: new Date().toISOString() });
    return HttpResponse.json(farm);
  }),

  http.delete(url('/farms/:id'), ({ params }) => {
    const index = db.farms.findIndex((item) => item.id === params.id);
    if (index === -1) return HttpResponse.json({ message: 'Fazenda não encontrada' }, { status: 404 });
    db.farms.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  http.get(url('/harvests'), () => HttpResponse.json(db.harvests)),

  http.post(url('/harvests'), async ({ request }) => {
    const body = (await request.json()) as { year: number };
    const harvest: Harvest = { id: generateId(), year: body.year };
    db.harvests.push(harvest);
    return HttpResponse.json(harvest, { status: 201 });
  }),

  http.get(url('/planted-crops'), ({ request }) => {
    const farmId = new URL(request.url).searchParams.get('farmId');
    const crops = farmId ? db.plantedCrops.filter((crop) => crop.farmId === farmId) : db.plantedCrops;
    return HttpResponse.json(crops);
  }),

  http.post(url('/planted-crops'), async ({ request }) => {
    const body = (await request.json()) as Omit<PlantedCrop, 'id'>;
    const crop: PlantedCrop = { id: generateId(), ...body };
    db.plantedCrops.push(crop);
    return HttpResponse.json(crop, { status: 201 });
  }),

  http.delete(url('/planted-crops/:id'), ({ params }) => {
    const index = db.plantedCrops.findIndex((item) => item.id === params.id);
    if (index === -1) return HttpResponse.json({ message: 'Cultura não encontrada' }, { status: 404 });
    db.plantedCrops.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  http.get(url('/dashboard/summary'), () => HttpResponse.json(computeDashboardSummary())),
];
