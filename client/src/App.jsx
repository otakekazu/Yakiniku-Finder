import Main from "./Main";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <header className="header">焼肉ファインダー</header>
      <div className="main">
        <Main />
      </div>
      <div className="description">
        <p className="shortDesc">【使い方】</p>
        <ul className="descList">
          <li>起動するとブラウザが立ち上がり、マップが表示されます。</li>
          <li>任意の場所をクリックすることで周辺の焼肉屋を検索できます。</li>
          <li>最大で20件まで表示されます。</li>
          <li>近くに焼肉屋が存在しない場合はアラートが表示されます。</li>
          <li>お店を検索中はマップの操作はできません。</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
