import { Router } from 'express';
import { filter, findTown, getAllHospitals, getDistricts, getOwnerships, getRegions, getTypes, searchHospital } from '../controllers/hospital.controller';


const hospitalRoutes= Router();

hospitalRoutes.post('/v1/search', searchHospital)
hospitalRoutes.post('/v1/search/town', findTown)
hospitalRoutes.get('/v1/types', getTypes)
hospitalRoutes.get('/v1/regions', getRegions)
hospitalRoutes.get('/v1/districts', getDistricts)
hospitalRoutes.get('/v1/ownerships', getOwnerships)
hospitalRoutes.get('/v1/allHospitals', getAllHospitals)
hospitalRoutes.get('/v1/filters', filter)


export default hospitalRoutes;