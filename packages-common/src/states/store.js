import create from "zustand";
import { DefaultFlowModel } from "../constants/Properties/Default";

export const useStore = create((set) => ({
  isPopupOpen: false,
  setIsPopupOpen: (value) => set({ isPopupOpen: value }),

  popupMode: 1,
  setPopupMode: (value) => set({ popupMode: value }),

  // SigthCube CC Server IP
  sightCubeCCServerIP: "127.0.0.1",
  setSightCubeCCServerIP: (value) => set({ sightCubeCCServerIP: value }),

  // SigthCube CC Server Port
  sightCubeCCSeverPort: "48030",
  setSightCubeCCServerPort: (value) => set({ sightCubeCCSeverPort: value }),

  flowModel: DefaultFlowModel,
  setFlowModel: (value) => set({flowModel: value}),
}));
