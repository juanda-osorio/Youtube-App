import { YoutubeResponse } from './../models/youtube.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = "https://youtube.googleapis.com/youtube/v3";
  private playList = "UU1XodfMoq99LNRxPTi3pvhA";
  private apiKey = "AIzaSyBd5TkRQ6B8qzZkel0ZCn7N8ZhcHHUadss";
  private nextPageToken = "";

  constructor(private http: HttpClient) {
    
  }

  getVideos(){

    const url = `${ this.youtubeUrl }/playlistItems`;
    
    /* Forma de establecer los parametros de la url (cuando hay muchos) */
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '12')
      .set('playlistId', this.playList)
      .set('key', this.apiKey)
      .set('pageToken', this.nextPageToken)
    
    /* Desde el ECMA6 puedo abreviarlo a un solo: params */
    return this.http.get<YoutubeResponse>(url, { params: params } )
      .pipe(
        map( resp => {
          this.nextPageToken = resp.nextPageToken;
          return resp.items;
        }),
        /* Aqui se hace un segundo 'map' que filtra aún mas el resultado anterior
        *  obteniendo los videos que queremos.
        *  items.map() es como un FOREACH que devuelve un ARRAY con snippets de cada video.*/
        map( items => items.map( video => video.snippet )
        )
      )
  }

  

}
