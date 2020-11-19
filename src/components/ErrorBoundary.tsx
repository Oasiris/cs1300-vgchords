import React from 'react'

type State =
    | {
          hasError: false
          error: null
      }
    | {
          hasError: true
          error: Error
      }

export class ErrorBoundary extends React.Component<{}, State> {
    constructor(props: any) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error }
    }

    componentDidCatch(err: Error, info: React.ErrorInfo) {
        console.log('CAUGHT ERROR')
    }

    render() {
        if (!this.state.hasError) {
            return this.props.children
        } else {
            return (
                <div>
                    <p>We're sorry - something's gone wrong.</p>
                    <p>{JSON.stringify(this.state)}</p>
                </div>
            )
        }
    }
}
