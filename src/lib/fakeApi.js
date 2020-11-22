/**lib folder node modules represent etmelidir. hansisa 3rd party, req gondermekcun istifade etdiyimiz libraryler.
 * ona gore index.js-le fakeApi-da kodlari o sekilde yazmaq lazimdir. indexde-de fakeApi-ya call edib, datani save edirik ve ya asking for some data
 */

/**eslinde bu kodlar node modulesda olur. sadece sade library yaradib, fake api calls etdik */

const data = {
  activities: {
    1546968934: {
      id: "1546968934",
      title: "Learn Vue.js",
      notes: "I started today and it was not good.",
      progress: 0,
      category: "1546969049",
      createdAt: 1546969144391,
      updatedAt: 1546969144391,
    },
    1546969212: {
      id: "1546969212",
      title: "Read Witcher Books",
      notes: "These books are super nice",
      progress: 0,
      category: "1546969049",
      createdAt: 1546969144391,
      updatedAt: 1546969144391,
    },
  },
  categories: {
    1546969049: { text: "books", id: "1546969049" },
    1546969225: { text: "movies", id: "1546969225" },
  }
}

class FakeApi {
  fillDB() {
    this.commitData(data);
  }

  /** data - activitydir */
  commitData(data) {
    /**setIteme 2 deyer girilir. birinci key, ikinci local storage-e store etmek istediyimiz
     * data-ni object kimi save ede bilmerik, ona gore stringe cevirilmelidir/
    */
    localStorage.setItem('activity_data', JSON.stringify(data))
  }

  getData() {
    const activityData = localStorage.getItem('activity_data')
    /**localstoragedeki data stringe cevirdiyimize gore, activityData da string olduguna gore, objecte ceviriilir */
    return JSON.parse(activityData);
  }

  /*classlarda functionlar bele yazilmalidir. index.jsden copy edenden sonra constlar,arrow funct-lar silinir */
  canContinue() {
    const rndNumber = Math.floor(Math.random() * 10); //get random numbers b/w 1 and 10

    if (rndNumber > 5) {
      return true;
    }
    return false;
  }

  /*fetchActivities-i bu faylda yeniden duzeldeceyik. cunki fetchActivities-i index.js-in terkibinde saxlayacagiq 
  ve ordan fakeapi.js-e call edib, burdaki const datani get edeceyik. */
  /* bu generate koddu ve biz activities-i get etmek istemirik. ona gore birinci functionu adlandiririq */
  /*get() - we want to get some data. moterize icinde hansi datani get edeceyimiz yaziriq. bizim de activities ve categoriesimiz var */

  /* burda promise return edirik ama app.vue-da bizim categoriesimiz normal data kimi isleyir. 
       in a promise we receive data in then() 
  ona gore created()-de fetchActivities()-e then() funct yazmaliyiq. nece ki fetchActivities()-de etmisdik */

  /*force options yazmagi 3 yolu var. 
    1- get(resource, options) {
      const force = options.force
      return ......
    }
    2- get(resource, options) {
      const {force} = options
    }
    3- get(resource, {force}) bu yolla yazib, force-a default value veririk
  */
  get(resource, { force = 0 }) {
    // browserde datani 2saniye sonra goreceyik. yeni en basda 0 activity gorsenir, 2saniye sonra data gorsenir
    return new Promise((resolve, reject) => {
      this.asyncCall(() => {
        if (force || this.canContinue()) {
          const data = this.getData(); /**bu setri elave ederek, datani localstorageden gelen data olur. bunu yazmasaq, data burda oz girdiyimiz datalara beraber olacaq */
          resolve({ ...data[resource] });
        } else {
          reject('Cannot fetch ' + resource)
        }
      })
      // setTimeout(() => {
      //   /*evvelki kodda this.canContinue deyildi. bu classin icinde olduguna gore this elave etdik */
      //   //eger force 1 olsa, bu davam edecek ve fail olmayacaq
      //   if (force || this.canContinue()) {
      //     /*we get this data according to resource */
      //     /**evvel resolve(data[resource]) idi. post() yazdiqdan sonra bu sekilde yazdiq
      //      * datanin copysi yox yeni object resolve etmek ucun
      //      */
      //     resolve({ ...data[resource] });
      //   } else {
      //     reject('Cannot fetch ' + resource)
      //   }
      // }, 1000)
    })
  }

  /**post(resource, payload) da yazmaq olar. bize baglidir */
  post(resource, item) {
    return new Promise((resolve, reject) => {
      const data = this.getData();
      /**burda itemi, yeni datani, yeni activitiesi elde etmeliyik */
      /*data[resource] - datanin icindeki objectdir,yeni activities-di.
       data[resource][item] - activitiesin icindeki objectdir.yeni 1546968934 */
      data[resource][item.id] = item;
      this.commitData(data);
      resolve(item)
    })
  }

  delete(resource, item) {
    return new Promise((resolve, reject) => {
      const data = this.getData()
      delete data[resource][item.id]
      this.commitData(data);
      resolve(item)
      /**resolve edirik ki then() blokuna data versin */
    })
  }

  asyncCall(callback) {
    setTimeout(callback, 1000);
  }
}



export default new FakeApi()