import create from 'zustand'

const useGameFilters = create<any>((set: any) => ({
  gameFilters: false,
  setGameFiltersFalse: (value: boolean) =>
    set(() => ({ gameFilters: false })),
  setGameFiltersTrue: (value: boolean) =>
    set(() => ({ gameFilters: true })),
}))

export default useGameFilters
