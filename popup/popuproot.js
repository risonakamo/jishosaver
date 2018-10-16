//PopupRoot(data data)
//data: full data object from storage, see data specs
//      for local storage
class PopupRoot extends React.Component {
  constructor(props) {
    super(props);
    this.deleteWord = this.deleteWord.bind(this);
    this.saveJSON = this.saveJSON.bind(this);
    this.state = {
      data: this.props.data
    };
  } //delete a word given the word


  deleteWord(word) {
    delete this.state.data[word];
    chrome.storage.local.remove(word);
    this.setState({
      data: this.state.data
    });
  }

  saveJSON() {
    var data = [];

    for (var x in this.state.data) {
      if (x != "kanjilist") {
        data.push(this.state.data[x]);
      }
    }

    data = {
      kcards: data
    };
    chrome.downloads.download({
      url: `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`,
      filename: "kanji.json"
    });
  }

  render() {
    var thelist = "";

    if (this.state.data.kanjilist) {
      thelist = Object.keys(this.state.data.kanjilist).join("");
    }

    var wordboxes = [];

    for (var x in this.props.data) {
      if (x == "kanjilist") {
        continue;
      }

      wordboxes.push(React.createElement(WordBox, {
        data: this.props.data[x],
        deleteWord: this.deleteWord,
        key: x
      }));
    }

    return React.createElement(React.Fragment, null, React.createElement(KanjiList, {
      thelist: thelist
    }), React.createElement("h1", null, "\u5358\u8A9E\u4E00\u89A7 ", React.createElement("span", {
      className: "counter"
    }, wordboxes.length)), React.createElement("div", {
      className: "word-list"
    }, wordboxes), React.createElement("div", {
      className: "actions"
    }, React.createElement("div", {
      className: "button",
      onClick: this.saveJSON
    }, "\u30BB\u30FC\u30D6"), React.createElement("div", {
      className: "button"
    }, "\u30AF\u30EA\u30A2")));
  }

} //WordBox(object data,function deleteWord)
//data: a kanjidata object from storage
//deleteWord: from parent


class WordBox extends React.Component {
  constructor(props) {
    super(props);
    this.deleteAction = this.deleteAction.bind(this);
    this.state = {//prepareToDelete:0
    };
    this.wordtext = React.createRef();
  }

  hoverZone(addclass, remove) {
    this.wordtext.current.classList.remove(...["left", "right"]);

    if (!remove) {
      this.wordtext.current.classList.add(addclass);
    } else {
      this.wordtext.current.classList.remove(addclass);
    }
  }

  deleteAction() {
    if (!this.state.prepareToDelete) {
      this.setState({
        prepareToDelete: 1
      });
    } else {
      this.props.deleteWord(this.props.data.maindata[0]);
    }
  }

  render() {
    var deleteButtonString = "消す";

    if (this.state.prepareToDelete) {
      deleteButtonString = "本当？";
    }

    return React.createElement("div", {
      className: "word-box"
    }, React.createElement("div", {
      className: "hover-region",
      onClick: () => {
        chrome.tabs.create({
          active: true,
          url: `https://jisho.org/search/${this.props.data.maindata[0]}`
        });
      },
      onMouseEnter: () => {
        this.hoverZone("left");
      },
      onMouseLeave: () => {
        this.hoverZone("left", 1);
      }
    }, React.createElement("div", null, "\u635C\u7D22")), React.createElement("div", {
      className: "hover-region right",
      onClick: this.deleteAction,
      onMouseEnter: () => {
        this.hoverZone("right");
      },
      onMouseLeave: () => {
        this.hoverZone("right", 1);
      }
    }, React.createElement("div", null, deleteButtonString)), React.createElement("div", {
      ref: this.wordtext
    }, React.createElement("p", null, this.props.data.maindata[1]), React.createElement("h2", null, this.props.data.maindata[0])));
  }

} //KanjiList(string thelist)


class KanjiList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kanjilist: this.props.thelist
    };
  }

  render() {
    var kanjilistlen = 0;

    if (this.state.kanjilist) {
      kanjilistlen = this.state.kanjilist.length;
    }

    return React.createElement(React.Fragment, null, React.createElement("h1", null, "\u6F22\u5B57\u4E00\u89A7 ", React.createElement("span", {
      className: "counter"
    }, kanjilistlen)), React.createElement("textarea", {
      className: "kanji-list",
      value: this.state.kanjilist,
      onChange: e => {
        this.setState({
          kanjilist: e.currentTarget.value
        });
      }
    }));
  }

}