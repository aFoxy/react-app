import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

type ErrorBoundaryState = {
  error: Error | null
}

type ErrorBoundaryProps = {
  children?: ReactNode
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error, errorInfo)
  }

  render() {
    const { error } = this.state

    if (error) {
      return (
        <div>
          <p>Seems like an error occured!</p>
          <p>{error.message}</p>
        </div>
      )
    }

    return this.props.children
  }
}
