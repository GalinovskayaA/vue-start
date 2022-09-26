<template>
  <div class="g-center content">
    <form class="form" @submit.prevent>
      <input v-bind:value="newPostTitle"
             @input="newPostTitle = $event.target.value"
             type="text"
             placeholder="New post"
             ref="inputRef"
      />
      <button v-on:click="addPost" class="g-post-buttons"> add </button>
    </form>
    <div class="posts" v-for="post in posts">
      <Post v-bind:post="post"
            v-bind:values="values"
            v-bind:image="image"
            v-bind:del="del"
            v-bind:edit="edit"
            v-bind:activeModal="activeModal"
            :key="post.id"
      />
    </div>
    <ModalQuestion v-bind:isShow="isShowModal"
                   title="Are You Sure ?"
                   v-bind:postId="postIdForDelete"
                   v-bind:deletePost="deletePost"
                   v-bind:cancelDelete="cancelDelete"
    />
  </div>
</template>

<script>
import image from "@/assets/Posts/png-clipart.svg"
import del from "@/assets/Posts/del.svg"
import edit from "@/assets/Posts/edit.svg"
import Post from "@/components/P3-Posts/Post";
import ModalQuestion from "@/commons/modals/ModalQuestion";

export default {
  name: "Posts",
  components: {
    Post,
    ModalQuestion
  },
  mounted() {
  },
  data() {
    return {
      image: image,
      del: del,
      edit: edit,
      newPostTitle: '',
      postIdForDelete: null,
      isShowModal: false,
      values: [
        {
          title: '',
          message: '',
          editMessage: ''
        },
        {
          title: '',
          message: '',
          editMessage: ''
        },
        {
          title: '',
          message: '',
          editMessage: ''
        },
      ],
      posts: [
        {
          id: 0, title: 'Post 1', isChecked: false, body: [
            {id: 0, message: 'body 1.1', isChecked: false},
            {id: 1, message: 'body 1.2', isChecked: false},
          ]
        },
        {
          id: 1, title: 'Post 2', isChecked: false, body: [
            {id: 0, message: 'body 2', isChecked: false},
          ]
        },
        {
          id: 2, title: 'Post 3', isChecked: false, body: [
            {id: 0, message: 'body 3', isChecked: false},
          ]
        },
      ]
    }
  },
  methods: {
    getRef() {
      this.$refs.inputRef.focus()
    },
    addPost() {
      this.getRef()
      let lastPost = this.posts[this.posts.length - 1]
      if (this.newPostTitle.trim() !== '') {
        if (lastPost === undefined) {
          const newPost = {
            id: 0,
            title: this.newPostTitle,
            isChecked: false,
            body: []
          }
          const newDataPost = {
            title: '',
            message: '',
            editMessage: ''
          }
          this.pushInfaNewPost(newPost, newDataPost)
        } else {
          const newPost = {
            id: lastPost.id + 1,
            title: this.newPostTitle,
            isChecked: false,
            body: []
          }
          const newDataPost = {
            title: '',
            message: '',
            editMessage: ''
          }
          this.pushInfaNewPost(newPost, newDataPost)
        }
      }
    },
    pushInfaNewPost(newPost, newDataPost) {
      this.posts.push(newPost)
      this.values.push(newDataPost)
      this.newPostTitle = ''
    },
    activeModal(postId) {
      this.isShowModal = true
      this.postIdForDelete = postId
    },
    deletePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId)
      this.isShowModal = false
    },
    cancelDelete(value) {
      this.isShowModal = value
    },
    createNewPost(event) {
      this.newPostTitle = event.target.value
    }
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.content input {
  padding: 0.1rem 0.5rem;
  background-color: #f1f1f1;
  outline: none;
  border: none;
  border-radius: 0.2rem;
  box-shadow: 1px 1px 5px 3px rgba(34, 60, 80, 0.5);
}

.content {
  max-width: 100vw;
  padding: 5rem 2rem 2rem;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
}

.form {
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-overflow: ellipsis
}

.posts {
  flex: 4;
  width: 22rem;
  padding: 1rem 5rem;
  border-radius: 0.2rem;
  box-shadow: 1px 1px 5px 3px rgba(34, 60, 80, 0.5);
}
</style>
