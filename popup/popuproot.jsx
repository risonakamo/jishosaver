//PopupRoot(data data)
//data: full data object from storage, see data specs
//      for local storage
class PopupRoot extends React.Component
{
  constructor(props)
  {
    super(props);
    this.deleteWord=this.deleteWord.bind(this);
    this.saveJSON=this.saveJSON.bind(this);

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

  saveJSON()
  {
    var data=[];
    for (var x in this.state.data)
    {
      if (x!="kanjilist")
      {
        data.push(this.state.data[x]);
      }
    }

    data={kcards:data};

    chrome.downloads.download({
      url:`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`,
      filename:"kanji.json"
    });
  }

  render()
  {
    var thelist="";
    if (this.state.data.kanjilist)
    {
      thelist=Object.keys(this.state.data.kanjilist).join("");
    }

    var wordboxes=[];
    for (var x in this.props.data)
    {
      if (x=="kanjilist")
      {
        continue;
      }

      wordboxes.push(<WordBox data={this.props.data[x]} deleteWord={this.deleteWord} key={x}/>);
    }

    return (<>
      <KanjiList thelist={thelist}/>

      <h1>単語一覧 <span className="counter">{wordboxes.length}</span></h1>

      <div className="word-list">
        {wordboxes}
      </div>

      <div className="actions">
        <div className="button" onClick={this.saveJSON}>セーブ</div>
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
  constructor(props)
  {
    super(props);
    this.deleteAction=this.deleteAction.bind(this);

    this.state={
      //prepareToDelete:0
    };

    this.wordtext=React.createRef();
  }

  hoverZone(addclass,remove)
  {
    this.wordtext.current.classList.remove(...["left","right"]);

    if (!remove)
    {
      this.wordtext.current.classList.add(addclass);
    }

    else
    {
      this.wordtext.current.classList.remove(addclass);
    }
  }

  deleteAction()
  {
    if (!this.state.prepareToDelete)
    {
      this.setState({prepareToDelete:1});
    }

    else
    {
      this.props.deleteWord(this.props.data.maindata[0]);
    }
  }

  render()
  {
    var deleteButtonString="消す";
    if (this.state.prepareToDelete)
    {
      deleteButtonString="本当？";
    }

    return (
      <div className="word-box">
        <div className="hover-region"
          onClick={()=>{chrome.tabs.create({active:true,url:`https://jisho.org/search/${this.props.data.maindata[0]}`})}}
          onMouseEnter={()=>{this.hoverZone("left")}}
          onMouseLeave={()=>{this.hoverZone("left",1)}}
        >
          <div>捜索</div>
        </div>

        <div className="hover-region right"
          onClick={this.deleteAction}
          onMouseEnter={()=>{this.hoverZone("right")}}
          onMouseLeave={()=>{this.hoverZone("right",1)}}
        >
          <div>{deleteButtonString}</div>
        </div>

        <div ref={this.wordtext}>
          <p>{this.props.data.maindata[1]}</p>
          <h2>{this.props.data.maindata[0]}</h2>
        </div>
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