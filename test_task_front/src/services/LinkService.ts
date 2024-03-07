import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {Ilink} from "../models/Ilink";

export default class LinkService {
    static async create(link: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/create', {link})
    }

    static fetchLinks(): Promise<AxiosResponse<Ilink[]>> {
        return $api.get<Ilink[]>('/links')
    }

    static goTo(shortLink:string){
        return $api.get<Ilink[]>(`/link?shortLink=${shortLink}`)
    }

}