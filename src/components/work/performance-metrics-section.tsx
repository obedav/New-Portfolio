import { LighthouseScores } from '@/types/project';
import { Card } from '@/components/ui/card';

interface PerformanceMetricsSectionProps {
  lighthouse: LighthouseScores;
  bundleSize: {
    before?: string;
    after: string;
  };
  ttfb: string;
  optimizations: string[];
  testing: {
    coverage: number;
    frameworks: string[];
    cicdUrl: string;
  };
  security: {
    measures: string[];
  };
}

export function PerformanceMetricsSection({
  lighthouse,
  bundleSize,
  ttfb,
  optimizations,
  testing,
  security,
}: PerformanceMetricsSectionProps) {
  return (
    <div className="space-y-12">
      {/* Lighthouse Scores */}
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-6">
          Lighthouse Performance
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(lighthouse).map(([key, value]) => {
            const label = key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, (str) => str.toUpperCase());

            // Determine color based on score
            let colorClass = 'text-green-600';
            if (value < 90) colorClass = 'text-orange-600';
            if (value < 50) colorClass = 'text-red-600';

            return (
              <Card key={key} className="p-6 text-center">
                <div className={`text-4xl font-bold ${colorClass} mb-2`}>
                  {value}
                </div>
                <div className="text-sm text-neutral-600">{label}</div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bundle Size & TTFB */}
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-6">
          Performance Metrics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
              Bundle Size
            </h4>
            <div className="space-y-2">
              {bundleSize.before && (
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Before:</span>
                  <span className="font-bold text-neutral-900">
                    {bundleSize.before}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">
                  {bundleSize.before ? 'After:' : 'Current:'}
                </span>
                <span className="font-bold text-green-600">
                  {bundleSize.after}
                </span>
              </div>
              {bundleSize.before && (
                <div className="pt-2 text-sm text-green-600 font-medium">
                  {Math.round(
                    ((parseFloat(bundleSize.before) -
                      parseFloat(bundleSize.after)) /
                      parseFloat(bundleSize.before)) *
                      100
                  )}
                  % reduction
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
              Time to First Byte
            </h4>
            <div className="text-3xl font-bold text-neutral-900">{ttfb}</div>
          </Card>
        </div>
      </div>

      {/* Optimizations */}
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-6">
          Performance Optimizations
        </h3>

        <Card className="p-6">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {optimizations.map((optimization, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-neutral-700">{optimization}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Testing */}
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-6">
          Testing Strategy
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
              Test Coverage
            </h4>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-neutral-900">
                {testing.coverage}%
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${testing.coverage}%` }}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
              Testing Frameworks
            </h4>
            <ul className="space-y-2">
              {testing.frameworks.map((framework, index) => (
                <li key={index} className="flex items-center text-neutral-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  <span>{framework}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* Security */}
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-6">
          Security Measures
        </h3>

        <Card className="p-6">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {security.measures.map((measure, index) => (
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="text-neutral-700">{measure}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
