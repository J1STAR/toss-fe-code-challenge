import useModalStore from "../store/modal.store";
import { type ComponentType } from "react";

export const openModal = <T extends {}>(Component: ComponentType<T>, props: Partial<T> = {}) => {
  const { open } = useModalStore.getState();

  return new Promise<any>((resolve) => {
    open(Component, props, resolve);
  });
};
