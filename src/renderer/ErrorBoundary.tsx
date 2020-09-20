import React, { ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

class ErrorBoundary extends React.Component<Props, State> {
  public static getDerivedStateFromError(error: Error): State {
    console.error("error: ", error);
    return { hasError: true };
  }

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch(
    error: Error,
    info: {
      componentStack: string;
    }
  ): void {
    console.error("error: ", error, "info: ", info);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
