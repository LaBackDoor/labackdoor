import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Navigation error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || <div>Something went wrong with the navigation.</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;