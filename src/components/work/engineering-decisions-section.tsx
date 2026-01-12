import { EngineeringDecision } from '@/types/project';
import { Card } from '@/components/ui/card';

interface EngineeringDecisionsSectionProps {
  decisions: EngineeringDecision[];
}

export function EngineeringDecisionsSection({
  decisions,
}: EngineeringDecisionsSectionProps) {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-neutral-900 mb-6">
        Key Engineering Decisions
      </h3>

      <div className="space-y-6">
        {decisions.map((decision, index) => (
          <Card key={index} className="p-6 md:p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              {/* Number Badge */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <h4 className="text-xl font-bold text-neutral-900">
                  {decision.title}
                </h4>

                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
                      Decision:
                    </span>
                    <p className="text-neutral-700 mt-1">{decision.decision}</p>
                  </div>

                  <div>
                    <span className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
                      Rationale:
                    </span>
                    <p className="text-neutral-700 mt-1">{decision.rationale}</p>
                  </div>

                  {decision.impact && (
                    <div>
                      <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
                        Impact:
                      </span>
                      <p className="text-neutral-700 mt-1">{decision.impact}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
