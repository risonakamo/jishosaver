class kanjibox
{
    kanjibox(element box);

    element box; //the top box element
    element-array kanjichars; //spans of main kanji chars
    element-array hboxes; //each hiragana span for each kanji character, should be same length as kanjichars
    element-array meanings; //elements containing meanings

    string kanji;

    void initEvents();
    void kanjisplit();
    void genjson();
}