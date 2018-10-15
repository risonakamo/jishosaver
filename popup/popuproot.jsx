//PopupRoot(data data)
//data: full data object from storage, see data specs
//      for local storage
class PopupRoot extends React.Component
{
  constructor(props)
  {
    super(props);
    this.deleteWord=this.deleteWord.bind(this);

    this.state={
      data:this.props.data
    };
  }

  //delete a word given the word
  deleteWord(word)
  {
    delete this.state.data[word];
    chrome.storage.local.remove(word);
    this.setState({data:this.state.data});
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
        {(()=>{
          var res=[];
          for (var x in this.props.data)
          {
            if (x=="kanjilist")
            {
              continue;
            }

            res.push(<WordBox data={this.props.data[x]} deleteWord={this.deleteWord} key={x}/>);
          }

          return res;
        })()}
      </div>

      <div className="actions">
        <div className="button">セーブ</div>
        <div className="button">クリア</div>
      </div>
    </>);
  }
}

//WordBox(object data,function deleteWord)
//data: a kanjidata object from storage
//deleteWord: from parent
class WordBox extends React.Component
{
  render()
  {
    return (
      <div className="word-box">
        <div className="hover-region"><div>捜索</div></div>

        <div className="hover-region right"
          onClick={()=>{
            this.props.deleteWord(this.props.data.maindata[0]);
          }}
        >
          <div>消す</div>
        </div>

        <p>{this.props.data.maindata[1]}</p>
        <h2>{this.props.data.maindata[0]}</h2>
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