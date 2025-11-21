export enum Role {
  TRABALHADOR = 'TRABALHADOR',
  CONTRATANTE = 'CONTRATANTE',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  workerProfile?: { id: string };
}
