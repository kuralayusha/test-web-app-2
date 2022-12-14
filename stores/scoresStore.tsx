import create from 'zustand'

const useTotalScore = create<any>((set: any) => ({
  score: 0,
  setScoreIncreaseOne: (value: number) =>
    set(() => ({ score: value + 1 })),
  setScoreToZero: (value: number) => set(() => ({ score: 0 })),
}))

export default useTotalScore
