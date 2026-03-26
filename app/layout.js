import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Gestor de Tareas JSON",
  description: "App para visualizar pendientes desde una API externa"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <header className="border-b border-gray-300 p-4 bg-white">
          <nav className="flex gap-4">
            <Link href="/" className="text-gray-800 hover:text-gray-600">
              Inicio
            </Link>
            <Link href="/todos" className="text-gray-800 hover:text-gray-600">
              Tareas
            </Link>
          </nav>
        </header>

        <main className="flex-1 p-4">
          {children}
        </main>

        <footer className="border-t border-gray-300 p-4 bg-white text-sm text-gray-600">
          Gestor de Tareas JSON - Proyecto práctico
        </footer>
      </body>
    </html>
  );
}
