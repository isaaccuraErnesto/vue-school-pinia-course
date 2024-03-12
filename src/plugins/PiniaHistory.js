import { reactive, ref } from "vue"

export function PiniaHistory({ /*pinia, app,*/ store, options }) {
  // Check if the store has history enabled in the options (Options Stores) or the store itself (Setup Stores)
  const storeHasHistoryEnabled = options?.historyEnabled || store.historyEnabled

  // Don't include history functionality unless it's explicitly enabled
  if (!storeHasHistoryEnabled) return

  const history = reactive([])
  const future = reactive([])
  const alteringHistory = ref(false)

  history.push(JSON.stringify(store.$state))

  store.$subscribe((_mutation, state) => {
    if (!alteringHistory.value) {
      history.push(JSON.stringify(state))
      // Clears the future history while maintaining reactivity
      future.splice(0)
    }
  })

  store.$onAction(({ name, /*store,*/ args, after, onError }) => {
    if (name === "addToCart") {
      after(() => {
        console.log(`Added ${args[0].name} to cart`)
      })
    }

    onError((error) => {
      console.error(error)
    })
  })

  const undo = () => {
    if (history.length > 1) {
      alteringHistory.value = true
      future.push(history.pop())
      store.$state = JSON.parse(history.at(-1))
      alteringHistory.value = false
    }
  }

  const redo = () => {
    const latestHistoryState = future.pop()

    if (latestHistoryState) {
      alteringHistory.value = true
      history.push(latestHistoryState)
      store.$state = JSON.parse(latestHistoryState)
      alteringHistory.value = false
    }
  }

  return { history, future, undo, redo }
}