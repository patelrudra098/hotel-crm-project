import React, { useState } from "react";
import Navbar from "../components/Navbar";
import LeftPanel from "../components/LeftPanel";
import Tabs from "../components/Tabs";
import CardsSection from "../components/CardsSection"; // 👈 new

function Home() {
  const [activeTab, setActiveTab] = useState("feedback");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f9f9ff] to-[#ecebff]">
      <Navbar />
      <section>
        <div className="w-screen h-full overflow-hidden min-h-screen flex flex-col md:flex-row">
          <LeftPanel />
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </section>

      {/* 👇 New cards section */}
      <CardsSection activeTab={activeTab} />
    </div>
  );
}

export default Home;
