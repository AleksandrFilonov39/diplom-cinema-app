import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      allData: null,
      loading: false,
      selectedDate: null,
      ticketsDataQR: null,
      hasFetched: false,

      fetchAllData: async () => {
        if (get().hasFetched || get().loading) return;

        set({ loading: true });
        try {
          const res = await fetch("https://shfe-diplom.neto-server.ru/alldata");
          const data = await res.json();
          set({ allData: data, loading: false, hasFetched: true });
        } catch (error) {
          console.error("Ошибка при загрузке данных:", error);
          set({ loading: false });
        }
      },

      updateSelectedDate: (updates) => set({ selectedDate: updates }),
      updateTicketsDataQR: (updates) => set({ ticketsDataQR: updates }),
      updateAllData: (updates) => set({ allData: updates }),
    }),
    {
      name: "storage",

      partialize: (state) => ({
        allData: state.allData,
        selectedDate: state.selectedDate,
        ticketsDataQR: state.ticketsDataQR,
      }),
    }
  )
);

export default useStore;
