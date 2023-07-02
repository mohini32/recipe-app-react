import './App.scss';
import Header from './Components/Header'
import Tabs from './Components/Tabs'
import RecipeLists from './Components/RecipeLists';
import { useState } from 'react';
function App() {
  const [loader,setLoader]=useState(true)
  return (
    <div id=''>
  <Header/>
  <Tabs setLoader={setLoader}/>
  <RecipeLists setLoader={setLoader}/>
  {loader && <div className='loader'>
    <div className='spinner'>
      </div>
    </div>
    }
  </div>
  );
}

export default App;
