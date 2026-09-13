import homeHero from './images/home_hero_1789266238374.jpg';
import servicesTools from './images/services_tools_1789266248800.jpg';
import lawnCare from './images/lawn_care_1789266259480.jpg';
import hedgeTrimming from './images/hedge_trimming_1789266274160.jpg';
import gardenTidying from './images/garden_tidying_1789266289853.jpg';
import flowerPlanting from './images/flower_planting_1789266301814.jpg';
import fencePainting from './images/fence_painting_1789266311815.jpg';
import pressureWashing from './images/pressure_washing_1789266322507.jpg';
import pondMaintenance from './images/pond_maintenance_1789266335611.jpg';
import flatPack from './images/flat_pack_1789266349862.jpg';
import serviceAreaMap from './images/service_area_map_1789266361688.jpg';
import robinMascot from './images/robin_mascot_1789266374515.jpg';

export const siteImages = {
  home_hero: homeHero,
  services_tools: servicesTools,
  lawn_care: lawnCare,
  hedge_trimming: hedgeTrimming,
  garden_tidying: gardenTidying,
  flower_planting: flowerPlanting,
  fence_painting: fencePainting,
  pressure_washing: pressureWashing,
  pond_maintenance: pondMaintenance,
  flat_pack: flatPack,
  service_area_map: serviceAreaMap,
  robin_mascot: robinMascot,
};

export type ImageKey = keyof typeof siteImages;
