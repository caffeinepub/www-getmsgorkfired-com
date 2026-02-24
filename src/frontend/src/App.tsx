import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useVote } from './hooks/useQueries';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [hasVoted, setHasVoted] = useState(false);
  const [votedYes, setVotedYes] = useState<boolean | null>(null);
  const { mutate: vote, isPending } = useVote();

  const handleVote = (yes: boolean) => {
    vote(yes, {
      onSuccess: () => {
        setHasVoted(true);
        setVotedYes(yes);
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)]" />
      
      <main className="relative z-10 w-full max-w-2xl mx-auto text-center space-y-12">
        {!hasVoted ? (
          <>
            {/* Question */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              do you support the CR and getting Ms.Gork fired?
            </h1>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button
                onClick={() => handleVote(true)}
                disabled={isPending}
                size="lg"
                className="w-full sm:w-48 h-16 text-2xl font-bold bg-white text-black hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isPending && votedYes === true ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  'YES'
                )}
              </Button>

              <Button
                onClick={() => handleVote(false)}
                disabled={isPending}
                size="lg"
                className="w-full sm:w-48 h-16 text-2xl font-bold bg-white text-black hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isPending && votedYes === false ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  'NO'
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Thank you message */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Thank you for voting!
              </h2>
              <p className="text-xl md:text-2xl text-gray-300">
                You voted: <span className="font-bold text-white">{votedYes ? 'YES' : 'NO'}</span>
              </p>

              {/* Vote counts placeholder - requires backend implementation */}
              <div className="mt-12 p-8 border-2 border-white/20 rounded-lg backdrop-blur-sm">
                <p className="text-lg text-gray-400 mb-6">Vote Results</p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-5xl font-bold text-white">—</p>
                    <p className="text-lg text-gray-300">YES votes</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-5xl font-bold text-white">—</p>
                    <p className="text-lg text-gray-300">NO votes</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-6">
                  Vote counts will be displayed once backend support is added
                </p>
              </div>

              <Button
                onClick={() => {
                  setHasVoted(false);
                  setVotedYes(null);
                }}
                variant="outline"
                size="lg"
                className="mt-8 border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                Vote Again
              </Button>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-gray-500 text-sm z-10">
        <p>
          © {new Date().getFullYear()} • Built with love using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : 'getmsgorkfired'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
