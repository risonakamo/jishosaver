//PopupRoot(data data)
//data: full data object from storage, see data specs
//      for local storage
class PopupRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  render() {
    var thelist = "";

    if (this.state.data.kanjilist) {
      thelist = Object.keys(this.state.data.kanjilist).join("");
    }

    return React.createElement(React.Fragment, null, React.createElement(KanjiList, {
      thelist: thelist
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

} //WordBox()


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