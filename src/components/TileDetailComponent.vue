<template>
  <button class="button button--close" />
</template>

<script lang="ts" setup>


</script>

<style lang="scss" scoped>
$bottom: 2rem;

.modal-content {
  display: flex;
  position: absolute;
  bottom: $bottom;
  left: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  transform: translateX(-50%) translateY(100%);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  background-color: white;
  padding: 1rem;
  width: 20rem;
  height: 12rem;

  &__body {
    flex: 1 1 auto;

    .badge {
      border: 0.125rem solid #dfdfdf;
      border-radius: 1rem;
      padding: 0.125rem 0.5rem;
    }
  }

  .button {
    &--close {
      position: absolute;
      top: -2rem;
      right: 0.5rem;
      cursor: pointer;
      border: none;
      background: #333;
      width: 2rem;
      height: 2rem;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iMjAiCiAgIGhlaWdodD0iMjAiCiAgIHZpZXdCb3g9IjAgMCA1LjI5MTY2NjUgNS4yOTE2NjY4IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcxNTExIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjQgKDVkYTY4OWMzMTMsIDIwMTktMDEtMTQpIgogICBzb2RpcG9kaTpkb2NuYW1lPSJDcm9zc19pY29uXyh3aGl0ZSkuc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzMTUwNSIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iMTEuMiIKICAgICBpbmtzY2FwZTpjeD0iNS44MjA4NDIxIgogICAgIGlua3NjYXBlOmN5PSI5LjM2OTUwMSIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0ibW0iCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICB1bml0cz0icHgiCiAgICAgaW5rc2NhcGU6c25hcC1wYWdlPSJ0cnVlIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTM2NiIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI3MTEiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjAiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjMwIgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiIC8+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMTUwOCI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMjkxLjcwODMyKSI+CiAgICA8ZwogICAgICAgaWQ9ImcyODQ3IgogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMS4zNjA5NDMsMCwwLDEuMzYwOTQzLC0wLjk1NDk5NTAxLC0xMDYuMjQ1MDcpIgogICAgICAgc3R5bGU9InN0cm9rZTojZmZmZmZmIj4KICAgICAgPHBhdGgKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgaWQ9InBhdGgyODIyIgogICAgICAgICBkPSJtIDAuOTMwNDYwNDUsMjkyLjYzODc4IDMuNDMwNzQ1NzUsMy40MzA3NCIKICAgICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MC40NTI5MTQ5NTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIgLz4KICAgICAgPHBhdGgKICAgICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MC40NTI5MTQ5NTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgZD0ibSA0LjM2MTIwNjIsMjkyLjYzODc4IC0zLjQzMDc0NTc1LDMuNDMwNzQiCiAgICAgICAgIGlkPSJwYXRoMjg0MyIKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=")
        center no-repeat;
        width: 100%;
        height: 100%;
        content: "";
      }
    }
  }

  &--visible {
    animation: fade-bottom-to-base 0.3s forwards;
  }

  @keyframes fade-bottom-to-base {
    0% {
      transform: translateX(-50%) translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
}
</style>
