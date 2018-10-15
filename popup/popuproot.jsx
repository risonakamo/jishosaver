class PopupRoot extends React.Component
{
  render()
  {
    return (<>
      <h1>漢字一覧 <span className="counter">6</span></h1>
      <textarea className="kanji-list"></textarea>

      <h1>単語一覧 <span className="counter">176</span></h1>

      <div className="word-list">
        <WordBox/>
      </div>

      <div className="actions">
        <div className="button">セーブ</div>
        <div className="button">クリア</div>
      </div>
    </>);
  }
}

class WordBox extends React.Component
{
  render()
  {
    return (
      <div className="word-box">
        <div className="hover-region"><div>捜索</div></div>
        <div className="hover-region right"><div>消す</div></div>
        <h2>捜索</h2>
      </div>
    );
  }
}