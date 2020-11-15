// mixinlerde functionlarda mixin js faylinin adini da yazmaq lazimdir ki, basqa bir mixin faylinda da eyni function olsa qarisiqliq olmasin

export default {
  data() {
    return {}
  },
  methods: {
    textUtility_capitalize(word) {
      if (word && typeof word === 'string') {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    }
  }
}