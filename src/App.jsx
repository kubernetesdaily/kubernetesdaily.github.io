import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import ToolsSection from "./components/ToolsSection";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import Labs from "./components/Labs";
import OpenGraph from "./components/OpenGraph";
import DiscordPopup from "./components/DiscordPopup";
import DockerImages from "./components/DockerImages";

function App() {
  return (
    <Router>
      <div className="bg-bgPrimary min-h-screen relative">
        <Nav />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={
              <>
                <OpenGraph 
                  title="KubeDaily | Demystifying Container and Orchestration Ecosystem"
                  description="A comprehensive resource for Kubernetes, containers, orchestration tools, cloud-native applications, and DevOps methodologies."
                  tags={["Kubernetes", "Containers", "DevOps", "Orchestration", "Cloud Native"]}
                />
                <LandingPage />
              </>
            } />
            <Route path="/tools" element={
              <div className="text-primary max-w-[1280px] mx-auto px-4 py-8">
                <OpenGraph 
                  title="Kubernetes Tools Collection | KubeDaily"
                  description="Explore our curated collection of Kubernetes tools, container technologies, orchestration platforms, and cloud-native resources."
                  tags={["Kubernetes Tools", "Container Tools", "Orchestration Platforms", "Cloud Native Resources"]}
                />
                <h1 className="text-3xl font-bold mb-8 text-center">Kubernetes Tools Collection</h1>
                <ToolsSection />
              </div>
            } />
            <Route path="/docker-images" element={
              <div className="text-primary max-w-[1280px] mx-auto px-4 py-8">
                <OpenGraph 
                  title="Popular Docker Images | KubeDaily"
                  description="Explore popular Docker images with detailed information about their pull counts, stars, and official status."
                  tags={["Docker Images", "Container Images", "Docker Hub", "Container Registry"]}
                />
                <h1 className="text-3xl font-bold mb-8 text-center">Popular Docker Images</h1>
                <DockerImages />
              </div>
            } />
            <Route path="/labs" element={
              <>
                <OpenGraph 
                  title="Kubernetes Labs | KubeDaily"
                  description="Interactive Kubernetes labs and hands-on tutorials showcasing container orchestration techniques and best practices."
                  tags={["Kubernetes Labs", "Container Tutorials", "Hands-on Kubernetes", "K8s Practice"]}
                />
                <Labs />
              </>
            } />
            <Route path="/labs/:labId" element={<Labs />} />
            <Route path="/blog" element={
              <>
                <OpenGraph 
                  title="Container Ecosystem Blog | KubeDaily"
                  description="Latest insights, tutorials, and news about Kubernetes, containers, orchestration, and cloud-native technologies."
                  tags={["Kubernetes Blog", "Container News", "Orchestration Guides", "Cloud Native Tips"]}
                />
                <Blog />
              </>
            } />
            <Route path="/blog/:postId" element={<Blog />} />
            <Route path="/about" element={
              <div className="text-primary max-w-[1280px] mx-auto px-4 py-8">
                <OpenGraph 
                  title="About KubeDaily"
                  description="KubeDaily is dedicated to demystifying the container and orchestration ecosystem through high-quality resources and educational content."
                  tags={["About", "Kubernetes Community", "Container Education", "Cloud Native Learning"]}
                />
                <h1 className="text-3xl font-bold mb-8 text-center">About KubeDaily</h1>
                <p className="text-grayFill text-lg mb-6">
                  KubeDaily is dedicated to demystifying the container and orchestration ecosystem through high-quality resources and educational content.
                </p>
                <p className="text-grayFill text-lg mb-6">
                  Our mission is to democratize access to Kubernetes and container knowledge, enabling developers and operators from all backgrounds to effectively leverage these powerful technologies.
                </p>
                <p className="text-grayFill text-lg">
                  We collaborate with cloud-native experts, industry partners, and community contributors to build a more accessible container ecosystem for everyone.
                </p>
              </div>
            } />
          </Routes>
        </div>
        <Footer />
        {/* Discord Popup - positioned at a higher z-index to ensure visibility */}
        <DiscordPopup />
      </div>
    </Router>
  );
}

export default App;
