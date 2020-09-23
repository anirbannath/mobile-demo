import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { InstructionRequest, InstructionResult } from '../models/voice-assistant';

@Injectable({
  providedIn: 'root'
})
export class InstructionAssistantService {

  constructor(private http: HttpClient) { }

  resolve(request: InstructionRequest) {
    return this.http.post<InstructionResult>(environment.instructionResolver, request)
  }

}
