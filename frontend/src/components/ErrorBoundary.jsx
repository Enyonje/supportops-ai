import { Component } from "react";
export default class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { console.error(err, info); }
  render() {
    if (this.state.hasError) {
      return <div className="card p-4">Something went wrong. Try refreshing.</div>;
    }
    return this.props.children;
  }
}