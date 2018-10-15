class PopupRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    chrome.storage.local.get(null, data => {
      this.setState({
        data
      });
    });
  }

  render() {
    var kanjiList = {
      list: "",
      len: 0
    };

    if (this.state.data.kanjilist) {
      var thelist = Object.keys(this.state.data.kanjilist);
      kanjiList.list = thelist.join("");
      kanjiList.len = thelist.length;
    }

    return React.createElement(React.Fragment, null, React.createElement("h1", null, "\u6F22\u5B57\u4E00\u89A7 ", React.createElement("span", {
      className: "counter"
    }, kanjiList.len)), React.createElement("textarea", {
      className: "kanji-list",
      defaultValue: kanjiList.list
    }), React.createElement("h1", null, "\u5358\u8A9E\u4E00\u89A7 ", React.createElement("span", {
      className: "counter"
    }, "0")), React.createElement("div", {
      className: "word-list"
    }), React.createElement("div", {
      className: "actions"
    }, React.createElement("div", {
      className: "button"
    }, "\u30BB\u30FC\u30D6"), React.createElement("div", {
      className: "button"
    }, "\u30AF\u30EA\u30A2")));
  }

}

class WordBox extends React.Component {
  render() {
    return React.createElement("div", {
      className: "word-box"
    }, React.createElement("div", {
      className: "hover-region"
    }, React.createElement("div", null, "\u635C\u7D22")), React.createElement("div", {
      className: "hover-region right"
    }, React.createElement("div", null, "\u6D88\u3059")), React.createElement("p", null, "\u305D\u3046\u3055\u304F"), React.createElement("h2", null, "\u635C\u7D22"));
  }

}