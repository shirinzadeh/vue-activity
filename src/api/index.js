const activities = {
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
}

const canContinue = () => {
  const rndNumber = Math.floor(Math.random() * 10); //get random numbers b/w 1 and 10

  if (rndNumber > 5) {
    return true;
  }
  return false;
}

export const fetchActivities = () => {

  // browserde datani 2saniye sonra goreceyik. yeni en basda 0 activity gorsenir, 2saniye sonra data gorsenir
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (canContinue()) {
        resolve(activities);
      }
      else {
        reject('Cannot fetch activities')
      }
    }, 2000)
  })

}

//get some unique identifier
const generateUid = () => Math.floor(new Date() * Math.random())
//we will get here newActivity
export const createActivityAPI = (activity) => {
  activity.id = generateUid()
  activity.progress = 0
  activity.updatedAt = new Date()
  activity.createdAt = new Date()

  // return activity

  // apilarla islediyimiz ucun bize response async olaraq qayidir . ona gore promisela yazilmalidi
  return new Promise((resolve, reject) => {
    resolve(activity)
  })
}

export const fetchUser = () => {
  return {
    name: "Filip Jerga",
    id: "-Aj34jknvncx98812",
  }
}

export const fetchCategories = () => {
  return {
    1546969049: { text: "books", id: "1546969049" },
    1546969225: { text: "movies", id: "1546969225" },
  }
}