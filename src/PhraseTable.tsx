import React from 'react'; 
import './PhraseTable.css';

interface Phrase {
  category: string;
  amharic: string;
  english: string;
  phonetic: string;
  notes: string;
}

const PhraseTable: React.FC = () => {
  const [phrases, setPhrases] = React.useState<Phrase[]>([]);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch('/amharic_phrase.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        const validatedPhrases = data.filter((phrase: Phrase) =>
          typeof phrase.category === 'string' &&
          typeof phrase.amharic === 'string' &&
          typeof phrase.english === 'string' &&
          typeof phrase.phonetic === 'string' &&
          (typeof phrase.notes === 'string' || phrase.notes === undefined)
        );
        if (validatedPhrases.length === 0) {
          throw new Error('No valid phrases found in JSON data');
        }
        setPhrases(validatedPhrases);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading phrases:', error);
        setError(`Failed to load phrases: ${error.message}`);
        setLoading(false);
      });
  }, []);

  const filteredPhrases = phrases.filter(phrase => {
    const searchLower = search.toLowerCase();
    return (
      (phrase.english?.toLowerCase()?.includes(searchLower) ?? false) ||
      (phrase.amharic?.includes(search) ?? false) ||
      (phrase.phonetic?.toLowerCase()?.includes(searchLower) ?? false)
    );
  });

  const categories = [...new Set(filteredPhrases.map(phrase => phrase.category))];

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (loading) return <div className="text-center p-4">Loading phrases...</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search phrases..."
        className="w-full p-2 mb-4 border rounded"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map(category => {
          const categoryPhrases = phrases.filter(p => p.category === category);
          return (
            <div key={category} className="p-4 border rounded shadow">
              <h3 className="font-medium">{category}</h3>
              <p>{categoryPhrases.length} phrases</p>
              <p>{categoryPhrases[0]?.amharic || '...'}</p>
            </div>
          );
        })}
        <div className="p-4 border rounded bg-red-600 text-white shadow">
          <h3 className="font-medium">Favorites</h3>
          <p>0 phrases</p>
          <p className="text-sm mt-2">
            Use the ♥ button to add phrases to your favorites. The ♥ menu then allows you to quickly access what you need.
          </p>
        </div>
      </div>
    </div>
  );
};

// Error Boundary Component with corrected typing
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class PhraseTableErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-red-500 text-center p-4">Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}

export default function PhraseTableWithErrorBoundary() {
  return (
    <PhraseTableErrorBoundary>
      <PhraseTable />
    </PhraseTableErrorBoundary>
  );
}