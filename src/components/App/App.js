import Game from '../Game';
import Header from '../Header';
import Guesslist2 from '../exercise2/Guesslist2';
import GuessGrid3 from '../exercise3/GuessGrid3';
import Guesslogic4 from '../exercise4/Guesslogic4'
import Banner5 from '../exercise5/Banner5';

function App() {
  return (
    <div className="wrapper">
      <Header />

      <div className="game-wrapper">
        {/* <Game /> */}
        {/* <Guesslist2 /> */}
        {/* <GuessGrid3 /> */}
        {/* <Guesslogic4 /> */}
        <Banner5 />
      </div>
    </div>
  );
}

export default App;
