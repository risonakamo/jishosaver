//PopupRoot(data data)
//data: full data object from storage, see data specs
//      for local storage
class PopupRoot extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state={
      data:this.props.data
    };
  }

  render()
  {
    var thelist="";
    if (this.state.data.kanjilist)
    {
      thelist=Object.keys(this.state.data.kanjilist).join("");
    }

    return (<>
      <KanjiList thelist={thelist}/>

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

//WordBox()
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

//KanjiList(string thelist)
class KanjiList extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state={
      kanjilist:this.props.thelist
    };
  }

  render()
  {
    var kanjilistlen=0;
    if (this.state.kanjilist)
    {
      kanjilistlen=this.state.kanjilist.length;
    }

    return (<>
      <h1>漢字一覧 <span className="counter">{kanjilistlen}</span></h1>
      <textarea className="kanji-list" value={this.state.kanjilist}
        onChange={(e)=>{
          this.setState({kanjilist:e.currentTarget.value});
        }}
      ></textarea>
    </>);
  }
}