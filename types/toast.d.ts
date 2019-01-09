import Vue, { PluginFunction } from 'vue'

export declare class Toast {
  constructor(options?: Options)
  static install: PluginFunction<never>
}

export interface Options {}

export interface toast {
  tip: () => {}
  alert: () => {}
  confirm: () => {}
}
