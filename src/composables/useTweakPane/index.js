import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

export function useTweakPane() {
  let pane
  let fpsGraph

  pane = new Pane()
  pane.registerPlugin(EssentialsPlugin);
  fpsGraph = pane.addBlade({
    view: 'fpsgraph',
    label: 'fpsgraph',
  })

  return { pane, fpsGraph }
}
