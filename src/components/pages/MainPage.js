import RandomCharacter from '../randomCharacter/RandomCharacter';
import CharacterCards from '../characterCards/CharacterCards';
import CharacterCard from '../characterCard/CharacterCard';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import CharacterForm from '..//characterForm/CharacterForm';

import visionIMG from '..//../resources/vision.png';
import {useState} from 'react';

const MainPage = () => {

    const [charId, setCharId] = useState(null)
    const onCharSelected = (charId) => {
    setCharId(charId)
  }
    return (
        <>
            <ErrorBoundary>
                <RandomCharacter onCharSelected={onCharSelected} />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharacterCards onCharSelected={onCharSelected} />
                </ErrorBoundary> 
                <div>
                    <ErrorBoundary>
                        <CharacterCard isSeparatePage={false} charId={charId}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharacterForm />
                    </ErrorBoundary>
                </div>
                
            </div>
            <img className="bg-decoration" src={visionIMG} alt={visionIMG}></img>
        </>
        
    )
}

export default MainPage