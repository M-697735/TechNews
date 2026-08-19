import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import RightSideBar from "./RightSideBar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#080C10] text-white">

      <div className="flex">

        {/* Sidebar */}

        <Sidebar />

        {/* Main Area */}

        <div className="flex min-h-screen flex-1 flex-col">

          <TopNavbar />

          <main className="flex flex-1">

            {/* Main Content */}

            <section className="flex-1 px-8 py-8">

              {children}

            </section>

            {/* Right Sidebar */}

            <RightSideBar />

          </main>

        </div>

      </div>

    </div>
  );
}

export default MainLayout;