import { create } from "zustand";
import type { ComponentType } from "react";

type ModalState = {
  isOpen: boolean;
  Component: ComponentType<any> | null;
  props: any;
  resolve: (value: any) => void;
  open: (Component: ComponentType<any>, props: any, resolve: (value: any) => void) => void;
  close: () => void;
};

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  Component: null,
  props: {},
  resolve: () => {},
  open: (Component, props, resolve) =>
    set({
      isOpen: true,
      Component,
      props,
      resolve,
    }),
  close: () =>
    set((state) => {
      if (state.Component) {
        // Resolve with null when closing without submission
        state.resolve(null);
      }
      return { isOpen: false, Component: null, props: {} };
    }),
}));

export default useModalStore;
