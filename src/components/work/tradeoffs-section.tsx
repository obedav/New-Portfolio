import { Card } from '@/components/ui/card';

interface TradeoffsSectionProps {
  tradeoffs: {
    constraints: string[];
    wouldChange: string[];
    knownLimitations: string[];
    scalingConsiderations: string[];
  };
}

export function TradeoffsSection({ tradeoffs }: TradeoffsSectionProps) {
  return (
    <div className="space-y-8">
      {/* Constraints */}
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">
          Project Constraints
        </h3>
        <Card className="p-6">
          <ul className="space-y-3">
            {tradeoffs.constraints.map((constraint, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="w-5 h-5 text-neutral-500 mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-neutral-700">{constraint}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* What I Would Change */}
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">
          What I Would Change (Given More Time/Resources)
        </h3>
        <Card className="p-6">
          <ul className="space-y-3">
            {tradeoffs.wouldChange.map((change, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <span className="text-neutral-700">{change}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Known Limitations */}
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">
          Known Limitations
        </h3>
        <Card className="p-6 bg-orange-50 border-orange-200">
          <ul className="space-y-3">
            {tradeoffs.knownLimitations.map((limitation, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="w-5 h-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="text-neutral-700">{limitation}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Scaling Considerations */}
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">
          Scaling Considerations
        </h3>
        <Card className="p-6 bg-green-50 border-green-200">
          <ul className="space-y-3">
            {tradeoffs.scalingConsiderations.map((consideration, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span className="text-neutral-700">{consideration}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
