
import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Header } from './components/Header';
import { DemoModal } from './components/DemoModal';
import {
  DataIcon,
  TechnicalIcon,
  DraftIcon,
  ValidationIcon,
  RocketIcon,
  VideoCameraIcon,
} from './components/IconComponents';
import { getVideo, saveVideo } from './services/db';

// Fix: Add explicit prop types for FeatureCard to resolve type inference errors.
const FeatureCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-brand-light p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-pink-500/10 hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary/10 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-100 mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-6">{children}</p>
  </div>
);

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // On mount, load video from IndexedDB.
  useEffect(() => {
    getVideo()
      .then((videoBlob) => {
        if (videoBlob) {
          setVideoSrc(URL.createObjectURL(videoBlob));
        }
      })
      .catch((error) => {
        console.error('Failed to load video from DB:', error);
      });
  }, []); // Empty dependency array ensures this runs only once.

  // This effect handles the cleanup of the object URL.
  // It runs whenever videoSrc changes. The cleanup function revokes the *previous* URL.
  // It also runs when the component unmounts to clean up the final URL.
  useEffect(() => {
    return () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);

  const handleVideoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await saveVideo(file);
        // When we set a new source, the useEffect cleanup will revoke the old one.
        setVideoSrc(URL.createObjectURL(file));
      } catch (error) {
        console.error('Failed to save video:', error);
        alert(
          'Sorry, there was an error saving your video. It might be too large.'
        );
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-brand-dark min-h-screen">
      <div className={isModalOpen ? 'blur-sm' : ''}>
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative text-center bg-brand-dark py-20 px-4 overflow-hidden">
            {videoSrc && (
              <video
                key={videoSrc}
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            )}
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
            <div className="relative container mx-auto max-w-4xl z-20">
              <span className="text-sm font-bold tracking-wider text-brand-secondary uppercase">
                Win More Bids, Faster
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-2 mb-4 leading-tight">
                Stop Drowning in RFPs. Start Winning Them.
              </h1>
              <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-8">
                IgniteProposals is your AI co-pilot for crafting compelling,
                compliant, and winning proposals in a fraction of the time.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-pink-700 transition-colors duration-300 text-lg"
              >
                See It In Action
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleVideoUpload}
              accept="video/*"
              className="hidden"
            />
            <button
              onClick={handleUploadClick}
              className="absolute bottom-4 right-4 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-300 shadow-lg"
              aria-label="Upload background video"
            >
              <VideoCameraIcon className="w-6 h-6" />
            </button>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-100">
                  How IgniteProposals Transforms Your Workflow
                </h2>
                <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
                  From initial analysis to final submission, our AI handles the
                  heavy lifting so you can focus on strategy.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* FIX: Pass children as an explicit prop to resolve incorrect 'missing prop' error. */}
                <FeatureCard
                  icon={<DataIcon className="w-6 h-6 text-brand-primary" />}
                  title="Instant Strategic Analysis"
                  children={
                    'Automatically extract key objectives, deadlines, and evaluation criteria to build a winning strategy from the start.'
                  }
                />
                {/* FIX: Pass children as an explicit prop to resolve incorrect 'missing prop' error. */}
                <FeatureCard
                  icon={
                    <TechnicalIcon className="w-6 h-6 text-brand-primary" />
                  }
                  title="Technical Risk Assessment"
                  children={
                    'Identify potential technical hurdles and compliance risks before you write a single word, ensuring a feasible solution.'
                  }
                />
                {/* FIX: Pass children as an explicit prop to resolve incorrect 'missing prop' error. */}
                <FeatureCard
                  icon={<DraftIcon className="w-6 h-6 text-brand-primary" />}
                  title="AI-Powered Drafting"
                  children={
                    "Generate persuasive, context-aware proposal sections in minutes, not days. Overcome writer's block forever."
                  }
                />
                {/* FIX: Pass children as an explicit prop to resolve incorrect 'missing prop' error. */}
                <FeatureCard
                  icon={
                    <ValidationIcon className="w-6 h-6 text-brand-primary" />
                  }
                  title="Automated Compliance Audit"
                  children={
                    'Ensure your proposal meets every formatting and submission rule with an automated final review to avoid disqualification.'
                  }
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-4xl text-center bg-brand-light p-10 rounded-2xl">
              <RocketIcon className="w-12 h-12 text-brand-primary mx-auto mb-4" />
              <h2 className="text-3xl font-extrabold text-slate-100 mb-4">
                Ready to Revolutionize Your Proposal Process?
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Join teams who are saving hundreds of hours and dramatically
                increasing their win rates with IgniteProposals.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-pink-700 transition-colors duration-300 text-lg"
              >
                Launch The Demo
              </button>
            </div>
          </section>
        </main>
        <footer className="text-center py-8 px-4">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} IgniteProposals. All rights
            reserved.
          </p>
        </footer>
      </div>
      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;