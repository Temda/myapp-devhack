<template>
  <div class="flex flex-col h-screen">
    <Header />
    <main class="p-4 flex-grow">
      <div class="gap">
        <h1 class="text-center text-5xl font-extrabold">Todo-list</h1>
      </div>
      <hr class="mb-3">
      <div class="grid grid-cols-6 gap-4">
        <div class="col-start-2 col-span-4">
          <form @submit.prevent="Oninsert">
            <div class="mb-4">
              <input v-model="input.title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="title">
            </div>
            <div class="mb-4">
              <textarea v-model="input.description" id="message" rows="4" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Description..."></textarea>
            </div>
            <div class="mb-4">
              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                {{ check ? 'Addtodo' : 'UpdateTodo' }}
              </button>
            </div>
          </form>
        </div>
        
        <div class="col-start-2 col-span-4 md:col-start-2">
          <div class="bg-white rounded-lg p-6 shadow-lg mt-2" v-for="(item, index) in items.data" :key="index">
            <input type="checkbox" :id="'todo-' + index"  @click="checkstatus(item.id, item.completed)" v-model="item.completed" class="mr-4">
            <label :for="'todo-' + index" class="text-lg font-medium" @keyup.enter="completeItem(index)" :class="{ 'line-through text-gray-500': item.completed }">{{ item.title }}</label>
            <hr>
            <p>{{ item.description }}</p>
            <div class="flex gap-5">
              <button class="text-red-500 ml-4" @click="deleteItem(item.id)">Delete</button>
              <button class="text-green-500 ml-4" @click="ClickShowupdate(item.id)">Update</button>
            </div>
          </div>
        </div>

      </div>
    </main>
    <Footer />
  </div>
</template>

<script>

import Header from './components/header.vue'
import Footer from './components/footer.vue'
import axios from 'axios'

export default {
  components: {
    Header,
    Footer
  },
  data: () => ({
    items: [],
    input: {
      title: '',
      description: ''
    },
    check: true,
    chexid: ''
  }),
  methods: {
    async Oninsert() {
        try {
          if(this.check) {
            const res = await axios.post('/api/create-list', this.input)
            if(res.data.success){
              this.input.title = '',
              this.input.description = ''
              await this.fetchData()
            }
          }else{
              const response = await axios.put(`/api/update-list/${this.chexid}`, {
                title: this.input.title,
                description: this.input.description,
                status: false
              });
              if(response.data.success){
                this.input.title = '',
                this.input.description = ''
                await this.fetchData()
              }
          }
        } catch (error) {
          console.error(error)
        }
    },
    async fetchData() {
      try {
        const resitems = await axios.get('/api/create-list-all')
        
        if(resitems.data.status) {
          // ทำเสร็จแล้ว True
        }else{
          this.items = resitems.data
        }
        console.log(resitems.data.status)
      } catch (error) {
        console.error(error);
      }
    },
    async ClickShowupdate(id) {
      try {
        // const response = await axios.put(`/api/update-list/${id}`, {
        //   title: this.title,
        //   description: this.description,
        //   status: false
        // });
        const response = await axios.get(`/api/items-list/${id}`);
        this.input.title = response.data.result.title,
        this.input.description = response.data.result.description,
        this.check = false,
        this.chexid = id
      } catch (error) {
        console.error(error);
      }
    },
    checkstatus(id, completed) {
      if(completed) {
        alert('ยกเลิกเรียบร้อย')
      }else{
        alert('เรียบร้อย')
      }
    },
    async deleteItem(id) {
      try {
          const response = await axios.delete(`/api/delete-list/${id}`);
          if(response.data.success){
            alert(response.data.message)
            await this.fetchData()
          }

      } catch (error) {
        console.error(error);
      }

    }
  },
  created() {
    this.fetchData();
  },

}
</script>