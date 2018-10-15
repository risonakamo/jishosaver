class PopupRoot extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state={
      data:{}
    };
  }

  componentDidMount()
  {
    chrome.storage.local.get(null,(data)=>{
      this.setState({data});
    });
  }

  render()
  {

    var kanjiList={
      list:"",
      len:0
    };

    if (this.state.data.kanjilist)
    {
      var thelist=Object.keys(this.state.data.kanjilist);
      kanjiList.list=thelist.join("");
      kanjiList.len=thelist.length;
    }

    return (<>
      <h1>漢字一覧 <span className="counter">{kanjiList.len}</span></h1>
      <textarea className="kanji-list" defaultValue={kanjiList.list}></textarea>

      <h1>単語一覧 <span className="counter">0</span></h1>

      <div className="word-list">

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
        <p>そうさく</p>
        <h2>捜索</h2>
      </div>
    );
  }
}