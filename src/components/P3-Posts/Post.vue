<template>
  <div class="title" :class="{editing: post.isChecked}">
    <label v-show="!post.isChecked"
           v-on:dblclick="showTitle"
    >
      {{ post.title }}
      <img :src="image" alt="" width="25"/>
    </label>
    <input v-show="post.isChecked"
           v-model="values[post.id].title"
           @blur="editTitle($event, post.id)"
           @keyup.enter="editTitle($event, post.id)"
           type="text"
           placeholder="edit title"
           v-super-focus
    />
    <span class="delete"
          v-on:click="activeModal(post.id)"
    >
      <img :src="del" alt="del" width="15"/>
    </span>
  </div>
  <div class="messages" v-for="item in post.body" :key="item.id">
    <div class="message" :class="{editing: item.isChecked}">
      <label v-show="!item.isChecked">
        {{ item.message }}
      </label>
      <input v-show="item.isChecked"
             v-model="values[post.id].editMessage"
             @blur="editMessage($event, post.id, item.id)"
             @keyup.enter="editMessage($event, post.id, item.id)"
             type="text"
             placeholder="edit message"
             v-super-focus
      />
      <span v-on:click="showMessage(item.id)">
          <img :src="edit" alt="edit" width="15"/>
      </span>
      <span v-on:click="deleteMessage(item.id)">
          <img :src="del" alt="del" width="10"/>
      </span>
    </div>
  </div>
  <form class="form" @submit.prevent>
    <input v-model="values[post.id].message"
           @input="inputMessage($event, post.id)"
           type="text"
           placeholder="add message">
    <button v-on:click="addMessage(post.id)"> add </button>
  </form>
</template>

<script>
export default {
  name: "Post",
  props: ['post', 'values', 'activeModal', 'image', 'del', 'edit'],
  newPostTitle: '',
  methods: {
    addMessage(postId) {
      let lastMessage = this.post.body[this.post.body.length - 1]
      if (this.values[postId].title.trim() !== '') {
        this.post.title = this.values[postId].title
      }
      if (lastMessage === undefined) {
        const newMessage = {
          id: 0,
          message: this.values[postId].message,
          isChecked: false
        }
        this.post.body.push(newMessage)
        this.clear(postId)
      }
      if (this.values[postId].message.trim() !== '') {
        const newMessage = {
          id: lastMessage.id + 1,
          message: this.values[postId].message,
          isChecked: false
        }
        this.post.body.push(newMessage)
      }
      this.clear(postId)
    },
    showMessage(messId) {
      this.post.body[messId].isChecked = true
    },
    showTitle() {
      this.post.isChecked = true
    },
    editTitle(e, postId) {
      this.values[postId].title = e.target.value
      if (this.values[postId].title.trim() !== '') {
        this.post.title = this.values[postId].title
      }
      this.post.isChecked = false
      this.clear(postId)
    },
    editMessage(e, postId, messId) {
      this.values[postId].editMessage = e.target.value
      if (this.values[postId].editMessage.trim() !== '') {
        this.post.body[messId].message = this.values[postId].editMessage
      }
      this.post.body[messId].isChecked = false
      this.clear(postId)
    },
    deleteMessage(messId) {
      this.post.body = this.post.body.filter(message => message.id !== messId)
    },
    inputMessage(e, postId) {
      this.values[postId].message = e.target.value
    },
    clear(postId) {
      this.values[postId].title = ''
      this.values[postId].message = ''
      this.values[postId].editMessage = ''
    },
  }
}
</script>

<style scoped>
input {
  padding: 0 0.5rem;
  background-color: #f1f1f1;
  outline: none;
  border: none;
  border-radius: 0.2rem;
  box-shadow: 1px 1px 5px 3px rgba(34, 60, 80, 0.5);
}

img {
  cursor: pointer;
}

button {
  width: 3rem;
  border-radius: 0.2rem;
  cursor: pointer;
}

input {
  width: 12rem;
  margin-right: 0.2rem;
  height: 1.6rem;
}

label {
  text-overflow: ellipsis;
  overflow: hidden
}

.messages {
  margin-bottom: 0.4rem;
  height: 1.5rem;
  border-bottom: 0.01rem solid rgba(34, 60, 80, 0.5);
}

.message input {
  width: 12rem;
  margin-right: 0.2rem;
  height: 1.2rem;
}

.form {
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.title {
  padding: 0 0 1.5rem 1rem;
  display: flex;
  justify-content: center;
}

.title label {
  flex: 10;
  font-size: 1.5rem;
}

.title span {
  flex: 1;
}

.message {
  display: flex;

  gap: 0.5rem;
}

.message label {
  flex: 10;
  text-align: start;
  text-overflow: ellipsis;
  overflow: hidden
}

.message span {
  flex: 1;
}

.delete {
  position: relative;
  left: 3rem;
}
</style>