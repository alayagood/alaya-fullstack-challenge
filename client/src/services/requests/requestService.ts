import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import storeService from '../storage/storageService';

interface HttpServiceInterface {
  domain: string;
  setDomain(domain: string): void;
  delete(url: string,  config?: AxiosRequestConfig): Promise<AxiosResponse>;
  get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  patch(url: string, data: unknown,  config?: AxiosRequestConfig): Promise<AxiosResponse>;
  post(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  put(url: string, data: unknown,  config?: AxiosRequestConfig): Promise<AxiosResponse>;
  
}

const userToken: string = storeService.get('local','userToken');

const setHeaders = ( config?: AxiosRequestConfig): AxiosRequestConfig => {
  if (!config) {
    config = {};
    config.headers = {};
  }

  config.headers = Object.assign(config.headers ?? {}, {
    'Authorization': `Bearer ${userToken ? userToken : ''}`,
  });

  return config;
};

const requestService: HttpServiceInterface = {
  domain: '',
  setDomain(domain: string) {
    this.domain = domain;
  },
  async get(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    const headers = await setHeaders(config);
    return axios.get(`${this.domain}/${endpoint}`, headers);
  },
  async post(endpoint: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    const headers = await setHeaders(config);
    return axios.post(`${this.domain}/${endpoint}`, data, headers);
  },
  async put(endpoint: string, data: unknown,  config?: AxiosRequestConfig): Promise<AxiosResponse> {
    const headers = await setHeaders(config);
    return axios.put(`${this.domain}/${endpoint}`, data, headers);
  },
  async patch(endpoint: string, data: unknown,  config?: AxiosRequestConfig): Promise<AxiosResponse> {
    const headers = await setHeaders(config);
    return axios.patch(`${this.domain}/${endpoint}`, data, headers);
  },
  async delete(endpoint: string,  config?: AxiosRequestConfig): Promise<AxiosResponse> {
    const headers = await setHeaders(config);
    return axios.delete(`${this.domain}/${endpoint}`, headers);
  },
};

export { requestService, type HttpServiceInterface };
