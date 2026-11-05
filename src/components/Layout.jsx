export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <header className="app-header">
        <h1>REGISTRA-IP</h1>
      </header>
      <main className="app-main">
        {children}
      </main>
    </div>
  );
}