<template>
  <div id="app">
    <!-- Main container -->
    <div class="container is-fulld">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://qq.vadxq.com">
            <img src="https://qnimg.vadxq.com/blog/2019/PQQL.PNG"  height="28">
          </a>

          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <router-link to="/" class="navbar-item">Home</router-link>
              
            <a class="navbar-item" href="https://github.com/vadxq/pushQQlove">
              Documentation
            </a>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                More
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item" href="https://blog.vadxq.com/me">
                  About
                </a>
                <a class="navbar-item" href="https://qnimg.vadxq.com/blog/2019/zhifubao.jpg">
                  Donation
                </a>
                <a class="navbar-item" href="https://blog.vadxq.com">
                  Contact
                </a>
                <hr class="navbar-divider">
                <a class="navbar-item" href="https://github.com/vadxq/pushQQlove/issues">
                  Report an issue
                </a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="text" placeholder="Find">
                </p>
                <p class="control">
                  <button class="button">
                    Search
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    
      <router-view/>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>PQQL</strong> by <a href="https://github.com/vadxq">vadxq(github)</a>.
          </p>
          <p>
            <a href="https://blog.vadxq.com">vadxq' Blog</a>
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }

});
export default {
  comments: {
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.footer {
  padding: 1rem 0;
}
</style>
