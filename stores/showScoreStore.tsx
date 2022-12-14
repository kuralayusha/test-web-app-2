import create from 'zustand'

const useShowingScore = create<any>((set: any) => ({
  showScore: false,
  setToggleShowScore: (value: boolean) =>
    set(() => ({ score: !value })),
}))

export default useShowingScore
