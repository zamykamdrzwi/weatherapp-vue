<template>
  <nav class="navbar navbar-expand-md bg-light fixed-top">
    <div class="container">
      <router-link to="/weather" class="nav-link fw-bold">
        <span class="text-secondary">WeatherApp</span>
      </router-link>
      <button type="button"
      class="navbar-toggler shadow-none border-0"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav">
        <span>
          <font-awesome-icon :icon="['fas', 'bars']" />
        </span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/weather" class="nav-link">
              Weather
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/road" class="nav-link">
              Route
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  // font-weight: <weight>;
  font-style: normal;
}
</style>