"use client"

import { useEffect } from "react"

import type React from "react"

import { create } from "zustand"
import type { ToastProps } from "./toast"

type Toast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000 // Keep toasts on screen for a long time for demo purposes

type State = {
  toasts: Toast[]
}

type Actions = {
  addToast: (toast: Toast) => void
  updateToast: (id: string, toast: Partial<Toast>) => void
  dismissToast: (id?: string) => void
  removeToast: (id?: string) => void
}

const toastStore = create<State & Actions>((set, get) => ({
  toasts: [],
  addToast: (toast) => {
    set((state) => ({
      toasts: [toast, ...state.toasts].slice(0, TOAST_LIMIT),
    }))
  },
  updateToast: (id, toast) => {
    set((state) => ({
      toasts: state.toasts.map((t) => (t.id === id ? { ...t, ...toast } : t)),
    }))
  },
  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.map((t) => (t.id === id || id === undefined ? { ...t, open: false } : t)),
    }))
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }))
  },
}))

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ToastOptions = Omit<Toast, "id">

function toast(opts: ToastOptions) {
  const id = genId()

  const update = (newOpts: Partial<Toast>) => toastStore.getState().updateToast(id, newOpts)
  const dismiss = () => toastStore.getState().dismissToast(id)

  toastStore.getState().addToast({
    id,
    open: true,
    ...opts,
  })

  if (opts.duration !== Number.POSITIVE_INFINITY) {
    setTimeout(() => dismiss(), opts.duration || TOAST_REMOVE_DELAY)
  }

  return {
    id,
    update,
    dismiss,
  }
}

export function useToast() {
  const { toasts, addToast, updateToast, dismissToast, removeToast } = toastStore()

  useEffect(() => {
    const unsub = toastStore.subscribe((state) => {
      state.toasts.forEach((t) => {
        if (t.open === false) {
          // We use a timeout to allow the toast to animate out before being removed
          setTimeout(() => removeToast(t.id), 400)
        }
      })
    })
    return () => unsub()
  }, [removeToast])

  return {
    toasts,
    toast, // Expose the toast function directly
    dismiss: dismissToast,
  }
}
