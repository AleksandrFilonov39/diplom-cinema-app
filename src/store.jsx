import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useStore = create(
  persist(
  (set) => ({
  allData: null,
  loading: false,
  selectedDate: null,
  ticketsDataQR: null,

  fetchAllData: async () => {
      set({ loading: true });
      try {
        const res = await fetch('https://shfe-diplom.neto-server.ru/alldata');
        const data = await res.json();
        set({ allData: data, loading: false });
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        set({ loading: false });
  }
  },
    updateSelectedDate: (updates) => 
        set(() => ({ selectedDate: updates })),
    updateTicketsDataQR: (updates) => 
        set(() => ({ ticketsDataQR: updates })),
    updateAllData: (updates) => 
        set(() => ({ allData: updates })),
}),
  { name: 'storage' },
));

export default useStore;