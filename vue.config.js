module.exports = {
  devServer: {
    proxy: {
      '/api': { // Все запросы, начинающиеся с `/api`, будут перенаправлены
        target: 'https://api.football-data.org/', // Ваш API-сервер
        changeOrigin: true, // Меняет заголовок Origin (обход CORS)
        pathRewrite: {
          '^/api': '', // Удаляет `/api` из URL (если API не требует префикса)
        },
      },
    },
  },
}
