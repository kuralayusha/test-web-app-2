import create from 'zustand'

const useQuestionsData = create<any>((set: any) => ({
  gameFilters: [],
}))

export default useQuestionsData
