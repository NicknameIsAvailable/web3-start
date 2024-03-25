import { create } from 'zustand';

export interface User {
  id: string;
  nickname: string;
  address: string;
}

interface userState {
  data: User;
}

const useUserStore = create((set) => ({}));
