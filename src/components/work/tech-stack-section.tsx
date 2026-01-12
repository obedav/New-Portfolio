import { TechStackItem } from '@/types/project';
import { Card } from '@/components/ui/card';

interface TechStackSectionProps {
  techStack: TechStackItem[];
}

export function TechStackSection({ techStack }: TechStackSectionProps) {
  // Group tech stack by category
  const groupedStack = techStack.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, TechStackItem[]>);

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-neutral-900 mb-6">Tech Stack</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedStack).map(([category, items]) => (
          <Card key={category} className="p-6">
            <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-4">
              {category}
            </h4>
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center text-neutral-700"
                >
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  <span className="font-medium">{item.name}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
