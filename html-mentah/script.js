var app = new Vue({
  el: '#app',
  data: {
    threads: []
  },
  methods:{
    getThread() {
      let self = this
      axios.get('http://localhost:3000/api/thread/')
      .then((thr) => {
        axios.get('http://localhost:3000/api/answer/')
        .then((aws) => {
          let myFirstPromise = new Promise((resolve, reject) => {
            thr.data.map(insThr => {
              insThr.answers = aws.data.filter(insAws => {
                return insAws.thread == insThr._id.toString()
              })
            })
          resolve('success')
          });
          myFirstPromise.then((res) => {
            self.threads = thr.data
          });
        })
        .catch((err) => {
          console.log(err);
        })
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
  mounted() {
    this.getThread()
  }
});
