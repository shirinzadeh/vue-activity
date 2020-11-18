/*fakeApi.js-e copy edenden sonra burdan  activities ve canContinue() funct silindi
fetchActivities() icindekiler de silinir, cunki artiq fakeApi-ya, get functiona call ede bilirik,ordan resource-u access edirik (commente almisam, evvel ne yazildigini bilmek ucun)  */

/*bu fakeApi, third party apilarla islediyimizde ve ya node modulesa basqa libraryler install edende apilarla nece isleyeciyimizin numunesidir */
import fakeApi from '@/lib/fakeApi'
//get some unique identifier
const generateUid = () => Math.floor(new Date() * Math.random())

export const fetchActivities = () => {
  return fakeApi.get('activities', { force: 1 })
  // browserde datani 2saniye sonra goreceyik. yeni en basda 0 activity gorsenir, 2saniye sonra data gorsenir
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     if (canContinue()) {
  //       resolve(activities);
  //     }
  //     else {
  //       reject('Cannot fetch activities')
  //     }
  //   }, 2000)
  // })
}

export const fetchCategories = () => {
  return fakeApi.get('categories', { force: 1 })
  // return {
  //   1546969049: { text: "books", id: "1546969049" },
  //   1546969225: { text: "movies", id: "1546969225" },
  // }
}

export const fetchUser = () => {
  return {
    name: "Filip Jerga",
    id: "-Aj34jknvncx98812",
  }
}

//we will get here newActivity
export const createActivityAPI = (activity) => {
  activity.id = generateUid()
  activity.progress = 0
  activity.updatedAt = new Date()
  activity.createdAt = new Date()

  // return activity

  /* apilarla islediyimiz ucun bize response async olaraq qayidir . ona gore promisela yazilmalidi*/
  // return new Promise((resolve, reject) => {
  //   resolve(activity)
  // })
  /**fakeApi-da post() yazdiqdan sonra bu formada return edirik */
  return fakeApi.post('activities', activity) //we want to add this under activities, and want to save our activity
}

export const deleteActivityAPI = (activity) => {
  return fakeApi.delete('activities', activity)
  /** 'activities - resourcedu, activity - item */
}