import { PluginFunction } from 'vue'

export interface toastInstance {
  tip(): void
  alert(): void
  confirm(): void
  // tip: () => {}
  // alert: () => {}
  // confirm: () => {}
}

export declare class Toast {
  constructor(options?: Options)
  static install: PluginFunction<never>

  tip(): void
  alert(): void
  confirm(): void
}

interface Options {}

export declare const toast: toastInstance
