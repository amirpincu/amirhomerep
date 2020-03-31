export enum CityWeatherDescription {
    sunny = 0,
    cloudy,
    raining,
    storm,
    snowing,
}

export class CityWeatherData {
    city: string;
    temp: number;
    maxTemp: number;
    minTemp: number;
    weatherDesc: CityWeatherDescription;
}