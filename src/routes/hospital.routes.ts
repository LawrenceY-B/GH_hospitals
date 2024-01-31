import { Router } from 'express';
import { findTown, getDistricts, getImg, getRegions, getTypes, searchHospital } from '../controllers/hospital.controller';


const hospitalRoutes= Router();

hospitalRoutes.post('/v1/search', searchHospital)
hospitalRoutes.post('/v1/search/town', findTown)
hospitalRoutes.get('/v1/types', getTypes)
hospitalRoutes.get('/v1/regions', getRegions)
hospitalRoutes.get('/v1/districts', getDistricts)
hospitalRoutes.get('/v1/ownerchips', getDistricts)
hospitalRoutes.get('/v1/trial', getImg)

export default hospitalRoutes;