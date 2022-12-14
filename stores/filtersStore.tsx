import create from 'zustand'
import filters from '../pages/filters'

const useFilters = create<{}>((set: any) => ({
  filters: {
    number: '10',
    category: '',
    difficulty: '',
  },

  setNumberFilter: (value: string) =>
    set((state: any) => ({
      filters: { ...state.filters, number: value },
    })),

  setCategoryFilter: (value: boolean) =>
    set((state: any) => ({
      filters: { ...state.filters, category: value },
    })),

  setDifficultyFilter: (value: boolean) =>
    set((state: any) => ({
      filters: { ...state.filters, difficulty: value },
    })),

  setFiltersDefault: (value: boolean) =>
    set((state: any) => ({
      filters: { number: '10', category: '', difficulty: '' },
    })),
}))

export default useFilters
