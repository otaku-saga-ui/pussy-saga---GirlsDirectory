import { ArrowLeft, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Character } from './models/Character';
import type { Media } from './models/Media';

const getImage = (mediaURL: Character['mediaURL'], image: Media['image']) => {
  return `https://pussysaga.com/media/_10b76617/${mediaURL}images/${image}`;
};

function App({ characters }: { characters: Record<string, Character> }) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const characterKey = params.get('character');

    if (characterKey !== null) {
      setSelectedCharacter(characters[characterKey]);
    }
  }, [characters]);

  const handleCharacterClick = (character: Character) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setSelectedCharacter(character);

    const params = new URLSearchParams();
    const characterKey = Object.keys(characters).find(
      (key) => characters[key].id === character.id
    )!;

    params.set('character', characterKey);
    const newURL = params.toString() ? `?${params.toString()}` : '/';
    window.history.pushState({}, '', newURL);
  };

  const handleBackClick = () => {
    setSelectedCharacter(null);

    const params = new URLSearchParams();
    params.delete('character');
    const newURL = params.toString() ? `?${params.toString()}` : '/';
    window.history.pushState({}, '', newURL);
  };

  // Character Media Grid View
  if (selectedCharacter) {
    return (
      <div className='min-h-screen bg-gray-50'>
        {/* Header */}
        <div className='bg-white shadow-sm border-b'>
          <div className='max-w-6xl mx-auto px-6 py-4'>
            <button
              onClick={handleBackClick}
              className='cursor-pointer flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4'
            >
              <ArrowLeft size={20} />
              <span className='font-medium'>Back to Characters</span>
            </button>

            <div className='flex items-center gap-4'>
              <img
                src={getImage(selectedCharacter.mediaURL, selectedCharacter.media[0]?.image)}
                alt={selectedCharacter.name}
                className='w-16 h-16 rounded-full object-cover'
              />
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>{selectedCharacter.name}</h1>
                <p className='text-gray-600'>{selectedCharacter.media.length} media items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <div className='max-w-6xl mx-auto px-6 py-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {selectedCharacter.media.map((media, index) => (
              <div
                key={media.id + index}
                // onClick={() => handleMediaClick(media)}
                className='bg-white rounded-2xl shadow-lg overflow-hidden  '
              >
                <div className='relative overflow-hidden'>
                  <img
                    src={getImage(selectedCharacter.mediaURL, media.image)}
                    alt={`Media ${media.id}`}
                    className='w-full h-64 object-cover transition-transform duration-500 '
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    Media {index === 0 ? 'intro' : index}
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>{media.text.toString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Character Grid View
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-6xl mx-auto px-6 py-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>Pussy Saga Character Gallery</h1>
        </div>
      </div>

      {/* Character Grid */}
      <div className='max-w-6xl mx-auto px-6 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {Object.values(characters).map((character) => (
            <div
              key={character.id}
              onClick={() => handleCharacterClick(character)}
              className='bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 '
            >
              <div className='relative overflow-hidden'>
                <img
                  src={getImage(character.mediaURL, character.media[0]?.image)}
                  alt={character.name}
                  className='w-full h-64 object-cover transition-transform duration-500 '
                />
              </div>
              <div className='p-6'>
                <div className='flex items-center gap-3 mb-3'>
                  <User className='w-5 h-5 text-gray-500' />
                  <h3 className='text-xl font-bold text-gray-900'>{character.name}</h3>
                </div>
                <p className='text-gray-600 text-sm'>
                  {character.media.length} media item{character.media.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
