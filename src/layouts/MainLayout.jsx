import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2025 Website bán đồ ăn</p>
      </footer>
    </>
  );
}
