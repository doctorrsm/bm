Vue.createApp({
  data() {
    return {
      separate: false,
      verseNumber: true,
      dotted: true,
      count: 0,
      input: '',
      placeholder: 'Введите стихи, согласно образцу: Мат 4:43; 5:32-34; 1Пет 1:1-18;',
      currentBibleBook: null,
      regExpressions: [
        /^бы?т/,
        /^исх/,
        /^ле?в/,
        /^чи?с/,
        /^вт/,
        /^на?в/,
        /^су?д/,
        /^ру?ф/,
        /1ц/,
        /2ц/,
        /3ц/,
        /4ц/,
        /1п/,
        /2п/,
        /^ез/,
        /^не?е?м/,
        /^ес/,
        /^ио?в/,
        /^пс/,
        /^пр/,
        /^ек/,
        /^пес/,
        /^ис/,
        /^ие?р/,
        /^пл/,
        /^ие?з/,
        /^да,н/,
        /^ос/,
        /^ио?и?л/,
        /^ам/,
        /^авд/,
        /^ион/,
        /^ми?х/,
        /^наум/,
        /^авв/,
        /^со?ф/,
        /^аг/,
        /^за?х/,
        /^ма?л/,
        /^ма?т/,
        /^ма?р?к/,
        /^лу?к/,
        /^ио?а?н/,
        /^де?я?н/,
        /^рим?/,
        /^1к/,
        /^2к/,
        /^га?л/,
        /^еф/,
        /^фи?л?и?п/,
        /^ко?л/,
        /^1ф/,
        /^2ф/,
        /^1т/,
        /^2т/,
        /^ти/,
        /^фи?л?и?м/,
        /^ев/,
        /^иа?к/,
        /^1п/,
        /^2п/,
        /^1и/,
        /^2и/,
        /^3и/,
        /^иуды/,
        /^от/,

      ],
      bookAbbreviations: [
        'Быт.', 'Исх.', 'Лев.', 'Чис.', 'Втор.', 'Ис.Нав.', 'Суд.', 'Руфь', '1Цар.', '2Цар.',
        '3Цар.', '4Цар.', '1Пар.', '2Пар.', 'Езд.', 'Неем.', 'Есф.', 'Иов', 'Пс.', 'Пр.', 'Еккл.',
        'П.Песней', 'Ис.', 'Иерем.', 'Пл.Иер.', 'Иез.', 'Дан.', 'Осия', 'Иоиль',
        'Амос', 'Авдий', 'Иона', 'Михея', 'Наума', 'Аввакум', 'Софония', 'Аггей', 'Зах.', 'Малахия',
        'Мтф.', 'Марк.', 'Лук.', 'Иоан.', 'Деян.', 'Рим.',
        '1Кор.', '2Кор.', 'Гал.', 'Ефесянам', 'Филип.', 'Колос.', '1Фес.', '2Фес.', '1Тим.', '2Тим.',
        'Титу', 'Филимону', 'Евр.', 'Иакова', '1Петр.', '2Петр.', '1Иоан.', '2Иоан.', '3Иоан.', 'Иуды', 'Откр.'],
      arrayWithBible: [],
      versesList: []
    }
  },
  methods: {

    getVerses() {
      return this.input.trim().split(';')
    },

    setSeparation(event) {
      if (event.target.checked) {
        this.separate = false;
      }
    },
    delSeparation(event) {

      if (event.target.checked) {
        this.separate = true;
      }
    },
    setNumber(event) {
      if (event.target.checked) {
        this.verseNumber = true;
      }
    },
    delNumber(event) {

      if (event.target.checked) {
        this.verseNumber = false;
      }
    },

    getChapter(BookChapterAndVerse) {
      return BookChapterAndVerse.split(' ');
    },


    inputV() {
      this.versesList = [];

      // Разделяем строку по точке с запятой
      let verses = this.input.trim().split(';');

      //удаляем пробелы с краёв
      verses = verses.map((item) => {
        return item.trim();
      });

      //делаем слова маленькими
      verses = verses.map((item) => {
        return item.toLowerCase();
      });

      //удаляем пустые элементы
      verses = verses.filter(function (el) {
        return (el != null && el != "" || el === 0);
      });

      const showVerse = (verse) => {

        //1. Разделяем на двоеточию:
        let BookChapterAndVerse = verse.split(':');

        // превращем несколько пробелов в один:
        BookChapterAndVerse[0] = BookChapterAndVerse[0].replace('.', ' ')
        BookChapterAndVerse[0] = BookChapterAndVerse[0].replace(/\s+/g, ' ')
        BookChapterAndVerse[0] = BookChapterAndVerse[0].replace('1 ц', '1ц')
        BookChapterAndVerse[0] = BookChapterAndVerse[0].replace('2 ц', '2ц')
        BookChapterAndVerse[0] = BookChapterAndVerse[0].replace('3 ц', '3ц')
        BookChapterAndVerse[0] = BookChapterAndVerse[0].replace('4 ц', '4ц')
        BookChapterAndVerse[0] = BookChapterAndVerse[0].replace('1 п', '1п')
        BookChapterAndVerse[0] = BookChapterAndVerse[0].replace('2 п', '2п')
        BookChapterAndVerse[0] = BookChapterAndVerse[0].replace('1 к', '1к')
        BookChapterAndVerse[0] = BookChapterAndVerse[0].replace('2 к', '2к')
        BookChapterAndVerse[0] = BookChapterAndVerse[0].replace('1 ф', '1ф')
        BookChapterAndVerse[0] = BookChapterAndVerse[0].replace('2 ф', '2ф')
        BookChapterAndVerse[0] = BookChapterAndVerse[0].replace('1 и', '1и')
        BookChapterAndVerse[0] = BookChapterAndVerse[0].replace('2 и', '2и')
        BookChapterAndVerse[0] = BookChapterAndVerse[0].replace('3 и', '3и')


        let book, verses, chapter, fullVerses = null;

        if (BookChapterAndVerse[0].match(/[а-я]/)) {
          verses = BookChapterAndVerse[1];
          fullVerses = BookChapterAndVerse[1];
          book = BookChapterAndVerse[0].split(' ')[0];
          chapter = BookChapterAndVerse[0].split(' ')[1];
          this.currentBibleBook = book;
        } else {
          book = this.currentBibleBook
          verses = BookChapterAndVerse[1]
          fullVerses = BookChapterAndVerse[1];
          chapter = BookChapterAndVerse[0];
        }

        verses = verses.split(',');

        let bookId = null;
        let exp = this.regExpressions;
        for (let i = 0; i < this.regExpressions.length; i++) {
          if (book.match(exp[i])) {
            bookId = i;
            break;
          }
        }
        if (bookId === null) {
          return;
        }

        if (!this.arrayWithBible[bookId]['Chapters']) {
          return;
        }

        bookId = bookId

        let newArray = verses.slice(0)
        verses = []
        newArray = newArray.map((verse) => {

          if (verse.includes('-')) {
            let splitedVerse = [];
            verse = verse.split('-');
            let startVerse = Number(verse[0]);
            let finishVerse = Number(verse[1]);
            while (startVerse <= finishVerse)  {
                if ( (this.arrayWithBible[bookId]['Chapters'][chapter - 1]['Verses'][startVerse - 1])) {

                  verses.push(startVerse)


                }
              startVerse++;
            }
          } else {
            if (this.arrayWithBible[bookId]['Chapters'][chapter - 1]['Verses'][verse - 1]) {
              verses.push(verse)
              return true
            }
          }
        });

        //

        if (verses.length === 0) {
          return;
        } else {
          let obj = {
            chapter: chapter,
            book: book,
            verses: verses,
            bookId: bookId,
            bookName: this.bookAbbreviations[bookId],
            fullVerses: fullVerses
          };
          this.versesList.push(obj)
        }
      }

      if (verses) {
        verses.forEach(showVerse);
      }

    },
  },
  created() {

    //https://gist.githubusercontent.com/a1ip/0a5ec1b89e79b4490ef5992a80e72eeb/raw/643fb1089165676903b05852cb7d72cb2f51b2f8/rst.json
    fetch('https://gist.githubusercontent.com/a1ip/0a5ec1b89e79b4490ef5992a80e72eeb/raw/643fb1089165676903b05852cb7d72cb2f51b2f8/rst.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.arrayWithBible = data.Books;
      });
  }
}).mount('#app')
